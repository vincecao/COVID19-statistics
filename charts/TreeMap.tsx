import { ResponsiveTreeMap } from "@nivo/treemap";
import type { ReactElement } from "react";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 700px;
`;

type TreeMapProps = {
  data;
};

export default function TreeMap({ data }: TreeMapProps): ReactElement {
  return (
    <Container>
      <ResponsiveTreeMap
        data={data}
        identity="name"
        value="value"
        valueFormat=".02s"
        tile="binary"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        enableLabel
        labelSkipSize={12}
        labelTextColor={{
          from: "color",
          modifiers: [["brighter", 1.2]],
        }}
        parentLabelPosition="left"
        parentLabelTextColor={{
          from: "color",
          modifiers: [["brighter", 3]],
        }}
        colors={{ scheme: "greys" }}
        nodeOpacity={0.3}
        borderWidth={0}
        borderColor={{
          from: "color",
          modifiers: [["brighter", 0.1]],
        }}
      />
    </Container>
  );
}
