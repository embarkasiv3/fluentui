import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider/lib/compat/index';
import { useFocusRects } from '@fluentui/utilities';
import { useCardSection, CardSectionProps } from '../../CardSection';
import { useCardHeaderClasses } from './useCardHeaderClasses';

export const CardHeader = React.forwardRef<HTMLElement, CardSectionProps>((props, ref) => {
  const { render, state } = useCardSection(props, ref);

  useCardHeaderClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state, '--cardHeader');

  return render(state);
});

CardHeader.displayName = 'CardHeader';
