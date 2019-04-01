import * as React from 'react';
import { SplitMenuButton, ISplitMenuButtonProps } from '@uifabric/experiments';
import { Stack } from 'office-ui-fabric-react';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu: ISplitMenuButtonProps['menu'] = render => render((MenuType, props) => <MenuType {...props} items={menuItems} />);

const tokens = {
  sectionStack: {
    childrenGap: 32
  },
  headingStack: {
    childrenGap: 16
  },
  buttonStack: {
    childrenGap: 12
  }
};

const alertClicked = (): void => {
  alert('Clicked');
};

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal disableShrink tokens={tokens.buttonStack}>
    {props.children}
  </Stack>
);

// tslint:disable:jsx-no-lambda
export class SplitMenuButtonExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.headingStack} padding={8}>
          <div>
            <Stack tokens={tokens.buttonStack}>
              <ButtonStack>
                <SplitMenuButton icon="Add" content="Default split button" menu={buttonMenu} onClick={alertClicked} />
                <SplitMenuButton disabled icon="Add" content="Disabled split button" menu={buttonMenu} onClick={alertClicked} />
                <SplitMenuButton primary icon="Add" content="Primary split button" menu={buttonMenu} onClick={alertClicked} />
                <SplitMenuButton
                  disabled
                  primary
                  icon="Add"
                  content="Disabled primary split button"
                  menu={buttonMenu}
                  onClick={alertClicked}
                />
              </ButtonStack>
              <ButtonStack>
                <SplitMenuButton
                  primaryActionDisabled
                  icon="Add"
                  content="First action disabled split button"
                  menu={buttonMenu}
                  onClick={alertClicked}
                />
                <SplitMenuButton
                  primaryActionDisabled
                  primary
                  icon="Add"
                  content="First action disabled primary split button"
                  menu={buttonMenu}
                  onClick={alertClicked}
                />
              </ButtonStack>
            </Stack>
          </div>
        </Stack>
      </Stack>
    );
  }
}
