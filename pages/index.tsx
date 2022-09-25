import "bulma/css/bulma.css";

import { useStickyRef } from "@vincecao/use-tools";
import * as d3 from "d3-format";
import { format, subDays } from "date-fns";
import { motion } from "framer-motion";
import iso_countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json"
import { memo, ReactElement, useEffect, useMemo, useState } from "react";
import React from "react";

import Choropleth from "../charts/Choropleth";
import PieGraph from "../charts/PieGraph";
import StreamGraph from "../charts/StreamGraph";
import TreeMap from "../charts/TreeMap";
import Container, { FixedContainer } from "../components/Container";
import { Item,Level } from "../components/Level";
import StickyBanner from "../components/StickyBanner";
import TopCountries from "../components/TopCountries";
import useIPLocate from "../hooks/useIPLocate";
import useProvince from "../hooks/useProvinces";
import useReport from "../hooks/useReport";
import useStatistic from "../hooks/useStatistic";

iso_countries.registerLocale(en);

const MAIN_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.1 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.1 } },
};

const CONTAINER_VARIANTS = (index: number) => ({
  hidden: { opacity: 0, x: "100vw" },
  visible: { opacity: 1, x: 0, transition: { type: "spring", mass: 0.4, damping: 8, delay: 0.05 * index } },
  exit: { opacity: 0, y: 10, transition: { ease: "easeInOut" } },
});

const STICKY_VARIANTS = {
  hidden: { y: "-50vh" },
  visible: { y: 0, transition: { type: "tween" } },
  exit: { y: "-50vh", transition: { ease: "easeInOut" } },
};

export default function Home(): ReactElement {
  const Loading = memo(() => (
    <div className="is-dark mb-3">
      <progress className="progress is-small" max="100" style={{ backgroundColor: "black", backgroundImage: "linear-gradient(to right, #1d1d1d 30%, black 30%)" }} />
      <div className="level">
        <div className="level-item has-text-centered">
          <p className="heading has-text-white">Loading...</p>
        </div>
      </div>
    </div>
  ));

  const [selected, setSelected] = useState<string>("JPN"); // alpha3code
  const [date] = useState<Date>(new Date());

  const reportParams = useMemo(() => ({ iso: selected, date: format(subDays(date, 1), "yyyy-MM-dd") }), [selected, date]);

  const [reports, { status: reportsStatus }] = useReport(reportParams);
  const { data: statistics, pending: statisticsPending } = useStatistic();
  const { data: guessIPlocate, pending: guessIPlocatePending } = useIPLocate();
  const [sticky, stickyGateRef] = useStickyRef("top", 10);
  const [provinces, keys] = useProvince(selected, "confirmed");

  const fetching = reportsStatus === "pending" || statisticsPending || guessIPlocatePending;

  useEffect(() => {
    if (guessIPlocate) setSelected(guessIPlocate.alpha3code);
  }, [guessIPlocate]);

  useEffect(() => {
    console.log({ selected, reports, statistics, guessIPlocate, provinces });
  }, [selected, reports, statistics, guessIPlocate, provinces]);

  const statisticsMatched = useMemo(() => statistics?.response.find((re) => re.alpha3code === selected), [statistics, selected]);
  const lastUpdate = useMemo(() => (reports?.find((re) => re.region.alpha3code === selected) || {}).last_update, [reports, selected]);

  return (
    <motion.main variants={MAIN_VARIANTS} initial="hidden" animate="visible" exit="exit">
      {fetching && <Loading />}

      <Container variants={CONTAINER_VARIANTS(1)} hidden={!statisticsMatched || !reports}>
        {(() => {
          if (!statisticsMatched || !reports) return null;
          const { country, population, tests, cases, deaths } = statisticsMatched;

          const d3NumberFormat = d3.format(",");
          const d3PopulationFormat = d3.format(",.2s");

          return (
            <>
              <Level>
                <Item heading="Country" value={country} />
                <Item heading="Population" value={d3PopulationFormat(population)} />
                <Item heading="Tests" value={d3NumberFormat(tests.total)} />
                <Item heading="Cases" value={d3NumberFormat(cases.total)} newIncreased={`(+${d3NumberFormat(cases.new)})`} />
                <Item heading="Death" value={d3NumberFormat(deaths.total)} newIncreased={`(+${d3NumberFormat(deaths.new)})`} />
              </Level>
              {lastUpdate && (
                <p className="heading has-text-centered has-text-white">
                  Last Updated: <i>{format(new Date(lastUpdate), "Pp")}</i>
                </p>
              )}
            </>
          );
        })()}
      </Container>

      <motion.div variants={CONTAINER_VARIANTS(4)} hidden={!statistics}>
        {statistics && (
          <Choropleth
            data={statistics.response.map((s) => ({ id: s.alpha3code, value: s.cases.total }))}
            rotation={4}
            onClick={({ data: { id } }) => {
              setSelected(id);
            }}
          />
        )}
      </motion.div>

      <Container variants={CONTAINER_VARIANTS(2)} hidden={!statistics}>
        {statistics && (
          <TopCountries
            data={statistics.response
              .sort((s1, s2) => s2.cases.total - s1.cases.total)
              .map((s) => ({
                ...s,
                onClick: () => setSelected(s.alpha3code),
              }))}
            title="Top confirmed cases countries in global"
            defaultTopNumber={10}
            colorPattern="Greys"
            selectedNameId={selected}
          />
        )}
      </Container>

      <section ref={stickyGateRef}>
        <FixedContainer z={10} variants={STICKY_VARIANTS} hidden={!sticky || !statisticsMatched}>
          {statisticsMatched && <StickyBanner statisticsMatched={statisticsMatched} lastUpdate={lastUpdate} />}
        </FixedContainer>

        <Container variants={CONTAINER_VARIANTS(3)} hidden={!statisticsMatched || !reports}>
          <div className="columns">
            {(() => {
              if (!statisticsMatched) return null;
              const { cases, deaths, tests, country } = statisticsMatched;

              return (
                <div
                  className="column"
                  style={{
                    // force chart adjust its width
                    maxWidth: provinces.length > 0 ? 400 : "100%",
                    margin: "auto",
                    transition: "all 0.4s",
                  }}
                >
                  <h2 className="has-text-white">Cases of {country} today</h2>
                  <PieGraph
                    data={[
                      { id: "Deaths", value: deaths.total },
                      { id: "Cases", value: cases.total },
                      { id: "Tests", value: tests.total },
                    ]}
                  />
                </div>
              );
            })()}

            {(() => {
              if (!statisticsMatched || provinces.length === 0) return null;
              const { country } = statisticsMatched;

              return (
                <div className="column">
                  <h2 className="has-text-white">Top 6 confirmed cases with states/provinces of {country} in past n months</h2>
                  <StreamGraph data={provinces} keys={keys} bottomLegend="Past n months" leftLegend="Cases" />
                </div>
              );
            })()}
          </div>
        </Container>

        {(() => {
          if (!statisticsMatched || !reports) return null;
          const { country } = statisticsMatched;
          return (
            <Container className="column" variants={CONTAINER_VARIANTS(4)} hidden={fetching}>
              <h2 className="has-text-white">{country} Confirmed Cases</h2>
              <TreeMap
                data={{
                  name: country,
                  children: reports
                    .filter((re) => re.region.alpha3code === selected)
                    .map((r) => ({
                      name: r.region.province,
                      children: [{ name: `${r.region.province} - confirmed`, value: r.confirmed }],
                    })),
                }}
              />
              <br />
              <h2 className="has-text-white">{country} Deaths</h2>
              <TreeMap
                data={{
                  name: country,
                  children: reports
                    .filter((re) => re.region.alpha3code === selected)
                    .map((r) => ({
                      name: r.region.province,
                      children: [{ name: `${r.region.province} - deaths`, value: r.deaths }],
                    })),
                }}
              />
            </Container>
          );
        })()}
      </section>
    </motion.main>
  );
}
