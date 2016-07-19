import * as React from 'react';
import {
  Link
} from '../../../index';
import {
  ExampleCard,
  PropertiesTableSet
} from '../../components/index';

import FocusTrapZoneBoxExample from './examples/FocusTrapZone.Box.Example';
let FocusTrapZoneBoxExampleCode = require('./examples/FocusTrapZone.Box.Example');

import FocusTrapZoneBoxExampleWithFocusableItem from './examples/FocusTrapZone.Box.FocusOnCustomElement.Example';
let FocusTrapZoneBoxExampleWithFocusableItemCode =
    require('./examples/FocusTrapZone.Box.FocusOnCustomElement.Example');

import FocusTrapZoneBoxClickExample from './examples/FocusTrapZone.Box.Click.Example';
let FocusTrapZoneBoxClickExampleCode = require('./examples/FocusTrapZone.Box.Click.Example');

export class FocusTrapZonePage extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-DialogPage'>
        <h1 className='ms-font-xxl'>Focus Trap Zone</h1>
        <div>
          <Link target='_blank' href='http://dev.office.com/fabric/utilities/FocusTrapZone'>FocusTrapZone</Link>
          <span> is used to trap the focus in any html element. Pressing tab will circle focus within the inner focusable elements of the FocusTrapZone.</span>
        </div>
        <h2 className='ms-font-xl'>Examples</h2>

        <ExampleCard title='Simple Box' code={ FocusTrapZoneBoxExampleCode }>
          <FocusTrapZoneBoxExample />
        </ExampleCard>

        <ExampleCard title='Simple Box with focus on custom focusable element' code={ FocusTrapZoneBoxExampleWithFocusableItemCode }>
            <FocusTrapZoneBoxExampleWithFocusableItem />
        </ExampleCard>

        <ExampleCard title='Simple Box with Clicking outside Trap Zone enabled' code={ FocusTrapZoneBoxClickExampleCode }>
          <FocusTrapZoneBoxClickExample/>
        </ExampleCard>

        <PropertiesTableSet componentName='FocusTrapZone' />
      </div>
    );
  }
}
