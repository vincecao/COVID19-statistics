import React from 'react';
import { Container } from '../bulmaComponents/Container';
import { Level } from '../bulmaComponents/Level/Level';
import { LevelItem } from '../bulmaComponents/Level/LevelItem';

const d3 = require('d3-format');

interface StatisticDomasticLevelDisplayProps {
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

export const StatisticDomasticLevelDisplay: React.FC<StatisticDomasticLevelDisplayProps> = ({ selectState }) => {
  return (
    <Level bottomText="Source: Johns Hopkins CSSE">
      <LevelItem
        itemHeading="Select State"
        itemTitle={selectState.state['name']}
        itemSubtitle={selectState.timediff}
        isItemSubtitleItalic
      />
      <LevelItem itemHeading="Fatality Rate" itemTitle={d3.format(',')(selectState.fatalityRate)} />
      <LevelItem
        itemHeading="Cases"
        itemTitle={d3.format(',')(selectState.cases['total'])}
        itemSubtitle={`(+${d3.format(',')(selectState.cases['new'])})`}
      />
      <LevelItem
        itemHeading="Active"
        itemTitle={d3.format(',')(selectState.active['total'])}
        itemSubtitle={`(+${d3.format(',')(selectState.active['new'])})`}
      />
      <LevelItem
        itemHeading="Death"
        itemTitle={d3.format(',')(selectState.death['total'])}
        itemSubtitle={`(+${d3.format(',')(selectState.death['new'])})`}
      />

      {/* <LevelItem
          itemHeading="Recovered"
          itemTitle={d3.format(',.2s')(selectState.recovered['total'])}
          itemSubtitle={`(+${d3.format(',')(selectState.recovered['new'])})`}
        /> */}
    </Level>
  );
};
