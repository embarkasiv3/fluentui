import { IStyle } from 'office-ui-fabric-react';
import { IMessageBarStyleProps, IMessageBarStyles, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

const IconButtonStyles = (props: IMessageBarStyleProps): IStyle => {
  const { theme, messageBarType } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  return [
    (messageBarType === MessageBarType.error || messageBarType === MessageBarType.severeWarning) && {
      backgroundColor: semanticColors.statusErrorBackground,
      selectors: {
        '.ms-Button-icon': {
          color: semanticColors.statusErrorText,
          selectors: {
            '&:hover': {
              backgroundColor: semanticColors.statusErrorBackground
            },
            '&:active': {
              backgroundColor: semanticColors.statusErrorBackground
            }
          }
        }
      }
    },

    messageBarType === MessageBarType.info && {
      backgroundColor: semanticColors.statusInformationBackground,
      selectors: {
        '.ms-Button-icon': {
          color: semanticColors.statusInformationText,
          selectors: {
            '&:hover': {
              backgroundColor: semanticColors.statusInformationBackground
            },
            '&:active': {
              backgroundColor: semanticColors.statusInformationBackground
            }
          }
        }
      }
    },

    messageBarType === MessageBarType.success && {
      backgroundColor: semanticColors.statusSuccessBackground,
      selectors: {
        '.ms-Button-icon': {
          color: semanticColors.statusSuccessText,
          selectors: {
            '&:hover': {
              backgroundColor: semanticColors.statusSuccessBackground
            },
            '&:active': {
              backgroundColor: semanticColors.statusSuccessBackground
            }
          }
        }
      }
    },

    (messageBarType === MessageBarType.warning || messageBarType === MessageBarType.blocked) && {
      backgroundColor: semanticColors.statusWarningBackground,
      selectors: {
        '.ms-Button-icon': {
          color: semanticColors.statusWarningText,
          selectors: {
            '&:hover': {
              backgroundColor: semanticColors.statusWarningBackground
            },
            '&:active': {
              backgroundColor: semanticColors.statusWarningBackground
            }
          }
        }
      }
    },

    !messageBarType && {
      backgroundColor: semanticColors.bodyBackground,
      selectors: {
        '.ms-Button-icon': {
          color: semanticColors.bodyText,
          selectors: {
            '&:hover': {
              backgroundColor: semanticColors.buttonBackgroundHovered
            },
            '&:active': {
              backgroundColor: semanticColors.buttonBackgroundHovered
            }
          }
        }
      }
    }
  ];
};

const RootStyles = (props: IMessageBarStyleProps): IStyle => {
  const { theme, messageBarType } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  return [
    (messageBarType === MessageBarType.error || messageBarType === MessageBarType.severeWarning) && {
      backgroundColor: semanticColors.statusErrorBackground,
      color: semanticColors.statusErrorText,
      selectors: {
        '.ms-Button-icon': {
          color: semanticColors.statusErrorText,
          selectors: {
            '&:hover': {
              backgroundColor: semanticColors.statusErrorBackground
            },
            '&:active': {
              backgroundColor: semanticColors.statusErrorBackground
            }
          }
        }
      }
    },

    messageBarType === MessageBarType.info && {
      backgroundColor: semanticColors.statusInformationBackground,
      color: semanticColors.statusInformationText,
      selectors: {
        '.ms-Button-icon': {
          color: semanticColors.statusInformationText,
          selectors: {
            '&:hover': {
              backgroundColor: semanticColors.statusInformationBackground
            },
            '&:active': {
              backgroundColor: semanticColors.statusInformationBackground
            }
          }
        }
      }
    },

    messageBarType === MessageBarType.success && {
      backgroundColor: semanticColors.statusSuccessBackground,
      color: semanticColors.statusSuccessText,
      selectors: {
        '.ms-Button-icon': {
          color: semanticColors.statusSuccessText,
          selectors: {
            '&:hover': {
              backgroundColor: semanticColors.statusSuccessBackground
            },
            '&:active': {
              backgroundColor: semanticColors.statusSuccessBackground
            }
          }
        }
      }
    },

    (messageBarType === MessageBarType.warning || messageBarType === MessageBarType.blocked) && {
      backgroundColor: semanticColors.statusWarningBackground,
      color: semanticColors.statusWarningText,
      selectors: {
        '.ms-Button-icon': {
          color: semanticColors.statusWarningText,
          selectors: {
            '&:hover': {
              backgroundColor: semanticColors.statusWarningBackground
            },
            '&:active': {
              backgroundColor: semanticColors.statusWarningBackground
            }
          }
        }
      }
    },

    !messageBarType && {
      backgroundColor: semanticColors.bodyBackground,
      border: `2px solid ${semanticColors.bodyDivider}`,
      color: semanticColors.bodyText,
      selectors: {
        '.ms-Button-icon': {
          color: semanticColors.bodyText,
          selectors: {
            '&:hover': {
              backgroundColor: semanticColors.bodyBackground
            },
            '&:active': {
              backgroundColor: semanticColors.bodyBackground
            }
          }
        }
      }
    }
  ];
};

export const MessageBarStyles = (props: IMessageBarStyleProps): Partial<IMessageBarStyles> => {
  const { theme, messageBarType } = props;
  const semanticColors = theme.semanticColors as IExtendedSemanticColors;

  const rootStyles = RootStyles(props);
  const iconButtonStyles = IconButtonStyles(props);

  return {
    actions: {
      // Buttons utilizes an alpha channel < 1 for their pressed and hover state background colors.
      // This styling effectively makes the button background the body background and applies hover / active styles to next child down.
      selectors: {
        '.ms-Button': {
          backgroundColor: semanticColors.bodyBackground,
          color: semanticColors.buttonText,
          padding: '0px',
          border: `1px solid ${semanticColors.buttonText}`,
          selectors: {
            '.ms-Button-flexContainer': {
              paddingLeft: '16px',
              paddingRight: '16px',
              selectors: {
                ':hover': {
                  backgroundColor: semanticColors.buttonBackgroundHovered,
                  color: semanticColors.buttonTextHovered
                },
                ':active': {
                  backgroundColor: semanticColors.buttonBackgroundPressed,
                  color: semanticColors.buttonTextPressed
                }
              }
            },
            ':hover': {
              backgroundColor: semanticColors.bodyBackground,
              color: semanticColors.buttonText
            },
            ':active': {
              backgroundColor: semanticColors.bodyBackground,
              color: semanticColors.buttonText
            }
          }
        }
      }
    },
    dismissSingleLine: iconButtonStyles,
    dismissal: iconButtonStyles,
    expand: iconButtonStyles,
    expandSingleLine: iconButtonStyles,
    icon: [
      (messageBarType === MessageBarType.error || messageBarType === MessageBarType.severeWarning) && {
        color: semanticColors.statusErrorIcon
      },

      messageBarType === MessageBarType.info && {
        color: semanticColors.statusInformationIcon
      },

      messageBarType === MessageBarType.success && {
        color: semanticColors.statusSuccessIcon
      },

      (messageBarType === MessageBarType.warning || messageBarType === MessageBarType.blocked) && {
        color: semanticColors.statusWarningIcon
      },

      !messageBarType && {
        color: semanticColors.bodyText
      }
    ],
    root: rootStyles
  };
};
