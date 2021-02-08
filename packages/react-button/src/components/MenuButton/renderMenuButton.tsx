import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuButtonState } from './MenuButton.types';
import { menuButtonShorthandProps } from './useMenuButton';

/**
 * Redefine the render function to add slots. Reuse the button structure but add
 * slots to children.
 */
export const renderMenuButton = (state: MenuButtonState) => {
  const { slots, slotProps } = getSlots(state, menuButtonShorthandProps);
  const { children, expanded, iconOnly, persistMenu } = state;

  const contentVisible = !iconOnly && (children || slotProps.content?.children);

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
      {contentVisible && <slots.content {...slotProps.content} />}
      {!iconOnly && <slots.menuIcon {...slotProps.menuIcon} />}
      {(persistMenu || expanded) && <slots.menu {...slotProps.menu} />}
    </slots.root>
  );
};
