//  "use client"
// import React, { useEffect, useState } from "react";
// import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

// interface IPropsPipChart {
//   color1: string;
//   color2: string;
//   value1: number;
//   value2: number;
// }

// const ProfitLossChartPip: React.FC<IPropsPipChart> = ({
//   color1,
//   color2,
//   value1,
//   value2,
// }) => {
//   const [isClient , setIsClient] = useState(false)
  // const data = [
  //   { name: "Group A", value: value1 },
  //   // { name: "Group B", value: 300 },
  //   { name: "Group C", value: value2 },
  //   // { name: "Group D", value: 200 },
  // ];
//   const COLORS = [color1, color2];

//   useEffect(()=>{
//     if (!isClient){
//       setIsClient(true)
//     }
//   },[isClient])

//   if (!isClient) return null

//   return (
//     <PieChart
// width={120}
// height={120}

//       //   onMouseEnter={this.onPieEnter}
//       // style={{
//       //   backgroundColor: "green",
//       // }}
//     >
// <Pie
//   data={data}
//   cx={"50%"}
//   cy={"50%"}
//   innerRadius={30}
//   // outerRadius={80}
//   // fill="#8884d8"
//   // paddingAngle={5}
//   dataKey="value"
//   startAngle={0}
//   // width={50}
//   // height={50}
// >
//   {data.map((entry, index) => (
//     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//   ))}
// </Pie>
//       {/* <Pie
//         data={data}
//         cx={420}
//         cy={200}
//         startAngle={180}
//         endAngle={0}
//         innerRadius={60}
//         outerRadius={80}
//         fill="#8884d8"
//         paddingAngle={5}
//         dataKey="value"
//       >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//         ))}
//       </Pie> */}
//     </PieChart>
//   );
// };

// export default ProfitLossChartPip;

"use client";

import { useEffect, useState } from "react";

interface IPropsPipChart {
  color1: string;
  color2: string;
  value1: number;
  value2: number;
}
export default function PieChartWrapper({color1 , color2 , value1 , value2 }:IPropsPipChart) {
  const [Chart, setChart] = useState<any>(null);

  useEffect(() => {
    // Lazy-load Recharts only in browser after hydration
    import("recharts").then((recharts) => {
      setChart(() => {
        const { PieChart, Pie, Cell } = recharts;
          const data = [
    { name: "Group A", value: value1 },
    // { name: "Group B", value: 300 },
    { name: "Group C", value: value2 },
    // { name: "Group D", value: 200 },
  ];
        const COLORS = [color1, color2];

        return () => (
          <PieChart width={120} height={120}>
            <Pie
              data={data}
              cx={"50%"}
              cy={"50%"}
              innerRadius={30}
              // outerRadius={80}
              // fill="#8884d8"
              // paddingAngle={5}
              dataKey="value"
              startAngle={0}
              // width={50}
              // height={50}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        );
      });
    });
  }, []);

  if (!Chart) return null;
  return <Chart />;
}
