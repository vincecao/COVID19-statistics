import React from 'react';
import { Container } from '../bulmaComponents/Container';
import { LevelItem } from '../bulmaComponents/Level/LevelItem';
import { Level } from '../bulmaComponents/Level/Level';

const d3 = require('d3-format');

interface StatisticGlobalLevelDisplayProps {
  selectCountry: {
    country: {};
    cases: {};
    death: {};
    tests: {};
    population: string;
    time: any;
    timediff: string;
  };
}

export const StatisticGlobalLevelDisplay: React.FC<StatisticGlobalLevelDisplayProps> = ({ selectCountry }) => {
  return (
    <Level>
      <LevelItem
        itemHeading="Select Country"
        itemTitle={selectCountry.country['name']}
        itemSubtitle={selectCountry.timediff}
        isItemSubtitleItalic
      />
      <LevelItem itemHeading="Population" itemTitle={d3.format(',.2s')(selectCountry.population)} />
      <LevelItem itemHeading="Tests" itemTitle={d3.format(',')(selectCountry.tests['total'])} />
      <LevelItem
        itemHeading="Cases"
        itemTitle={d3.format(',')(selectCountry.cases['total'])}
        itemSubtitle={`(+${d3.format(',')(selectCountry.cases['new'])})`}
      />
      <LevelItem
        itemHeading="Death"
        itemTitle={d3.format(',')(selectCountry.death['total'])}
        itemSubtitle={`(+${d3.format(',')(selectCountry.death['new'])})`}
      />
    </Level>
  );
};
