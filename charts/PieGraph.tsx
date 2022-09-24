import type { ReactElement } from "react";
import React from "react";
import { ResponsivePie } from "@nivo/pie";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 400px;
`;

export default function PieGraph({ data }): ReactElement {
  return (
    <Container>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
        innerRadius={0.75}
        activeOuterRadiusOffset={16}
        colors={{ scheme: "greys" }}
        borderColor={{
          from: "color",
          modifiers: [["brighter", 3]],
        }}
        arcLinkLabel={(e) => e.id + " (" + e.value + ")"}
        arcLinkLabelsTextOffset={21}
        arcLinkLabelsTextColor="#ffffff"
        arcLinkLabelsDiagonalLength={36}
        arcLinkLabelsColor={{ from: "color", modifiers: [] }}
        arcLabelsRadiusOffset={0.45}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 3]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        theme={{
            axis: {
                ticks: { line: { stroke: '#fff' }, text: { fill: '#fff' } },
                legend: { text: { fill: '#fff' } }
            },
            grid: {  line: { stroke: '#888', strokeWidth: 1 } }
        }}  
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#fff",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </Container>
  );
}
