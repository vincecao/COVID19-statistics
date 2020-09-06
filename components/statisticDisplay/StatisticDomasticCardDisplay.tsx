import React from 'react';
import { CardItem } from '../bulmaComponents/StickyDisplayCard/CardItem';
import { StickyDisplayCard } from '../bulmaComponents/StickyDisplayCard/StickyDisplayCard';
import { motion } from 'framer-motion';

const d3 = require('d3-format');

interface StatisticDomasticCardDisplayProps {
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

export const StatisticDomasticCardDisplay: React.FC<StatisticDomasticCardDisplayProps> = ({ selectState }) => {
  return (
    <StickyDisplayCard
      areaHeading={selectState.state['name']}
      areaImgSrc={`http://flags.ox3.in/svg/us/${selectState.state.code.toLowerCase()}.svg`}
      areaImgStyle={{ marginTop: 15 }}
      updateTimeInfo={selectState.timediff}
      key={selectState.state['name']}
      variants={setCardItemVariant(0)}
    >
      <CardItem
        tagIntent="light"
        tagHeading="Fatality Rate"
        tagContent={d3.format(',.2s')(selectState.fatalityRate)}
        variants={setCardItemVariant(1)}
      />

      <CardItem
        tagIntent="warning"
        tagHeading="Cases"
        tagContent={`${d3.format(',')(selectState.cases['total'])}
              ${selectState.cases['new'] ? `(+${d3.format(',')(selectState.cases['new'])})` : ''}`}
        variants={setCardItemVariant(2)}
      />

      <CardItem
        tagIntent="info"
        tagHeading="Active"
        tagContent={`${d3.format(',')(selectState.active['total'])}
              ${selectState.active['new'] ? `(+${d3.format(',')(selectState.active['new'])})` : ''}`}
        variants={setCardItemVariant(3)}
      />

      <CardItem
        tagIntent="danger"
        tagHeading="Death"
        tagContent={`${d3.format(',')(selectState.death['total'])}
              ${selectState.death['new'] ? `(+${d3.format(',')(selectState.death['new'])})` : ''}`}
        variants={setCardItemVariant(4)}
      />

      {/* <CardItem
          tagIntent="info"
          tagHeading="Recovered"
          tagContent={`${d3.format(',')(selectState.recovered['total'])}
        ${selectState.recovered['new'] ? `(+${d3.format(',')(selectState.recovered['new'])})` : ''}`}
        variant={setCardItemVariant(5)}
        /> */}
    </StickyDisplayCard>
  );
};
