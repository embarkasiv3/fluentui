import { makeStyles, useAx } from '@fluentui/react-make-styles';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';

const useStyles = makeStyles({
  box: theme => ({
    border: `5px solid ${theme.alias.color.neutral.neutralStroke1}`,
    borderLeft: `20px solid ${theme.alias.color.blue.border2}`,

    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    color: theme.alias.color.neutral.neutralForeground1,

    margin: '5px',
    padding: '5px',
    paddingLeft: '50px',
  }),

  container: theme => ({
    border: `5px solid ${theme.alias.color.neutral.neutralStroke1}`,
    borderLeft: `20px solid ${theme.alias.color.blue.border2}`,

    margin: '5px',
    padding: '5px',
  }),
  containerPrimary: theme => ({
    borderLeftColor: theme.alias.color.darkOrange.border2,
  }),

  provider: {
    marginLeft: '20px',
  },
});

const Box: React.FC = props => {
  const classes = useStyles();

  return <div className={classes.box}>{props.children}</div>;
};

const Container: React.FC<{ className?: string; primary?: boolean }> = props => {
  const classes = useStyles();

  return (
    <div
      className={useAx(
        classes.container,
        props.primary && classes.containerPrimary,
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

const ClassNameProvider: React.FC<{
  children: (className: string) => React.ReactElement;
}> = props => {
  const classes = useStyles();

  return props.children(classes.provider);
};

export const Nested = () => (
  <>
    <p>This scenario shows that it's possible to have nested components (LTR inside RTL).</p>

    <FluentProvider dir="rtl" theme={webLightTheme}>
      <Container primary>مرحبا بالعالم!</Container>

      <FluentProvider dir="ltr">
        <Container primary>Hello world!</Container>
      </FluentProvider>
    </FluentProvider>
  </>
);

export const Propagation = () => (
  <>
    <p>
      This scenario shows classes propagation between boundaries with "ax()" function: classes
      generated in LTR context will be applied properly in RTL.
    </p>

    <FluentProvider theme={webLightTheme}>
      <ClassNameProvider>
        {className => (
          <FluentProvider dir="rtl">
            <Container className={className} primary>
              مرحبا بالعالم!
            </Container>
          </FluentProvider>
        )}
      </ClassNameProvider>

      <FluentProvider dir="rtl">
        <ClassNameProvider>
          {className => (
            <FluentProvider dir="ltr">
              <Container className={className} primary>
                Hello world!
              </Container>
            </FluentProvider>
          )}
        </ClassNameProvider>
      </FluentProvider>
    </FluentProvider>
  </>
);

storiesOf('MakeStyles', module)
  .addDecorator(story => (
    <Screener steps={new Screener.Steps().snapshot('normal', { cropTo: '.testWrapper' }).end()}>
      <div className="testWrapper" style={{ width: '300px' }}>
        {story()}
      </div>
    </Screener>
  ))

  // RTL stories
  // Check for details: packages/react-examples/src/react-make-styles/RTL/RTL.stories.tsx

  .addStory('RTL: two components in a single Provider', () => (
    <FluentProvider dir="rtl" theme={webLightTheme}>
      <Box>مرحبا بالعالم!</Box>
      <Container>مرحبا بالعالم!</Container>
    </FluentProvider>
  ))
  .addStory('RTL: two providers with different directions as siblings', () => (
    <>
      <FluentProvider theme={webLightTheme}>
        <Box>Hello world!</Box>
        <Container primary>Hello world!</Container>
      </FluentProvider>

      <FluentProvider dir="rtl" theme={webLightTheme}>
        <Box>مرحبا بالعالم!</Box>
        <Container primary>مرحبا بالعالم!</Container>
      </FluentProvider>
    </>
  ))
  .addStory('RTL: two providers with different directions as children', () => (
    <FluentProvider dir="rtl" theme={webLightTheme}>
      <Container primary>مرحبا بالعالم!</Container>

      <FluentProvider dir="ltr">
        <Container primary>Hello world!</Container>
      </FluentProvider>
    </FluentProvider>
  ))
  .addStory('RTL: propagation of styles via providers with different directions', () => (
    <FluentProvider theme={webLightTheme}>
      <ClassNameProvider>
        {className => (
          <FluentProvider dir="rtl">
            <Container className={className} primary>
              مرحبا بالعالم!
            </Container>
          </FluentProvider>
        )}
      </ClassNameProvider>

      <FluentProvider dir="rtl">
        <ClassNameProvider>
          {className => (
            <FluentProvider dir="ltr">
              <Container className={className} primary>
                Hello world!
              </Container>
            </FluentProvider>
          )}
        </ClassNameProvider>
      </FluentProvider>
    </FluentProvider>
  ));
