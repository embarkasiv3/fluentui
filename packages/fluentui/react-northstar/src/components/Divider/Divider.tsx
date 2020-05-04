import { Accessibility } from '@fluentui/accessibility';
import * as React from 'react';
import * as PropTypes from 'prop-types';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ColorComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { WithAsProp, withSafeTypeForAs, ProviderContextPrepared, FluentComponentStaticProps } from '../../types';
import { useTelemetry, useAccessibility, getElementType, useUnhandledProps, useStyles } from '@fluentui/react-bindings';

export interface DividerProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ColorComponentProps,
    ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** A divider can be fitted, without any space above or below it. */
  fitted?: boolean;

  /** A divider can be resized using this multiplier. (default: 0) */
  size?: number;

  /** A divider can be emphasized to draw a user's attention. */
  important?: boolean;

  /** A divider can be positioned vertically. */
  vertical?: boolean;
}

export type DividerStylesProps = Required<
  Pick<DividerProps, 'color' | 'fitted' | 'size' | 'important' | 'vertical'> & {
    hasContent: boolean;
  }
>;

export const dividerClassName = 'ui-divider';

export const Divider: React.FC<WithAsProp<DividerProps>> & FluentComponentStaticProps<DividerProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(Divider.displayName, context.telemetry);
  setStart();
  const {
    children,
    color,
    fitted,
    size,
    important,
    content,
    vertical,
    className,
    design,
    styles,
    variables,
    accessibility,
  } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Divider.handledProps, props);
  const getA11yProps = useAccessibility<never>(accessibility, {
    debugName: Divider.displayName,
    rtl: context.rtl,
  });
  const { classes } = useStyles<DividerStylesProps>(Divider.displayName, {
    className: dividerClassName,
    mapPropsToStyles: () => ({
      hasContent: childrenExist(children) || !!content,
      color,
      fitted,
      size,
      important,
      vertical,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();
  return element;
};

Divider.displayName = 'Divider';

Divider.propTypes = {
  ...commonPropTypes.createCommon({ color: true }),
  fitted: PropTypes.bool,
  size: PropTypes.number,
  important: PropTypes.bool,
  vertical: PropTypes.bool,
};

Divider.defaultProps = {
  size: 0,
};

Divider.handledProps = Object.keys(Divider.propTypes) as any;

Divider.create = createShorthandFactory({ Component: Divider, mappedProp: 'content' });

/**
 * A Divider visually segments content.
 */
export default withSafeTypeForAs<typeof Divider, DividerProps>(Divider);
