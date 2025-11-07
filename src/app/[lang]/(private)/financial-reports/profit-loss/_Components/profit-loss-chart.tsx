"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
// Custom Tooltip Component
const CustomTooltip = ({ payload, label, type }: any) => {
  if (payload && payload.length) {
    // const data = payload.find((p: any) => p.name === type); // Find the payload for the specific area
    return (
      <Box
        pt={1}
        pb={2}
        pr={2}
        pl={2}
        borderRadius={"8px"}
        sx={{
          backgroundColor: " rgba(255, 255, 255, 0.80)",
          filter: "drop-shadow(0px 2px 7.6px rgba(0, 0, 0, 0.10))",
          backdropFilter: " blur(6px)",
        }}
      >
        <Box display={"grid"}>
          <Typography
            variant="overline"
            textAlign={"center"}
            color={"primary"}
          >{`مفاد`}</Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 400,
              direction: "rtl",
            }}
            color={"primary"}
            textAlign={"center"}
          >
            {`${payload?.[0]?.value} `} افغانی
          </Typography>
        </Box>
        <Box display={"grid"}>
          <Typography
            variant="overline"
            textAlign={"center"}
            color={"error"}
          >{` ضرر`}</Typography>
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: 400,
              direction: "rtl",
            }}
            textAlign={"center"}
            color={"error"}
          >
            {` ${payload?.[1]?.value} `} افغانی
          </Typography>
        </Box>
      </Box>
    );
  }

  return null;
};
type ProfitLossChartProps = {
  dir:string
};
const ProfitLossChart = ({dir}: ProfitLossChartProps
) => {
  const [Chart, setChart] = useState<any>(null);

  useEffect(() => {
    // Lazy-load Recharts only in browser after hydration
    import("recharts").then((recharts) => {
      setChart(() => {
        const {
          Tooltip,
          XAxis,
          AreaChart,
          ResponsiveContainer,
          YAxis,
          Area,
          CartesianGrid,
        } = recharts;
        //         const data = [
        //   { name: "Group A", value: value1 },
        //   // { name: "Group B", value: 300 },
        //   { name: "Group C", value: value2 },
        //   // { name: "Group D", value: 200 },
        // ];
        // const COLORS = [color1, color2];

        return () => (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              style={{ direction: "ltr" }}
            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#21BFAC" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#21BFAC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" reversed={true} />
              <Tooltip
                content={
                  <CustomTooltip type="uv" payload={data} label={"uv"} />
                }
              />
              <YAxis orientation={dir === "ltr" ? "left" : "right"} />

              <CartesianGrid strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="uv"
                stroke="#FF8585"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#0E6359"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
              {/* <YAxis  orientation="right" width={100} /> */}
            </AreaChart>
          </ResponsiveContainer>
        );
      });
    });
  }, [dir]);
  if (!Chart) return null;
  return <Chart />;
};
export default ProfitLossChart;
