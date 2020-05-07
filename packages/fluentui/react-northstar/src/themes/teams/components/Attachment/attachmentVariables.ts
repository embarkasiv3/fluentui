import { pxToRem } from '../../../../utils';

export type AttachmentVariables = {
  padding: string;
  iconSpace: string;
  iconSize: string;

  borderColor: string;
  borderRadius: string;
  backgroundColor: string;
  backgroundColorHover: string;
  textColor: string;
  textColorHover: string;
  boxShadow: string;

  focusBackgroundColor: string;
  focusColor: string;
  siblingsFocusColor: string;

  siblingsHoverColor: string;

  progressColor: string;
  progressHeight: number;

  headerFontSize: string;
  headerFontWeight: number;
  headerLineHeight: number;

  descriptionFontSize: string;
  descriptionFontWeight: number;
  descriptionLineHeight: number;

  actionHeight: string;
  actionMaxWidth: string;
  actionColor: string;
  actionPrimaryColor: string;
  actionColorDisabled: string;
  actionIconSize: string;
  actionLoaderBorderSize: string;
  actionLoaderSize: string;
  actionLoaderSvgHeight: string;
  actionLoaderSvgAnimationHeight: string;
  actionFocusBorderRadius: string;
};

export default (siteVariables: any): AttachmentVariables => ({
  padding: `${pxToRem(7)} ${pxToRem(3)} ${pxToRem(7)} ${pxToRem(11)}`, // padding set to 1px less to account for 1px border
  iconSpace: pxToRem(12),
  iconSize: pxToRem(32),
  borderColor: siteVariables.colors.grey[200],
  borderRadius: pxToRem(3),
  backgroundColor: siteVariables.colors.grey[100],
  backgroundColorHover: siteVariables.colors.grey[150],
  textColor: siteVariables.colors.grey[750],
  textColorHover: siteVariables.colors.grey[750],
  boxShadow: siteVariables.shadowLevel1,

  focusBackgroundColor: undefined,
  focusColor: undefined,
  siblingsFocusColor: undefined,

  siblingsHoverColor: undefined,

  progressColor: siteVariables.colors.green[200],
  progressHeight: 4,

  headerFontSize: siteVariables.fontSizes.medium,
  headerFontWeight: siteVariables.fontWeightSemibold,
  headerLineHeight: siteVariables.lineHeightMedium,

  descriptionFontSize: siteVariables.fontSizes.small,
  descriptionFontWeight: siteVariables.fontWeightRegular,
  descriptionLineHeight: siteVariables.lineHeightDefault,

  // action variables
  actionHeight: pxToRem(32),
  actionMaxWidth: pxToRem(280),
  actionColor: siteVariables.colors.grey[750],
  actionPrimaryColor: siteVariables.colorScheme.brand.foreground,
  actionColorDisabled: siteVariables.colorScheme.brand.foregroundDisabled1,
  actionIconSize: pxToRem(16),
  actionLoaderBorderSize: pxToRem(2),
  actionLoaderSize: pxToRem(20),
  actionLoaderSvgHeight: pxToRem(1220),
  actionLoaderSvgAnimationHeight: pxToRem(-1200),
  actionFocusBorderRadius: pxToRem(3),
});
