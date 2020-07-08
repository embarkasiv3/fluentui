import * as React from 'react';
import { BaseSlots, ComponentProps, SlotProp, SlotProps } from '@fluentui/react-compose';
import { ColorPlateSet } from '@fluentui/react-theme-provider';
import { RecursivePartial } from '../../utils/tempTypes';

export type SizeValue = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

/**
 * {@docCategory Button}
 */
export interface ButtonRef {
  /**
   * Sets focus to the button.
   */
  focus: () => void;
}

export interface ButtonProps extends ComponentProps, React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Access the imperative API of the Button.
   */
  componentRef?: React.RefObject<ButtonRef>;

  /**
   * Shorthand icon. A shorthand prop can be a literal, object,
   * JSX, or function which takes render options.
   */
  icon?: SlotProp<React.HTMLAttributes<HTMLSpanElement>>;

  /**
   * Shorthand loader content within the button.
   */
  loader?: SlotProp<React.HTMLAttributes<HTMLSpanElement>>;

  /** A button can appear circular. */
  circular?: boolean;

  /** A button can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A button can fill the width of its container. */
  fluid?: boolean;

  /** A button can contain only an icon. */
  iconOnly?: boolean;

  /** An icon button can format its icon to appear before or after its content. */
  iconPosition?: 'before' | 'after';

  /** A button that inherits its background and has a subtle appearance. */
  inverted?: boolean;

  /** A button can show a loading indicator. */
  loading?: boolean;

  /**
   * Called after a user clicks the button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  // onClick?: ComponentEventHandler<ButtonProps>;

  /**
   * Called after a user focuses the button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  // onFocus?: ComponentEventHandler<ButtonProps>;

  /** A button can emphasize that it represents the primary action. */
  primary?: boolean;

  /** A button can emphasize that it represents an alternative action. */
  secondary?: boolean;

  /** A button can be sized. */
  size?: SizeValue;

  // TODO: Deprecate or rename to textOnly for alignment with iconOnly?
  /** A button can be formatted to show only text in order to indicate a less-pronounced action. */
  // text?: boolean;

  tokens?: RecursivePartial<ButtonTokens>;
}

export interface ButtonState extends ButtonProps {
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export interface ButtonSlots extends BaseSlots {
  icon: React.ElementType;
  loader: React.ElementType;
}

export type ButtonSlotProps = SlotProps<ButtonSlots, ButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement>>;

export type ButtonTokens = ColorPlateSet & {
  /* sizing */
  padding: string;
  margin: string;
  height: string;
  minWidth: string;
  maxWidth: string;
  contentGap: string;
  iconSize: string;
  borderRadius: string;
  borderWidth: string;
  boxShadow: string;
  width: string;

  size: {
    smallest: string;
    smaller: string;
    small: string;
    regular: string;
    large: string;
    larger: string;
    largest: string;
  };

  transform: string;
  transition: string;

  fontFamily: string;
  fontSize: string;
  fontWeight: string;

  pressed: {
    transform: string;
  };
};
