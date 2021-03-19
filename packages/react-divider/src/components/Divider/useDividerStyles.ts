import { makeStylesCompat, ax } from '@fluentui/react-make-styles';
import { DividerState } from './Divider.types';

/**
 * Styles for the root slot
 */
export const useRootStyles = (state: DividerState): string => {
  const result = makeStylesCompat<DividerState>([
    /* ROOT */
    [
      null,
      tokens => ({
        /* CSS Vars */
        '--divider-borderMargin': '12px',
        '--divider-flexDirection': 'row',
        '--divider-fontColor': tokens.alias.color.neutral.neutralForeground2,
        '--divider-fontFamily': 'Segoe UI',
        '--divider-fontSize': '12px',
        '--divider-fontWeight': '400',
        '--divider-lineHeight': '17px',
        '--divider-borderSize': '1px',
        '--divider-borderStyle': 'solid',

        alignItems: 'center',
        color: 'var(--divider-fontColor)',
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'var(--divider-flexDirection)',
        fontFamily: 'var(--divider-fontFamily)',
        fontSize: 'var(--divider-fontSize)',
        fontWeight: 'var(--divider-fontWeight)',
        position: 'relative',
        boxSizing: 'border-box',
        lineHeight: 'var(--divider-lineHeight)',
        ':before': {
          display: 'flex',
          flexGrow: 1,
          boxSizing: 'border-box',
          '--divider-color': tokens.alias.color.neutral.neutralStroke2,
        },

        ':after': {
          display: 'flex',
          flexGrow: 1,
          boxSizing: 'border-box',
          '--divider-color': tokens.alias.color.neutral.neutralStroke2,
        },
      }),
    ],
    [
      s => {
        return !s.children;
      },
      {
        '--divider-borderMargin': 0,
      },
    ],
    /* Border color override */
    [
      s => s.color !== undefined,
      { ':before': { '--divider-color': state.color }, ':after': { '--divider-color': state.color } },
    ],
    /* Appearance */
    [
      s => s.appearance === 'subtle',
      tokens => ({
        ':before': { '--divider-color': tokens.alias.color.neutral.neutralStroke3 },
        ':after': { '--divider-color': tokens.alias.color.neutral.neutralStroke3 },
      }),
    ],
    [
      s => s.appearance === 'brand',
      tokens => ({
        '--divider-fontColor': tokens.alias.color.brand.brandBackgroundStatic,
        ':before': { '--divider-color': tokens.alias.color.brand.brandBackgroundStatic },
        ':after': { '--divider-color': tokens.alias.color.brand.brandBackgroundStatic },
      }),
    ],
    [
      s => s.appearance === 'strong',
      tokens => ({
        ':before': { '--divider-color': tokens.alias.color.neutral.neutralStroke1 },
        ':after': { '--divider-color': tokens.alias.color.neutral.neutralStroke1 },
      }),
    ],
    /* Horizontal Divider overrides */
    [
      s => !s.vertical,
      {
        width: '100%',
        ':before': {
          borderTopColor: 'var(--divider-color)',
          borderTopWidth: 'var(--divider-borderSize)',
          borderTopStyle: 'var(--divider-borderStyle)',
        },
        ':after': {
          borderTopColor: 'var(--divider-color)',
          borderTopWidth: 'var(--divider-borderSize)',
          borderTopStyle: 'var(--divider-borderStyle)',
        },
        '&>:only-child': {
          display: 'flex',
          textAlign: 'center',
        },
      },
    ],
    /* Vertical Divider overrides */
    [
      s => s.vertical,
      tokens => ({
        //alignSelf: 'stretch',
        minHeight: '20px',
        flexDirection: 'column',
        ':before': {
          borderRightColor: 'var(--divider-color)',
          borderRightWidth: 'var(--divider-borderSize)',
          borderRightStyle: 'var(--divider-borderStyle)',
        },
        ':after': {
          borderRightColor: 'var(--divider-color)',
          borderRightWidth: 'var(--divider-borderSize)',
          borderRightStyle: 'var(--divider-borderStyle)',
        },
        '&>:only-child': {
          display: 'flex',
          textAlign: 'center',
        },
      }),
    ],
    [
      s => s.vertical && s.children !== undefined,
      {
        minHeight: '84px',
      },
    ],

    /* alignContent Start */
    [
      s => s.alignContent === 'start',
      {
        ':after': {
          content: '""',
        },
      },
    ],
    /* alignContent End */
    [
      s => s.alignContent === 'end',
      {
        ':before': {
          content: '""',
        },
      },
    ],
    /* alignContent Center or Default with content Vertical */
    [
      s => {
        return (s.alignContent === 'center' || !s.alignContent) && s.children !== undefined && s.vertical;
      },
      {
        ':before': {
          content: '""',
        },
        ':after': {
          content: '""',
        },
      },
    ],
    /* alignContent Center or Default with content Horizontal*/
    [
      s => {
        return (s.alignContent === 'center' || !s.alignContent) && s.children !== undefined && !s.vertical;
      },
      {
        ':before': {
          content: '""',
        },
        ':after': {
          content: '""',
        },
      },
    ],
    /* alignContent Center or Default without content*/
    [
      s => {
        return (s.alignContent === 'center' || !s.alignContent) && s.children === undefined;
      },
      {
        ':before': {
          content: '""',
        },
      },
    ],
    /* Vertical alignContent start*/
    [
      s => s.vertical && s.alignContent === 'start',
      {
        ':before': {
          content: '""',
          maxHeight: '8px',
          marginBottom: 'var(--divider-borderMargin)',
        },

        ':after': {
          marginTop: 'var(--divider-borderMargin)',
        },
      },
    ],
    /* Vertical alignContent end*/
    [
      s => s.vertical && s.alignContent === 'end',
      {
        ':before': {
          marginBottom: 'var(--divider-borderMargin)',
        },
        ':after': {
          content: '""',
          maxHeight: '8px',
          marginTop: 'var(--divider-borderMargin)',
        },
      },
    ],
    /* Vertical alignContent center*/
    [
      s => s.vertical && (s.alignContent === 'center' || !s.alignContent),
      {
        ':before': {
          marginBottom: 'var(--divider-borderMargin)',
        },
        ':after': {
          marginTop: 'var(--divider-borderMargin)',
        },
      },
    ],
    /* Horizontal alignContent start*/
    [
      s => !s.vertical && s.alignContent === 'start',
      {
        ':before': {
          marginRight: 'var(--divider-borderMargin)',
          maxWidth: '8px',
          content: '""',
        },
        ':after': {
          marginLeft: 'var(--divider-borderMargin)',
        },
      },
    ],
    /* Horizontal alignContent end*/
    [
      s => !s.vertical && s.alignContent === 'end',
      {
        ':before': {
          marginRight: 'var(--divider-borderMargin)',
        },
        ':after': {
          maxWidth: '8px',
          content: '""',
          marginLeft: 'var(--divider-borderMargin)',
        },
      },
    ],
    /* Horizontal alignContent center*/
    [
      s => !s.vertical && (s.alignContent === 'center' || !s.alignContent),
      {
        ':before': {
          marginRight: 'var(--divider-borderMargin)',
        },
        ':after': {
          marginLeft: 'var(--divider-borderMargin)',
        },
      },
    ],
    /* Important */
    [
      s => {
        return s.important;
      },
      {
        '--divider-fontWeight': `700`,
      },
    ],
    /* Border Color Vertical */
    [
      s => {
        return s.color !== undefined && s.vertical;
      },
      {
        ':before': {
          borderRightColor: 'var(--divider-color)',
        },
        ':after': {
          borderRightColor: 'var(--divider-color)',
        },
      },
    ],
    /* Border Color Horizontal */
    [
      s => {
        return s.color !== undefined && !s.vertical;
      },
      {
        ':before': {
          borderTopColor: 'var(--divider-color)',
        },
        ':after': {
          borderTopColor: 'var(--divider-color)',
        },
      },
    ],
    [
      s => {
        return s.children === undefined && s.vertical;
      },
      {
        ':before': {
          marginBottom: 0,
        },
      },
    ],
    /* height override */
    [
      s => s.height !== undefined,
      {
        height: state.height,
      },
    ],
    /* width override */
    [
      s => s.width !== undefined,
      {
        width: state.width,
      },
    ],
    /* Inset */
    [
      s => s.inset && !s.vertical,
      {
        paddingLeft: '12px',
        paddingRight: '12px',
      },
    ],
    [
      s => s.inset && s.vertical,
      {
        marginTop: '12px',
        marginBottom: '12px',
      },
    ],
    /* Margin Override */
    [
      s => s.margin !== undefined,
      {
        margin: state.margin,
      },
    ],
    [
      s => s.marginTop !== undefined,
      {
        marginTop: state.marginTop,
      },
    ],
    [
      s => s.marginBottom !== undefined,
      {
        marginBottom: state.marginBottom,
      },
    ],
    [
      s => s.marginLeft !== undefined,
      {
        marginLeft: state.marginTop,
      },
    ],
    [
      s => s.marginRight !== undefined,
      {
        marginRight: state.marginRight,
      },
    ],
    /* Font Color Override */
    [
      s => s.fontColor !== undefined,
      {
        color: state.fontColor,
      },
    ],
    /* Font size Override */
    [
      s => s.fontSize !== undefined,
      {
        fontSize: state.fontSize,
      },
    ],
    /* FontWeight Override */
    [
      s => s.fontWeight !== undefined,
      {
        '--divider-fontWeight': state.fontWeight,
      },
    ],
    /* Border Overrides */

    [
      s => s.borderSize !== undefined,
      {
        '--divider-borderSize': state.borderSize,
      },
    ],
    [
      s => s.borderStyle !== undefined,
      {
        '--divider-borderStyle': state.borderStyle,
      },
    ],
  ]);
  return result(state);
};

/** Applies style classnames to slots */
export const useDividerStyles = (state: DividerState) => {
  const rootClassName = useRootStyles(state);

  state.className = ax(rootClassName, state.className);

  return state;
};
