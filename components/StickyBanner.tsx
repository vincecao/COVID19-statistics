import * as d3 from "d3-format";
import { format } from "date-fns";
import { motion, Variants } from "framer-motion";
import type { ReactElement } from "react";
import React from "react";
import styled from "styled-components";

import { StatisticsResponse } from "../types";

const AreaImage = styled(motion.img)`
  width: auto;
  height: 64px;
`;

const STICKY_BANNER_VARIANTS = (index: number) => ({
  hidden: { y: "-50vh" },
  visible: { y: 0, transition: { type: "spring", mass: 0.4, damping: 10, delay: 0.05 * index } },
});

type ItemProps = {
  content?: string
  heading?: string
  variants?: Variants
}

function Item({ content, heading, variants }: ItemProps) {
  return (
    <motion.div className="control" variants={variants} initial="hidden" animate="visible">
      <div className="tags has-addons">
        <span className="tag is-black">{heading}</span>
        <span className={`tag is-dark`}>{content}</span>
      </div>
    </motion.div>
  );
}

type StickyBannerProps = {
  statisticsMatched: StatisticsResponse;
  lastUpdate: Date;
};

export default function StickyBanner({ statisticsMatched: { alpha2code, country, population, tests, cases, deaths }, lastUpdate }: StickyBannerProps): ReactElement {
  const areaImgSrc = `//flagcdn.com/h240/${alpha2code.toLowerCase()}.png` || "";

  return (
    <div className="box has-background-black has-text-white">
      <article className="media">
        {areaImgSrc && (
          <div className="media-left">
            <AreaImage variants={STICKY_BANNER_VARIANTS(0)} initial="hidden" animate="visible" src={areaImgSrc} alt="Image" />
          </div>
        )}
        <div className="media-content">
          <div className="content">
            <motion.p variants={STICKY_BANNER_VARIANTS(0)} initial="hidden" animate="visible">
              <strong className="has-text-white" >{country}</strong>
            </motion.p>
            <div className="field is-grouped is-grouped-multiline">
              <Item heading="Population" content={d3.format(",.2s")(population)} variants={STICKY_BANNER_VARIANTS(1)} />
              <Item heading="Tests" content={d3.format(",")(tests.total)} variants={STICKY_BANNER_VARIANTS(2)} />
              <Item heading="Cases" content={`${d3.format(",")(cases.total)}${cases.new ? ` (+${d3.format(",")(cases.new)})` : ""}`} variants={STICKY_BANNER_VARIANTS(3)} />
              <Item heading="Deaths" content={`${d3.format(",")(deaths.total)}${deaths.new ? ` (+${d3.format(",")(deaths.new)})` : ""}`} variants={STICKY_BANNER_VARIANTS(4)} />
              {lastUpdate && <Item heading="Last Update" content={format(new Date(lastUpdate), "Pp")} variants={STICKY_BANNER_VARIANTS(5)} />}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
