import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import styled from 'styled-components';
import * as usCase from '@data/usCase.json';
import * as us_states from '@data/us_states.json';

const MapUsContainer = styled.div`
  width: 1300px;
  height: 900px;
  cursor: pointer;
`;

interface MapUsProps {
  pScale: number;
  data?: [];
  onHover?: () => {};
  onClick?: () => {};
  pTranslationX: number;
  pTranslationY: number;
}

const MapUs: React.FC<MapUsProps> = ({
  pScale,
  data = usCase,
  onHover = () => {},
  onClick = () => {},
  pTranslationX,
  pTranslationY,
}) => {
  return (
    <MapUsContainer>
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
      />
    </MapUsContainer>
  );
};

export default MapUs;
