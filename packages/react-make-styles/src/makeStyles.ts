import { makeStyles as vanillaMakeStyles, MakeStylesOptions, MakeStylesStyleRule } from '@fluentui/make-styles';
import { useTheme, useFluent } from '@fluentui/react-shared-contexts';
import { Theme } from '@fluentui/react-theme';

import { useRenderer } from './useRenderer';

export function makeStyles<Slots extends string>(stylesBySlots: Record<Slots, MakeStylesStyleRule<Theme>>) {
  const getStyles = vanillaMakeStyles(stylesBySlots);

  if (process.env.NODE_ENV === 'test') {
    return () => ({} as Record<Slots, string>);
  }

  return function useClasses(): Record<Slots, string> {
    const { dir, targetDocument } = useFluent();
    const theme = useTheme();

    const renderer = useRenderer(targetDocument);
    const options: MakeStylesOptions<Theme> = {
      dir,
      tokens: theme,
      renderer,
    };

    return getStyles(options);
  };
}

/**
 * Internal implementation of **makeStyles** method using a provided custom theme
 * This is exclusively used in theme definition by `react-theme-provider`
 * @private
 */
export function makeStylesWithCustomTheme<Slots extends string>(
  stylesBySlots: Record<Slots, MakeStylesStyleRule<Theme>>,
) {
  const getStyles = vanillaMakeStyles(stylesBySlots);

  if (process.env.NODE_ENV === 'test') {
    return () => ({} as Record<Slots, string>);
  }

  return function useClasses(customTheme: Theme): Record<Slots, string> {
    const { dir, targetDocument } = useFluent();

    const renderer = useRenderer(targetDocument);
    const options: MakeStylesOptions<Theme> = {
      dir,
      tokens: customTheme,
      renderer,
    };

    return getStyles(options);
  };
}
