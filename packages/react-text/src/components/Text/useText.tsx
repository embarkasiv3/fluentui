import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';

import { TextProps, TextState } from './Text.types';

const textShorthandProps = [] as const;

const mergeProps = makeMergeProps<TextState>({ deepMerge: textShorthandProps });

/**
 * Given user props, returns state and render function for a Text.
 */
export const useText = (props: TextProps, ref: React.Ref<HTMLElement>, defaultProps?: TextProps): TextState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      as: 'span',
    },
    defaultProps && resolveShorthandProps(defaultProps, textShorthandProps),
    resolveShorthandProps(props, textShorthandProps),
  );

  return state;
};
