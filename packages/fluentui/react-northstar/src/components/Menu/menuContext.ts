import { createContext } from '@fluentui/react-context-selector';
import { ComponentVariablesInput } from '@fluentui/styles';
import * as React from 'react';
import { Accessibility } from '@fluentui/accessibility';

export type MenuContextValue = {
  activeIndex: number;
  variables: ComponentVariablesInput;
  pointing: boolean | 'start' | 'end';
  primary: boolean;
  underlined: boolean;
  iconOnly: boolean;
  vertical: boolean;
  secondary: boolean;
  pills: boolean;
  inSubmenu: boolean;
  onItemClick: (e: React.KeyboardEvent | React.MouseEvent, itemIndex: number) => void;
  accessibilityBehaviorForItem: Accessibility;
  accessibilityBehaviorForDivider: Accessibility;
};

export type MenuContextSubscribedValue = Pick<
  MenuContextValue,
  | 'activeIndex'
  | 'variables'
  | 'onItemClick'
  | 'primary'
  | 'pointing'
  | 'underlined'
  | 'iconOnly'
  | 'vertical'
  | 'inSubmenu'
  | 'pills'
  | 'secondary'
  | 'accessibilityBehaviorForItem'
  | 'accessibilityBehaviorForDivider'
> & {
  active: boolean;
};

export const MenuContext = createContext<MenuContextValue>(
  {
    activeIndex: -1,
    variables: {},
    pointing: false,
    primary: false,
    underlined: false,
    iconOnly: false,
    vertical: false,
    secondary: false,
    pills: false,
    inSubmenu: false,
    accessibilityBehaviorForItem: undefined,
    accessibilityBehaviorForDivider: undefined,
    onItemClick: null,
  },
  { strict: false },
);

export const MenuContextProvider = MenuContext.Provider;
