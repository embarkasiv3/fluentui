import {
  Flex,
  Provider,
  ShorthandValue,
  Toolbar,
  ToolbarItemProps,
  ToolbarItemShorthandKinds,
  ToolbarMenuItemProps,
  ToolbarMenuItemShorthandKinds,
  themes,
} from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

type ToolbarItem = ShorthandValue<ToolbarItemProps & { kind?: ToolbarItemShorthandKinds }>;
type OverflowItem = ShorthandValue<ToolbarMenuItemProps & { kind?: ToolbarMenuItemShorthandKinds }>;

const FrameRenderer: React.FC<React.IframeHTMLAttributes<HTMLIFrameElement> & {
  children: (externalDocument: Document) => React.ReactElement;
}> = props => {
  const { children, ...rest } = props;
  const [node, setNode] = React.useState<HTMLIFrameElement>();

  React.useLayoutEffect(() => {
    if (node) {
      node.contentDocument.documentElement.style.fontSize = '14px';

      node.contentDocument.documentElement.style.height = '100%';
      node.contentDocument.documentElement.style.width = '100%';
      node.contentDocument.body.style.height = '100%';
      node.contentDocument.body.style.width = '100%';
    }
  }, [node]);

  return (
    <iframe {...rest} ref={setNode}>
      {node && ReactDOM.createPortal(children(node.contentDocument), node.contentDocument.body)}
    </iframe>
  );
};

const EditorToolbar: React.FC = () => {
  const [overflowOpen, setOverflowOpen] = React.useState<boolean>(false);
  const overflowIndex = React.useRef<number>();

  const combinedItems: {
    toolbarItem: ToolbarItem;
    overflowItem?: OverflowItem;
  }[] = [
    { toolbarItem: { key: 'bold', icon: 'bold' } },
    { toolbarItem: { key: 'italic', icon: 'italic' } },
    { toolbarItem: { key: 'underline', icon: 'underline' } },

    { toolbarItem: { key: 'divider-1', kind: 'divider' } },

    { toolbarItem: { key: 'highlight', icon: 'highlight' } },
    { toolbarItem: { key: 'font-color', icon: 'font-color' } },
    { toolbarItem: { key: 'font-size', icon: 'font-size' } },

    {
      toolbarItem: { key: 'remove-format', icon: 'remove-format' },
      overflowItem: { key: 'remove-format', icon: 'remove-format', content: 'Clear formatting' },
    },
    { toolbarItem: { key: 'divider-2', kind: 'divider' } },

    {
      toolbarItem: { key: 'bullets', icon: 'bullets' },
      overflowItem: { key: 'bullets', icon: 'bullets', content: 'Bulleted list' },
    },
    {
      toolbarItem: { key: 'number-list', icon: 'number-list' },
      overflowItem: { key: 'number-list', icon: 'number-list', content: 'Number list' },
    },

    { toolbarItem: { key: 'divider-3', kind: 'divider' } },

    {
      toolbarItem: { key: 'link', icon: 'link' },
      overflowItem: { key: 'link', icon: 'link', content: 'Insert link' },
    },
    {
      toolbarItem: { key: 'code', icon: 'code-snippet' },
      overflowItem: { key: 'code', icon: 'code-snippet', content: 'Code snippet' },
    },
  ];

  return (
    <Flex>
      <Toolbar
        styles={{ minWidth: 0, flexGrow: 1 }} // necessary for Toolbar with overflow inside a flex container
        items={_.map(combinedItems, 'toolbarItem')}
        overflow
        overflowItem={{ id: 'overflow-item' }}
        overflowOpen={overflowOpen}
        onOverflow={itemsVisible => {
          overflowIndex.current = itemsVisible - 1;
        }}
        onOverflowOpenChange={(e, { overflowOpen }) => setOverflowOpen(overflowOpen)}
        getOverflowItems={startIndex => {
          const firstToolbarItem = combinedItems[startIndex].toolbarItem;
          let actualIndex = startIndex;

          // We want to remove first item if it's a divider
          // @ts-ignore
          if (firstToolbarItem.kind === 'divider') {
            actualIndex += 1;
          }

          return combinedItems.slice(actualIndex).map(item => item.overflowItem || item.toolbarItem);
        }}
      />
      <Toolbar items={[{ key: 'trash', icon: { name: 'trash-can', outline: true } }]} />
    </Flex>
  );
};

const ToolbarExampleOverflowPositioningShorthand: React.FC = () => (
  <FrameRenderer
    frameBorder="0"
    width="400px"
    height="400px"
    scrolling="no"
    style={{ border: '2px  dotted green', boxSizing: 'content-box' }}
  >
    {externalDocument => (
      <Provider
        dir="rtl" /* we need to force this as global Provider is already in RTL */
        styles={{ overflow: 'hidden', height: 'inherit', width: 'inherit' }}
        target={externalDocument}
        theme={themes.teams}
      >
        <EditorToolbar />
      </Provider>
    )}
  </FrameRenderer>
);

export default ToolbarExampleOverflowPositioningShorthand;
