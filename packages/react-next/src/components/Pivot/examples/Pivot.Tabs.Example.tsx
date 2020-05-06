import * as React from 'react';
import { Label } from '@fluentui/react-next/lib/Label';
import { Pivot, PivotItem, PivotLinkFormat } from '@fluentui/react-next/lib/Pivot';

export const PivotTabsExample = () => (
  <div>
    <Pivot aria-label="Links of Tab Style Pivot Example" linkFormat={PivotLinkFormat.tabs}>
      <PivotItem headerText="Foo">
        <Label>Pivot #1</Label>
      </PivotItem>
      <PivotItem headerText="Bar">
        <Label>Pivot #2</Label>
      </PivotItem>
      <PivotItem headerText="Bas">
        <Label>Pivot #3</Label>
      </PivotItem>
      <PivotItem headerText="Biz">
        <Label>Pivot #4</Label>
      </PivotItem>
    </Pivot>
  </div>
);
