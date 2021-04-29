import * as React from 'react';
import { makeMergeProps, useMergedRefs } from '@fluentui/react-utilities';
import { TooltipProviderProps, TooltipProviderState } from './TooltipProvider.types';
import { useTooltipManager } from './useTooltipManager';

const mergeProps = makeMergeProps<TooltipProviderState>();

/**
 * Create the state required to render TooltipProvider.
 *
 * The returned state can be modified with hooks such as useTooltipProviderStyles,
 * before being passed to renderTooltipProvider.
 *
 * @param props - props from this instance of TooltipProvider
 * @param ref - reference to root HTMLElement of TooltipProvider
 * @param defaultProps - (optional) default prop values provided by the implementing type
 *
 * {@docCategory TooltipProvider}
 */
export const useTooltipProvider = (
  props: TooltipProviderProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: TooltipProviderProps,
): TooltipProviderState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref),
      tooltipManager: useTooltipManager(),
    },
    defaultProps,
    props,
  );

  return state;
};
