import React from 'react';
import * as d3 from 'd3-format';
import { Level } from '../bulmaComponents/Level/Level';
import { LevelItem } from '../bulmaComponents/Level/LevelItem';

interface StatisticDomesticLevelDisplayProps {
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

const StatisticDomesticLevelDisplay: React.FC<StatisticDomesticLevelDisplayProps> = ({ selectState }) => {
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

export default StatisticDomesticLevelDisplay;
