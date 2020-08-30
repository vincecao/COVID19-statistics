import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import PropTypes from 'prop-types';

const usCase = require('../../data/usCase.json');
const us_states = require('../../data/us_states.json');

const UsMap = ({
  projectionScale = 125,
  data = usCase,
  onHover = () => {},
  onClick = () => {},
  pTranslationX,
  pTranslationY,
  pScale,
}) => {
  return (
    <div
      style={{
        height: 900,
        width: 1300,
        cursor: 'pointer',
      }}
    >
      <ResponsiveChoropleth
        data={data}
        features={us_states.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="OrRd"
        domain={[0, 500000]}
        unknownColor="#AAAEB0"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={pScale}
        projectionTranslation={[pTranslationX, pTranslationY]}
        projectionRotation={[0, 0, 0]}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
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

UsMap.propTypes = {};

export default UsMap;
