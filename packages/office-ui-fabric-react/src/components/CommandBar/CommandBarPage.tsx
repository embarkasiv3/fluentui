import * as React from 'react';

import {
  ComponentPage,
  ExampleCard,
  IComponentDemoPageProps,
  PageMarkdown,
  PropertiesTableSet
} from '@uifabric/example-app-base';

import { ComponentStatus } from '../../demo/ComponentStatus/ComponentStatus';
import { CommandBarStatus } from './CommandBar.checklist';
import { ICommandBarProps } from './CommandBar.types';
import { CommandBarBasicExample } from './examples/CommandBar.Basic.Example';
import { CommandBarButtonAsExample } from './examples/CommandBar.ButtonAs.Example';
import { farItems, items, overflowItems } from './examples/data';

const CommandBarBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.Basic.Example.tsx') as string;

const CommandBarButtonAsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/CommandBar/examples/CommandBar.ButtonAs.Example.tsx') as string;

export class CommandBarPage extends React.Component<IComponentDemoPageProps, {}> {
  public render(): JSX.Element {
    const cmdBarParamsTextAndIcons: ICommandBarProps = { items, overflowItems, farItems };

    return (
      <ComponentPage
        title="CommandBar"
        componentName="CommandBarExample"
        componentUrl="https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/CommandBar"
        exampleCards={
          <div>
            <ExampleCard title="CommandBar with overflowing menu items" code={CommandBarBasicExampleCode}>
              <CommandBarBasicExample {...cmdBarParamsTextAndIcons} />
            </ExampleCard>
            <ExampleCard title="CommandBar custom buttons" code={CommandBarButtonAsExampleCode}>
              <CommandBarButtonAsExample {...cmdBarParamsTextAndIcons} />
            </ExampleCard>
          </div>
        }
        propertiesTables={
          <PropertiesTableSet
            sources={[
              require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/CommandBar.types.ts'),
              require<
                string
              >('!raw-loader!office-ui-fabric-react/src/components/ContextualMenu/ContextualMenu.types.ts')
            ]}
          />
        }
        overview={
          <PageMarkdown>
            {require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/docs/CommandBarOverview.md')}
          </PageMarkdown>
        }
        bestPractices={<div />}
        dos={
          <PageMarkdown>
            {require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/docs/CommandBarDos.md')}
          </PageMarkdown>
        }
        donts={
          <PageMarkdown>
            {require<string>('!raw-loader!office-ui-fabric-react/src/components/CommandBar/docs/CommandBarDonts.md')}
          </PageMarkdown>
        }
        isHeaderVisible={this.props.isHeaderVisible}
        componentStatus={<ComponentStatus {...CommandBarStatus} />}
      />
    );
  }
}
