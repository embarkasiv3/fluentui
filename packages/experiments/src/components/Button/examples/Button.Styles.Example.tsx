import * as React from 'react';
import { Button, MenuButton, IMenuButtonProps } from '@uifabric/experiments';
import { createTheme, mergeStyles, Stack } from 'office-ui-fabric-react';

const testTheme = createTheme({
  semanticColors: {
    buttonText: '#E20000'
  },
  fonts: {
    medium: {
      color: 'purple'
    }
  }
});

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

const menuProps: IMenuButtonProps['menu'] = {
  props: {
    items: [
      {
        key: 'a',
        name: 'Item a'
      },
      {
        key: 'b',
        name: 'Item b'
      }
    ]
  }
};

const ButtonStack = (props: { children: JSX.Element[] | JSX.Element }) => (
  <Stack horizontal disableShrink tokens={tokens.buttonStack}>
    {props.children}
  </Stack>
);

// tslint:disable:jsx-no-lambda
export class ButtonStylesExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const testClassName = mergeStyles({ color: 'blue' });

    return (
      <Stack tokens={tokens.sectionStack}>
        <Stack tokens={tokens.headingStack} padding={8}>
          <div>
            <Stack tokens={tokens.buttonStack}>
              <ButtonStack>
                <Button icon="PeopleAdd" content="Button Theme: Red Icon and Text" theme={testTheme} />
                <Button icon="PeopleAdd" content={{ props: { children: 'Slot Theme: Purple Text', theme: testTheme } }} />
              </ButtonStack>
              <ButtonStack>
                <Button icon="PeopleAdd" content="Button Styles Object: Red Text (root)" styles={{ root: { color: '#E20000' } }} />
                <Button icon="PeopleAdd" content="Button Styles Object: Red Text (stack)" styles={{ stack: { color: '#E20000' } }} />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content="Stack Styles Object: Red Text"
                  stack={{ props: { styles: { root: { color: '#E20000' } } } }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button icon="PeopleAdd" content="Button Styles Object: Pink Icon" styles={{ icon: { color: 'pink ' } }} />
                <Button
                  icon={{ props: { iconName: 'PeopleAdd', styles: { root: { color: 'pink ' } } } }}
                  content="Icon Styles Object: Pink Icon"
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content="Button Styles Function: Golden Brown Content"
                  styles={(props, theme) => ({ content: { color: '#8F6800' } })}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content="Button Styles Function: Purple Icon via Button Theme"
                  styles={(props, theme) => ({ icon: { color: theme.fonts.small.color } })}
                  theme={testTheme}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content={{
                    props: {
                      children: 'Content Styles Function: Golden Brown Text',
                      styles: (props, theme) => ({ root: { color: '#8F6800' } })
                    }
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content={{
                    props: {
                      children: 'Content Styles Function: Red Text via Content Theme',
                      styles: (props, theme) => ({ root: { color: theme.semanticColors.buttonText } }),
                      theme: testTheme
                    }
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon={{
                    props: {
                      iconName: 'PeopleAdd',
                      styles: props => ({ root: { color: '#8F6800' } })
                    }
                  }}
                  content="Icon Styles Function: Golden Brown Icon"
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon={{
                    props: {
                      iconName: 'PeopleAdd',
                      styles: props => ({ root: { color: props.theme!.semanticColors.buttonText } }),
                      theme: testTheme
                    }
                  }}
                  content="Icon Styles Function: Red Icon via Icon Theme"
                />
              </ButtonStack>
              <ButtonStack>
                <Button content="Button Classname" className="button-classname" />
                <Button
                  content="Icon Classname"
                  icon={{
                    props: {
                      iconName: 'PeopleAdd',
                      className: 'icon-classname'
                    }
                  }}
                />
                <Button
                  content={{
                    props: {
                      children: 'Content Classname',
                      className: 'content-classname'
                    }
                  }}
                />
                <MenuButton
                  content="All Classnames"
                  icon="PeopleAdd"
                  menu={menuProps}
                  styles={{
                    root: 'root-classname',
                    stack: 'stack-classname',
                    content: 'content-classname',
                    icon: 'icon-classname',
                    menu: 'menu-classname',
                    menuIcon: 'menuIcon-classname'
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  content="Icon ClassName Overrides Button Styles: Blue Icon"
                  styles={{
                    icon: {
                      color: '#E20000'
                    }
                  }}
                  icon={{
                    props: {
                      iconName: 'PeopleAdd',
                      className: testClassName
                    }
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  icon="PeopleAdd"
                  content={{
                    props: {
                      children: 'Text ClassName: Blue Text',
                      className: testClassName
                    }
                  }}
                />
                <Button
                  icon="PeopleAdd"
                  content={{
                    props: {
                      children: 'Text Styles Overrides ClassName: Red Text',
                      styles: { root: { color: '#E20000' } },
                      className: testClassName
                    }
                  }}
                />
              </ButtonStack>
              <ButtonStack>
                <Button
                  content="Icon ClassName: Blue Icon"
                  icon={{
                    props: {
                      iconName: 'PeopleAdd',
                      className: testClassName
                    }
                  }}
                />
                <Button
                  content="Icon Styles Overrides ClassName: Red Icon"
                  icon={{
                    props: {
                      iconName: 'PeopleAdd',
                      styles: { root: { color: '#E20000' } },
                      className: testClassName
                    }
                  }}
                />
              </ButtonStack>
            </Stack>
          </div>
        </Stack>
      </Stack>
    );
  }
}
