import classNames from "classnames";
import * as d3 from "d3-format";
import * as d3Chromatic from "d3-scale-chromatic";
import { motion } from "framer-motion";
import React, { ReactElement, useState } from "react";

import { StatisticsResponse } from "../types";

interface TopCountriesProps {
  title: string;
  data: ({ onClick: () => void } & StatisticsResponse)[];
  defaultTopNumber: number;
  colorPattern: string;
  selectedNameId: string;
}

export default function TopCountries ({ title, data, defaultTopNumber, colorPattern, selectedNameId }: TopCountriesProps): ReactElement {
  const [displayAmount, setDisplayAmount] = useState<number>(defaultTopNumber || 10);

  const handleOnExpand = () => {
    if (displayAmount + 5 >= data.length) {
      setDisplayAmount(data.length);
    } else {
      setDisplayAmount(displayAmount + 5);
    }
  };

  const handleOnCollapse = () => {
    setDisplayAmount(defaultTopNumber);
  };

  const getD3Color = (t) => {
    return colorPattern === "YlOrRd" ? d3Chromatic.interpolateYlOrRd(t) : colorPattern === "PuRd" ? d3Chromatic.interpolatePuRd(t) : colorPattern === "GnBu" ? d3Chromatic.interpolateGnBu(t) : colorPattern === "Greys" ? d3Chromatic.interpolateGreys(t) : "white";
  };

  return (
    <div className="row">
      <h2 className="has-text-white">{title}</h2>
      <div
        className="px-4 py-4 field is-grouped is-grouped-multiline"
        style={{
          maxHeight: 300,
          overflowX: "auto",
        }}
      >
        {data.slice(0, displayAmount).map((item, index) => {
          const scaleColor = getD3Color(0.9 - (index / data.length) * 0.9);
          return (
            <motion.p whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} animate={{ scale: 1 }} key={item.alpha3code} className="control">
              <a
                className={classNames("button", "top-button-" + item.alpha3code)}
                style={{
                  border: `${scaleColor} 1px solid`,
                  background: scaleColor,
                  color: "white",
                  opacity: selectedNameId === item.alpha3code ? 0.6 : 1,
                }}
                onClick={item.onClick}
              >
                <b>{item.country}</b>&nbsp;
                {`(${d3.format(",")(item.cases.total)})`}
              </a>
              <style>{`.button.top-button-${item.alpha3code}:hover{opacity:0.7;}`}</style>
            </motion.p>
          );
        })}
        {displayAmount !== data.length && (
          <motion.p whileHover={{ scale: 1.05 }} animate={{ scale: 1 }} className="control">
            <a className="button has-background-black" onClick={handleOnExpand} style={{ background: "black", color: "white" }}>
              ...
            </a>
          </motion.p>
        )}
        {displayAmount === data.length && (
          <motion.p whileTap={{ scale: 0.95 }} animate={{ scale: 1 }} className="control">
            <a className="button has-background-black" onClick={handleOnCollapse} style={{ background: "black", color: "white" }}>
              Collapse
            </a>
          </motion.p>
        )}
      </div>
    </div>
  );
}
