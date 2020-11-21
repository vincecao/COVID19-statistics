import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const globalCase = require('../../data/globalCase.json');
const world_countries = require('../../data/world_countries.json');

const GlobalMapContainer = styled.div`
  width: 1300px;
  height: 1000px;
  cursor: pointer;
`;

const GlobalMap = ({
  pScale,
  data = globalCase,
  onHover = () => {},
  onClick = () => {},
  pTranslationX,
  pTranslationY,
}) => {
  return (
    <GlobalMapContainer>
      <ResponsiveChoropleth
        data={data}
        features={world_countries.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="PuBu"
        domain={[0, 200000]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=","
        projectionTranslation={[pTranslationX, pTranslationY]}
        projectionRotation={[0, 0, 0]}
        projectionScale={pScale}
        enableGraticule={false}
        fill
        graticuleLineColor="#dddddd"
        borderWidth={0.2}
        borderColor="#152538"
        onClick={onClick}
      />
    </GlobalMapContainer>
  );
};

GlobalMap.propTypes = {};

export default GlobalMap;
