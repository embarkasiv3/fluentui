import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet,
} from '../../components/index';

import { ContextualMenuBasicExample } from './examples/ContextualMenu.Basic.Example';
import { ContextualMenuCheckmarksExample } from './examples/ContextualMenu.Checkmarks.Example';
import { ContextualMenuDirectionalExample } from './examples/ContextualMenu.Directional.Example';
import { ContextualMenuCustomizationExample } from './examples/ContextualMenu.Customization.Example';

const ContextualMenuBasicExampleCode = require('./examples/ContextualMenu.Basic.Example.tsx');
const ContextualMenuCheckmarksExampleCode = require('./examples/ContextualMenu.Checkmarks.Example.tsx');
const ContextualMenuDirectionalExampleCode = require('./examples/ContextualMenu.Directional.Example.tsx');
const ContextualMenuCustomizationExampleCode = require('./examples/ContextualMenu.Customization.Example.tsx');

export class ContextualMenuPage extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-ContextualMenuPage'>
        <h1 className='ms-font-xxl'>ContextualMenu</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/components/contextualMenu'>ContextualMenus</Link>
          <span> provide a menu for use in context menus and dropdowns.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='ContextualMenu' code= { ContextualMenuBasicExampleCode }>
          <ContextualMenuBasicExample />
        </ExampleCard>

        <ExampleCard title='ContextualMenu checked menus example' code={ ContextualMenuCheckmarksExampleCode }>
          <ContextualMenuCheckmarksExample />
        </ExampleCard>

        <ExampleCard title='ContextualMenu beak/direction test' code={ ContextualMenuDirectionalExampleCode }>
          <ContextualMenuDirectionalExample />
        </ExampleCard>

        <ExampleCard title='ContextualMenu customization example' code={ ContextualMenuCustomizationExampleCode }>
          <ContextualMenuCustomizationExample />
        </ExampleCard>

        <PropertiesTableSet componentName='ContextualMenu' />
        <PropertiesTableSet componentName='Callout' renderOnly={ ['DirectionalHint'] } />
      </div>
    );
  }
}
