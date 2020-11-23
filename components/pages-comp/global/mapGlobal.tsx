import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import styled from 'styled-components';
import * as globalCase from '@data/globalCase.json';
import * as world_countries from '@data/world_countries.json';

const MapGlobalContainer = styled.div`
  width: 1300px;
  height: 1000px;
  cursor: pointer;
`;

interface MapGlobalProps {
  pScale: number;
  data?: [];
  onHover?: () => {};
  onClick?: () => {};
  pTranslationX: number;
  pTranslationY: number;
}

export const MapGlobal: React.FC<MapGlobalProps> = ({
  pScale,
  data = globalCase,
  onHover = () => {},
  onClick = () => {},
  pTranslationX,
  pTranslationY,
}) => {
  return (
    <MapGlobalContainer>
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
        graticuleLineColor="#dddddd"
        borderWidth={0.2}
        borderColor="#152538"
        onClick={onClick}
      />
    </MapGlobalContainer>
  );
};

export default MapGlobal;
