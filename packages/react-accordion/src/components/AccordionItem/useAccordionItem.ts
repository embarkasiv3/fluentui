import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { AccordionItemProps, AccordionItemState } from './AccordionItem.types';
import { useCreateAccordionItemContext } from './useAccordionItemContext';

/**
 * Consts listing which props are shorthand props.
 */
export const accordionItemShorthandProps = [];

const mergeProps = makeMergeProps<AccordionItemState>({ deepMerge: accordionItemShorthandProps });

/**
 * Returns the props and state required to render the component
 * @param props - AccordionItem properties
 * @param ref - reference to root HTMLElement of AccordionItem
 * @param defaultProps - default values for the properties of AccordionItem
 */
export const useAccordionItem = (
  props: AccordionItemProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: AccordionItemProps,
): AccordionItemState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps,
    resolveShorthandProps(props, accordionItemShorthandProps),
  );
  state.context = useCreateAccordionItemContext(state);
  return state;
};
