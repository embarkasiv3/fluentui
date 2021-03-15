import { makeStylesCompat, ax } from '@fluentui/react-make-styles';
import { CounterBadgeState } from './CounterBadge.types';
import { useBadgeStyles } from '../Badge/useBadgeStyles';

/**
 * Styles for the root slot
 */
export const useCounterBadgeRootStyles = makeStylesCompat<CounterBadgeState>([
  [
    null,
    {
      minWidth: 'auto',
    },
  ],
  [
    s => s.color === 'warning',
    theme => ({
      backgroundColor: theme.global.palette.cranberry.primary,
      borderColor: theme.global.palette.cranberry.primary,
    }),
  ],
  [
    s => s.color === 'important',
    theme => ({
      backgroundColor: theme.global.palette.grey[14],
      borderColor: theme.global.palette.grey[14],
    }),
  ],
  [
    s => s.color === 'severe',
    theme => ({
      // @TODO: update these colors once the color used in the design spec has existing color token
      backgroundColor: theme.global.palette.red.primary,
      borderColor: theme.global.palette.red.primary,
    }),
  ],
  [
    s => s.color === 'informative',
    theme => ({
      backgroundColor: theme.global.palette.grey[92],
      borderColor: theme.global.palette.grey[92],
      color: theme.alias.color.neutral.neutralForeground3,
    }),
  ],
  [
    s => s.dot,
    {
      width: '6px',
      height: '6px',
      padding: '0',
    },
  ],
  [
    s => !s.showZero && s.count === 0 && !s.dot,
    {
      display: 'none',
    },
  ],
]);

/**
 * Applies style classnames to slots
 */
export const useCounterBadgeStyles = (state: CounterBadgeState) => {
  state.className = ax(useCounterBadgeRootStyles(state), state.className);
  return useBadgeStyles(state);
};
