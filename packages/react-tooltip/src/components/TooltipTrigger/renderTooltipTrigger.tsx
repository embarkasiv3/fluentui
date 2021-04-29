import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { canUseDOM, getSlots } from '@fluentui/react-utilities';
import { TooltipTriggerState } from './TooltipTrigger.types';
import { tooltipTriggerShorthandProps } from './useTooltipTrigger';

/**
 * Render the final JSX of TooltipTrigger
 * {@docCategory TooltipTrigger}
 */
export const renderTooltipTrigger = (state: TooltipTriggerState) => {
  const { slots, slotProps } = getSlots(state, tooltipTriggerShorthandProps);

  return (
    <>
      {state.children}
      {!canUseDOM() || state.tooltipContainer === undefined
        ? null
        : ReactDOM.createPortal(<slots.tooltip {...slotProps.tooltip} />, state.tooltipContainer)}
    </>
  );
};
