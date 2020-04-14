import { SplitButton } from '@fluentui/react-northstar';

const selectors = {
  triggerButton: `.${SplitButton.Toggle.className}`,
};

const config: ScreenerTestsConfig = {
  steps: [builder => builder.click(selectors.triggerButton).snapshot('Open menu')],
};

export default config;
