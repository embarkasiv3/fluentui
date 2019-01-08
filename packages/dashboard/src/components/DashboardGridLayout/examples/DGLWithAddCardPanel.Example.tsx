import * as React from 'react';
import {
  IDGLCard,
  Card,
  Priority,
  CardContentType,
  CardSize,
  DashboardGridLayoutWithAddCardPanel,
  DashboardGridBreakpointLayouts,
  IAddCardPanelProps,
  DraggingAnimationType
} from '@uifabric/dashboard';

const cardFrameContent = {
  cardTitle: 'Small Card',
  cardDropDownOptions: [
    {
      key: 'Remove',
      name: 'Remove',
      icon: 'PageRemove',
      ariaLabel: 'Remove card',
      title: 'Remove card',
      onClick: () => {
        alert('Remove clicked');
      }
    }
  ]
};

const contentAreaList = [
  {
    priority: Priority.Priority1,
    cardContentType: CardContentType.BodyText,
    content: {
      subHeaderText: 'Subheader Text',
      bodyText: 'Body Text'
    }
  }
];

const header = {
  headerText: 'Header Text ',
  annotationText: 'Annotation Text '
};

const exampleCard = (
  <Card cardFrameContent={cardFrameContent} header={header} cardContentList={contentAreaList} cardSize={CardSize.small} />
);
const cardsVisibleInLayout: IDGLCard[] = [
  {
    id: 'first',
    addCardInfo: {
      addCardPanelBodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit magna aliqua',
      addCardPanelHeader: 'Ut enim ad minim veniam',
      addCardPanelImageUrl: '../../../../public/images/CompoundButtonStack.svg',
      draggingAnimation: DraggingAnimationType.Shimmer,
      addCardIconAriaLabel: 'Click to add first card to dashboard',
      addCardImageAltText: 'Alt text for the first card representation in the add card panel'
    },
    renderElement: exampleCard,
    cardSize: CardSize.mediumTall
  },
  {
    id: 'fifth',
    addCardInfo: {
      addCardPanelBodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit magna aliqua',
      addCardPanelHeader: 'quis nostrud',
      addCardPanelImageUrl: '../../../../public/images/DetailsList.svg',
      draggingAnimation: DraggingAnimationType.BarGraph
    },
    renderElement: exampleCard,
    cardSize: CardSize.mediumWide
  }
];

const cardsVisibleInAddCardPanel: IDGLCard[] = [
  {
    id: 'second',
    addCardInfo: {
      addCardPanelBodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit magna aliqua',
      addCardPanelHeader: 'Ut enim ad minim veniam',
      addCardPanelImageUrl: '../../../../public/images/CompoundButtonStack.svg',
      draggingAnimation: DraggingAnimationType.Shimmer,
      addCardIconAriaLabel: 'Click to add first card to dashboard',
      addCardImageAltText: 'Alt text for the first card representation in the add card panel'
    },
    renderElement: exampleCard,
    cardSize: CardSize.mediumTall
  },
  {
    id: 'third',
    addCardInfo: {
      addCardPanelBodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit magna aliqua',
      addCardPanelHeader: 'quis nostrud',
      addCardPanelImageUrl: '../../../../public/images/DetailsList.svg',
      draggingAnimation: DraggingAnimationType.BarGraph
    },
    renderElement: exampleCard,
    cardSize: CardSize.mediumWide
  },
  {
    id: 'fourth',
    addCardInfo: {
      addCardPanelBodyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit magna aliqua',
      addCardPanelHeader: 'exercitation ullamco',
      addCardPanelImageUrl: '../../../../public/images/Donut.svg',
      draggingAnimation: DraggingAnimationType.DonutChart
    },
    renderElement: exampleCard,
    cardSize: CardSize.large
  }
];

const addCardPanelProps: IAddCardPanelProps = {
  panelHeader: 'Click to add cards to your dashboard',
  panelCloseButtonAriaLabel: 'Close the add card panel'
};

export interface IDGLWithAddCardPanelState {
  isOpen: boolean;
}

export class DGLWithAddCardPanelExample extends React.Component<{}, IDGLWithAddCardPanelState> {
  private refObject: HTMLElement | null;
  constructor(props: {}) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  public render(): JSX.Element {
    return (
      <>
        <button
          onClick={this._openAddCardPanel}
          ref={(e: HTMLElement | null) => {
            this.refObject = e;
          }}
        >
          Add Card
        </button>
        <DashboardGridLayoutWithAddCardPanel
          layout={{
            lg: [{ i: 'first', x: 0, y: 1, size: CardSize.small }, { i: 'fifth', x: 1, y: 1, size: CardSize.small }]
          }}
          addCardPanelCards={cardsVisibleInAddCardPanel}
          dashboardCards={cardsVisibleInLayout}
          isOpen={this.state.isOpen}
          sectionTitle={'First section'}
          addCardPanelProps={addCardPanelProps}
          onLayoutChange={this._onLayoutChange}
          onPanelDismiss={this._onPanelDismiss}
          scrollElement={this.refObject ? this.refObject.parentElement! : undefined}
        />
      </>
    );
  }

  private _onPanelDismiss = () => {
    this.setState({ isOpen: false });
  };

  private _openAddCardPanel = () => {
    this.setState({ isOpen: true });
  };

  private _onLayoutChange(newLayout: DashboardGridBreakpointLayouts): void {
    console.log('The new layout is: ', newLayout);
  }
}
