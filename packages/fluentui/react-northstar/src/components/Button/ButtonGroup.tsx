import { Accessibility, ButtonGroupBehaviorProps, buttonGroupBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';

import {
  WithAsProp,
  withSafeTypeForAs,
  ShorthandCollection,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import {
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthandFactory,
  createShorthand,
} from '../../utils';
import Button, { ButtonProps } from './Button';
import { getElementType, useAccessibility, useUnhandledProps, useTelemetry, useStyles } from '@fluentui/react-bindings';
// @ts-ignore
import { ThemeContext } from 'react-fela';

export interface ButtonGroupProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<ButtonGroupBehaviorProps>;

  /** The buttons contained inside the ButtonGroup. */
  buttons?: ShorthandCollection<ButtonProps>;

  /** The buttons inside group can appear circular. */
  circular?: boolean;
}

export type ButtonGroupStylesProps = Required<Pick<ButtonGroupProps, 'circular'>>;

export const buttonGroupClassName = 'ui-buttons';

export const ButtonGroup: React.FC<WithAsProp<ButtonGroupProps>> &
  FluentComponentStaticProps<ButtonGroupProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(ButtonGroup.displayName, context.telemetry);
  setStart();
  const { children, buttons, circular, content, className, design, styles, variables } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(ButtonGroup.handledProps, props);
  const { classes, styles: ResolvedStyles } = useStyles<ButtonGroupStylesProps>(ButtonGroup.displayName, {
    className: buttonGroupClassName,
    mapPropsToStyles: () => ({
      circular,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const getA11yProps = useAccessibility<ButtonGroupBehaviorProps>(props.accessibility, {
    debugName: ButtonGroup.displayName,
    rtl: context.rtl,
  });

  const getStyleForButtonIndex = (styles, isFirst, isLast) => {
    let resultStyles = {};
    if (isFirst) {
      resultStyles = styles.firstButton;
    }
    if (isLast) {
      resultStyles = { ...resultStyles, ...styles.lastButton };
    }
    if (!isFirst && !isLast) {
      resultStyles = styles.middleButton;
    }
    return resultStyles;
  };

  const emptyButtons = _.isNil(buttons);

  const element = (
    <ElementType
      {...{
        ...getA11yProps('root', {
          className: classes.root,
          ...unhandledProps,
        }),
        ...(emptyButtons && { ...rtlTextContainer.getAttributes({ forElements: [children, content] }) }),
      }}
    >
      {emptyButtons
        ? childrenExist(children)
          ? children
          : content
        : _.map(buttons, (button, idx) =>
            createShorthand(Button, button, {
              defaultProps: () => ({
                circular,
                styles: getStyleForButtonIndex(ResolvedStyles, idx === 0, idx === buttons.length - 1),
              }),
            }),
          )}
    </ElementType>
  );

  setEnd();

  return element;
};

ButtonGroup.displayName = 'ButtonGroup';

ButtonGroup.propTypes = {
  ...commonPropTypes.createCommon(),
  buttons: customPropTypes.collectionShorthand,
  circular: PropTypes.bool,
};

ButtonGroup.defaultProps = {
  accessibility: buttonGroupBehavior,
  as: 'div',
};

ButtonGroup.handledProps = Object.keys(ButtonGroup.propTypes) as any;

ButtonGroup.create = createShorthandFactory({
  Component: ButtonGroup,
  mappedProp: 'content',
  mappedArrayProp: 'buttons',
});

/**
 * A ButtonGroup represents multiple related actions as a group.
 */
export default withSafeTypeForAs<typeof ButtonGroup, ButtonGroupProps>(ButtonGroup);
