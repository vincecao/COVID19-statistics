import type { ReactElement } from "react";
import React from "react";
import * as d3 from "d3-format";
import { ResponsiveStream } from "@nivo/stream";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 400px;
`;

type StreamGraphProps = {
  data: any[]
  keys: any[]
  bottomLegend?: string
  leftLegend?: string
}

export default function StreamGraph({ data, keys, bottomLegend, leftLegend }: StreamGraphProps): ReactElement {
  return (
    <Container>
      <ResponsiveStream
        data={data}
        keys={keys}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: (value) => `${10 - value - 1} month ago`,
          legend: bottomLegend,
          legendOffset: 40
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          format: d3.format(","),
          legend: leftLegend,
          legendOffset: -40
        }}
        enableGridX={true}
        enableGridY={false}
        curve="natural"
        offsetType="diverging"
        order="ascending"
        colors={{ scheme: "greys" }}
        borderColor="#ffffff"
        theme={{
          axis: {
              ticks: { line: { stroke: '#fff' }, text: { fill: '#fff' } },
              legend: { text: { fill: '#fff' } }
          },
          grid: {  line: { stroke: '#888', strokeWidth: 1 } }
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#2c998f",
            size: 4,
            padding: 2,
            stagger: true,
          },
          {
            id: "squares",
            type: "patternSquares",
            background: "inherit",
            color: "#e4c912",
            size: 6,
            padding: 2,
            stagger: true,
          },
        ]}
        fill={[
          {
            match: {
              id: "Paul",
            },
            id: "dots",
          },
          {
            match: {
              id: "Marcel",
            },
            id: "squares",
          },
        ]}
        dotSize={8}
        dotColor={{ from: "color", modifiers: [] }}
        dotBorderWidth={2}
        dotBorderColor={{
          from: "color",
          modifiers: [["darker", 0.7]],
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#ffffff",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#ffffff",
                },
              },
            ],
          },
        ]}
        
      />
    </Container>
  );
}
