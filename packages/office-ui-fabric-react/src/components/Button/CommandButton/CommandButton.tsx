import { BaseButton } from '../BaseButton';
import styles from './CommandButton.scss';

export class CommandButton extends BaseButton {
  protected classNames = {
    base: 'ms-Button',
    variant: 'ms-Button--command',
    icon: styles.icon,
    isDisabled: styles.isDisabled,
    isEnabled: styles.isEnabled,
    label: styles.label,
    root: styles.root,
    flexContainer: styles.flexContainer
  };

  protected onRenderDescription() { return null; }
}
