import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import PropTypes from 'prop-types';

const globalCase = require('../data/globalCase.json');
const world_countries = require('../data/world_countries.json');

const GlobalMap = ({ projectionScale = 125, data = globalCase, onHover = () => {}, onClick = () => {} }) => {
  return (
    <div
      style={{
        height: 1300,
        width: 1300,
        cursor: 'pointer',
      }}
    >
      <ResponsiveChoropleth
        data={data}
        features={world_countries.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="PuBu"
        domain={[0, 200000]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=","
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        projectionScale={projectionScale}
        enableGraticule={false}
        fill
        graticuleLineColor="#dddddd"
        borderWidth={0.2}
        borderColor="#152538"
        //tooltip={onHover}
        onClick={onClick}
        /*legends={[
          {
            anchor: 'top-left',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: 15,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#444444',
            itemOpacity: 0.85,
            symbolSize: 10,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000000',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}*/
      />
    </div>
  );
};

GlobalMap.propTypes = {};

export default GlobalMap;
