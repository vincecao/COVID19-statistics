import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import styled from 'styled-components';

const GraphCard = styled.div`
  width: 100%;
  height: 600px;
`;

export const StatisticBumpGraphCard = ({ bumpData }) => {
  const { data = [], verticalTag = '', horiTag = '' } = bumpData;

  return (
    <GraphCard>
      <ResponsiveBump
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        colors={{ scheme: 'spectral' }}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -36,
        }}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: horiTag,
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: verticalTag,
          legendPosition: 'middle',
          legendOffset: -40,
        }}
      />
    </GraphCard>
  );
};
