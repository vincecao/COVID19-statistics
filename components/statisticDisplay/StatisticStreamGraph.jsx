import React from 'react';
import { ResponsiveStream } from '@nivo/stream';
import styled from 'styled-components';

const StreamGraphContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const defs = [
  {
    id: 'dots',
    type: 'patternDots',
    background: 'inherit',
    color: '#2c998f',
    size: 4,
    padding: 2,
    stagger: true,
  },
  {
    id: 'squares',
    type: 'patternSquares',
    background: 'inherit',
    color: '#e4c912',
    size: 6,
    padding: 2,
    stagger: true,
  },
];

const fill = [
  // {
  //   match: {
  //     id: 'Paul',
  //   },
  //   id: 'dots',
  // },
  // {
  //   match: {
  //     id: 'Marcel',
  //   },
  //   id: 'squares',
  // },
];

const legends = [
  {
    anchor: 'bottom-right',
    direction: 'column',
    translateX: 100,
    itemWidth: 80,
    itemHeight: 20,
    itemTextColor: '#999999',
    symbolSize: 12,
    symbolShape: 'circle',
    effects: [
      {
        on: 'hover',
        style: {
          itemTextColor: '#000000',
        },
      },
    ],
  },
];

export const StatisticStreamGraph = ({ streamData, colorScheme }) => {
  const { data = [], key = [], horiTag = '' } = streamData;
  return (
    <StreamGraphContainer>
      <ResponsiveStream
        data={data}
        keys={key}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 33,
          legend: horiTag,
          legendOffset: 36,
        }}
        axisLeft={{ orient: 'left', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: -40 }}
        offsetType="silhouette"
        order="ascending"
        colors={{ scheme: colorScheme }}
        fillOpacity={0.85}
        borderColor={{ theme: 'background' }}
        defs={defs}
        fill={fill}
        dotSize={8}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color', modifiers: [['darker', 0.7]] }}
        animate={false}
        motionStiffness={90}
        motionDamping={15}
        legends={legends}
      />
    </StreamGraphContainer>
  );
};
