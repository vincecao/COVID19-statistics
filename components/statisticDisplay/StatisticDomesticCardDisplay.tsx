import React from 'react';
import * as d3 from 'd3-format';
import { CardItem } from '../bulmaComponents/StickyDisplayCard/CardItem';
import { StickyDisplayCard } from '../bulmaComponents/StickyDisplayCard/StickyDisplayCard';
import { cardItemVariants } from '@variants/data';

interface StatisticDomesticCardDisplayProps {
  selectState: {
    state: { name: string; code: string };
    cases: {};
    death: {};
    active: {};
    recovered: {};
    fatalityRate: number;
    cities: any;
    time: any;
    timediff: string;
  };
}

const StatisticDomesticCardDisplay: React.FC<StatisticDomesticCardDisplayProps> = ({ selectState }) => {
  return (
    <StickyDisplayCard
      areaHeading={selectState.state['name']}
      // areaImgSrc={selectState.state.code ? `//flags.ox3.in/svg/us/${selectState.state.code.toLowerCase()}.svg` : ''}
      areaImgSrc={
        selectState.state.code
          ? `//www.states101.com/img/flags/svg/${selectState.state['name'].replace(' ', '-').toLowerCase()}.svg`
          : ''
      }
      updateTimeInfo={selectState.timediff}
      key={selectState.state['name']}
      variants={cardItemVariants(0)}
    >
      <CardItem
        tagIntent="light"
        tagHeading="Fatality Rate"
        tagContent={d3.format(',.2s')(selectState.fatalityRate)}
        variants={cardItemVariants(1)}
      />

      <CardItem
        tagIntent="warning"
        tagHeading="Cases"
        tagContent={`${d3.format(',')(selectState.cases['total'])}
              ${selectState.cases['new'] ? `(+${d3.format(',')(selectState.cases['new'])})` : ''}`}
        variants={cardItemVariants(2)}
      />

      <CardItem
        tagIntent="info"
        tagHeading="Active"
        tagContent={`${d3.format(',')(selectState.active['total'])}
              ${selectState.active['new'] ? `(+${d3.format(',')(selectState.active['new'])})` : ''}`}
        variants={cardItemVariants(3)}
      />

      <CardItem
        tagIntent="danger"
        tagHeading="Death"
        tagContent={`${d3.format(',')(selectState.death['total'])}
              ${selectState.death['new'] ? `(+${d3.format(',')(selectState.death['new'])})` : ''}`}
        variants={cardItemVariants(4)}
      />
    </StickyDisplayCard>
  );
};

export default StatisticDomesticCardDisplay;
