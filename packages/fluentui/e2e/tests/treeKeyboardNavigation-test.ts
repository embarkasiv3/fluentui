import { treeItemClassName, treeTitleClassName, treeClassName } from '@fluentui/react-northstar';

const selectors = {
  tree: `.${treeClassName}`,
  treeItem: `.${treeItemClassName}`,
  treeTitleAt: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) .${treeTitleClassName}`,
  treeItemAt: (itemIndex: number) => `.${treeItemClassName}:nth-of-type(${itemIndex}) `,
};

const navigateToLastLevel = async () => {
  await e2e.focusOn(selectors.treeItemAt(1));
  await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(1), 'ArrowRight'); // Expand first level item
  await e2e.expectCount(selectors.treeItem, 3);

  await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(1), 'ArrowRight'); // Focus first child  2nd level
  await e2e.isFocused(selectors.treeItemAt(2));

  await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'ArrowRight'); // Expand second level item
  await e2e.expectCount(selectors.treeItem, 6);

  await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'ArrowRight'); // Focus first child 3rd level
  await e2e.isFocused(selectors.treeTitleAt(3)); // last level has always tree title focused
};

describe('Tree keyboard navigation', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, selectors.tree);
  });

  it('Should navigate down with right arrow', async () => {
    await navigateToLastLevel();
  });

  it('Should navigate up with left arrow', async () => {
    await navigateToLastLevel();

    await e2e.waitForSelectorAndPressKey(selectors.treeTitleAt(3), 'ArrowLeft'); // Focus parent 2nd level
    await e2e.isFocused(selectors.treeItemAt(2));
    await e2e.expectCount(selectors.treeItem, 6);

    await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'ArrowLeft'); // closes 3rd level
    await e2e.expectCount(selectors.treeItem, 3);
    await e2e.isFocused(selectors.treeItemAt(2));

    await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'ArrowLeft'); // Focus parent 1nd level
    await e2e.expectCount(selectors.treeItem, 3);
    await e2e.isFocused(selectors.treeItemAt(1));
  });

  it('Should set focus based on first letter', async () => {
    await navigateToLastLevel();

    await e2e.focusOn(selectors.treeItemAt(1)); // focus on 'House Lannister'
    await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(1), 'T'); // expect focus to be on 'Tywin'
    await e2e.isFocused(selectors.treeItemAt(2));

    await e2e.evaluate(() => {
      // puppeteer keyboard api supports only USKeyboardLayout https://github.com/puppeteer/puppeteer/blob/00d966a572713745e4de85b0d914f8753d3298ce/src/common/Input.ts#L64
      // consider switch to CDP page._client when supporting IME input
      document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'т', bubbles: true }));
    });
    await e2e.isFocused(selectors.treeTitleAt(5)); // expect focus to be on 'тирион'

    await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'F'); // expect focus to stay because no node is start with 'F'
    await e2e.isFocused(selectors.treeTitleAt(5));

    await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'H'); // expect focus to be on 'House Lannister'
    await e2e.isFocused(selectors.treeItemAt(1));

    await e2e.waitForSelectorAndPressKey(selectors.treeItemAt(2), 'Tab'); // expect Tab key to still function as default
    await e2e.isFocused('body');
  });
});
