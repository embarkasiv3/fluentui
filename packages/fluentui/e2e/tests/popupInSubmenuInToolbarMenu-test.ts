import { selectors } from './popupInSubmenuInToolbarMenu-example';

const toolbarMenuId = `#${selectors.toolbarMenuId}`;
const menuButtonId = `#${selectors.menuButtonId}`;
const popupTriggerId = `#${selectors.popupTriggerId}`;
const submenuTriggerId = `#${selectors.submenuTriggerId}`;
const popupElementId = `#${selectors.popupElementId}`;
const dummyButtonId = `#${selectors.dummyButtonId}`;

describe('Popup in ToolbarMenu', () => {
  beforeEach(async () => {
    await e2e.gotoTestCase(__filename, menuButtonId);
  });

  it('Popup can be opened using mouse', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId);
    await e2e.exists(toolbarMenuId);

    // opens submenu
    await e2e.clickOn(submenuTriggerId);
    await e2e.exists(popupTriggerId);

    // opens Popup
    await e2e.clickOn(popupTriggerId);
    await e2e.exists(popupElementId);
  });

  it('Popup can be opened using keyboard', async () => {
    // focuses menu button
    await e2e.waitForSelectorAndPressKey(menuButtonId, 'Tab');

    // opens menu
    await e2e.waitForSelectorAndPressKey(menuButtonId, 'Enter');
    await e2e.exists(toolbarMenuId);

    // opens submenu
    await e2e.waitForSelectorAndPressKey(toolbarMenuId, 'Enter');
    await e2e.exists(popupTriggerId);

    // opens Popup
    await e2e.waitForSelectorAndPressKey(popupTriggerId, 'Enter');
    await e2e.exists(popupElementId);
  });

  it('Opening Popup results in first element to be focused', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId);
    await e2e.exists(toolbarMenuId);

    // opens submenu
    await e2e.clickOn(submenuTriggerId);
    await e2e.exists(popupTriggerId);

    // opens Popup
    await e2e.clickOn(popupTriggerId);
    await e2e.isFocused(popupElementId);
  });

  it('Tab when Popup is focused does not result in hiding the Popup', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId);
    await e2e.exists(toolbarMenuId);

    // opens submenu
    await e2e.clickOn(submenuTriggerId);
    await e2e.exists(popupTriggerId);

    // opens Popup
    await e2e.clickOn(popupTriggerId);
    await e2e.waitForSelectorAndPressKey(popupTriggerId, 'Tab');
    await e2e.exists(popupElementId);
  });

  it('Click inside Popup does not hide Popup', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId);
    await e2e.exists(toolbarMenuId);

    // opens submenu
    await e2e.clickOn(submenuTriggerId);
    await e2e.exists(popupTriggerId);

    // opens Popup
    await e2e.clickOn(popupTriggerId);
    await e2e.clickOn(popupElementId);
    await e2e.exists(popupElementId);
  });

  it('Popup is closed when clicking outside of menu and popup', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId);
    await e2e.exists(toolbarMenuId);

    // opens submenu
    await e2e.clickOn(submenuTriggerId);
    await e2e.exists(popupTriggerId);

    // opens Popup
    await e2e.clickOn(popupTriggerId);
    await e2e.clickOn(dummyButtonId);
    await e2e.expectHidden(popupElementId);
    await e2e.expectHidden(popupTriggerId);
  });

  it('Click outside of Popup but inside of Menu closes Popup but leaves Menu open', async () => {
    // opens menu
    await e2e.clickOn(menuButtonId);
    await e2e.exists(toolbarMenuId);

    // opens submenu
    await e2e.clickOn(submenuTriggerId);
    await e2e.exists(popupTriggerId);

    // opens Popup
    await e2e.clickOn(popupTriggerId);
    await e2e.clickOn(popupTriggerId);
    await e2e.expectHidden(popupElementId);
    await e2e.exists(popupTriggerId);
  });
});
