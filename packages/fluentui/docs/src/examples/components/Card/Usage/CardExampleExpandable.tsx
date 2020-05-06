import {
  Avatar,
  Box,
  BoxProps,
  BoxStylesProps,
  Card,
  cardFocusableBehavior,
  ComponentVariablesInput,
  compose,
  Flex,
  Image,
  Provider,
  Text,
  ThemeInput,
} from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';
import * as React from 'react';

// Compose custom styled Box
type ExpandableBoxProps = {
  expand?: boolean;
};

type ExpandableBoxStylesProps = ExpandableBoxProps;

const ExpandableBox = compose<'div', ExpandableBoxProps, ExpandableBoxStylesProps, BoxProps, {}>(Box, {
  className: 'ui-expandable-box',
  displayName: 'ExpandableBox',
  mapPropsToStylesProps: props => ({ expand: props.expand }),
  handledProps: ['expand'],
});

//
// Theme
//

type ComponentStylesProps = {
  ExpandableBox: BoxStylesProps & ExpandableBoxStylesProps;
};

type ComponentVariables = {
  ExpandableBox: {
    restMaxHeight: string;
    expandMaxHeight: string;
  };
};

const componentStyles: {
  // @ts-ignore TODO fix type there
  [C in keyof ComponentStylesProps]: ComponentSlotStylesInput<ComponentStylesProps[C], ComponentVariables[C]>;
} = {
  ExpandableBox: {
    root: ({ props: p, variables: v }) => ({
      maxHeight: v.restMaxHeight,
      transition: 'max-height 0.5s ease-in',
      overflow: 'hidden',
      ...(p.expand && {
        maxHeight: v.expandMaxHeight,
        transition: 'max-height 1s ease-in',
      }),
    }),
  },
};

const componentVariables: ComponentVariablesInput = {
  ExpandableBox: (): ComponentVariables['ExpandableBox'] => ({
    restMaxHeight: '20px',
    expandMaxHeight: '500px',
  }),
};

const customTheme: ThemeInput<ComponentStylesProps> = {
  componentStyles,
  componentVariables,
};

const CardExampleExpandable = () => {
  const [expandCard, setExpandCard] = useBooleanKnob({
    name: 'expandCard',
    initialValue: false,
  });

  return (
    <Provider theme={customTheme}>
      <Card
        aria-roledescription="user card"
        aria-expanded={expandCard}
        accessibility={cardFocusableBehavior}
        onFocus={() => {
          setExpandCard(true);
        }}
        onMouseEnter={() => {
          setExpandCard(true);
        }}
        onMouseLeave={() => {
          setExpandCard(false);
        }}
        onBlur={() => {
          setExpandCard(false);
        }}
      >
        <Card.Header>
          <Flex gap="gap.small">
            <Avatar
              image="public/images/avatar/small/matt.jpg"
              label="Copy bandwidth"
              name="Evie yundt"
              status="unknown"
            />
            <Flex column>
              <Text content="Using compose and custom styles" weight="bold" />
              <Text content="Secondary line" size="small" />
            </Flex>
          </Flex>
        </Card.Header>
        <Card.Body>
          <Flex column gap="gap.small">
            <Image src="public/images/wireframe/square-image.png" />
            <ExpandableBox expand={expandCard}>
              <Text content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
            </ExpandableBox>
          </Flex>
        </Card.Body>
      </Card>
    </Provider>
  );
};

export default CardExampleExpandable;
