// Temporary import file to experiment with memoization approach.
import { composed } from '@uifabric/foundation/lib/next/composed';
import { useMenuButtonState as state } from './MenuButton.state';
import { MenuButtonStyles as styles, MenuButtonTokens as tokens } from './MenuButton.styles';
import { IMenuButtonProps } from './MenuButton.types';
import { MenuButtonView as view } from './MenuButton.view';

export const MenuButton: React.StatelessComponent<IMenuButtonProps> = composed({
  displayName: 'MenuButton',
  state,
  styles,
  tokens,
  view
});

export default MenuButton;
