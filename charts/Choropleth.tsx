import { ReactElement, useState } from "react";
import React from "react";
import { ResponsiveChoropleth } from "@nivo/geo";
import styled from "styled-components";

import * as WORLD_COUNTRIES from "../data/WORLD_COUNTRIES.json";

const Container = styled.div`
  width: 100%;
  height: 1200px;
  cursor: pointer;
`;

type ChoroplethProps = {
  data: { id: string; value: number }[];
  rotation: number;
  onClick?: (props: any) => void;
};

export default function Choropleth({ data, rotation, onClick }: ChoroplethProps): ReactElement {
  return (
    <Container>
      <ResponsiveChoropleth
        data={data}
        features={WORLD_COUNTRIES.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="greys"
        domain={[0, 9000000]}
        unknownColor="#ffffff"
        label="properties.name"
        valueFormat=","
        projectionType="azimuthalEqualArea"
        projectionScale={300}
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[rotation, 0, 0]}
        enableGraticule={true}
        graticuleLineColor="#398e84"
        borderColor="#152538"
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            justify: true,
            translateX: 20,
            translateY: -34,
            itemsSpacing: 0,
            itemWidth: 200,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemTextColor: "#fff",
            itemOpacity: 0.85,
            symbolSize: 10,
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#fff",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        theme={{
          axis: {
            ticks: { line: { stroke: "#fff" }, text: { fill: "#fff" } },
            legend: { text: { fill: "#fff" } },
          },
          grid: { line: { stroke: "#888", strokeWidth: 1 } },
        }}
        onClick={onClick}
      />
    </Container>
  );
}
