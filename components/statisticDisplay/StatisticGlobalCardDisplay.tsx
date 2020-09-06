import React from 'react';
import { CardItem } from '../bulmaComponents/StickyDisplayCard/CardItem';
import { StickyDisplayCard } from '../bulmaComponents/StickyDisplayCard/StickyDisplayCard';

const d3 = require('d3-format');

interface StatisticGlobalCardDisplayProps {
  selectCountry: {
    country: {};
    cases: {};
    death: {};
    tests: {};
    population: string;
    time: any;
    timediff: string;
  };
  syncing: boolean;
  onRefresh: any;
}

const setCardItemVariant = (index: number) => ({
  hidden: {
    y: '-50vh',
  },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 10,
      delay: 0.2 * index,
    },
  },
});

export const StatisticGlobalCardDisplay: React.FC<StatisticGlobalCardDisplayProps> = ({
  selectCountry,
  onRefresh,
  syncing,
}) => {
  return (
    <StickyDisplayCard
      areaHeading={selectCountry.country['name']}
      areaImgSrc={`https://www.countryflags.io/${selectCountry.country['code-2']}/shiny/64.png`}
      updateTimeInfo={selectCountry.timediff}
      key={selectCountry.country['name']}
      variants={setCardItemVariant(0)}
    >
      <CardItem
        tagIntent="light"
        tagHeading="Population"
        tagContent={d3.format(',.2s')(selectCountry.population)}
        variants={setCardItemVariant(1)}
      />

      <CardItem
        tagIntent="info"
        tagHeading="Tests"
        tagContent={d3.format(',')(selectCountry.tests['total'])}
        variants={setCardItemVariant(2)}
      />

      <CardItem
        tagIntent="warning"
        tagHeading="Cases"
        tagContent={`${d3.format(',')(selectCountry.cases['total'])}
        ${selectCountry.cases['new'] ? `(+${d3.format(',')(selectCountry.cases['new'])})` : ''}`}
        variants={setCardItemVariant(3)}
      />

      <CardItem
        tagIntent="danger"
        tagHeading="Death"
        tagContent={`${d3.format(',')(selectCountry.death['total'])}
        ${selectCountry.death['new'] ? `(+${d3.format(',')(selectCountry.death['new'])})` : ''}`}
        variants={setCardItemVariant(4)}
      />
    </StickyDisplayCard>
  );
};
