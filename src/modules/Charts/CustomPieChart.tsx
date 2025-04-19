"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import Image from "next/image";
import Loader from "@/components/Loader";
import Logo from "public/images/logo-big.png";
import TextSm from "@/components/Typography/TextSm";
import NoDataImage from "public/images/no-data.png";

type Data = { name: string; value: number; color: string };

interface PieChartProps {
  data: Data[];
  isLoading?: boolean;
}

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    value,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10} // Expand radius on hover
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const CustomPieChart: React.FC<PieChartProps> = ({ isLoading, data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  if (isLoading) {
    return (
      <div className="flex text-white items-center justify-center h-2/3 w-full">
        <Loader />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[200px]">
        <Image src={NoDataImage} alt="" quality={100} />
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full h-[156px] overflow-visible">
        <ResponsiveContainer width="100%" height="80%">
          <PieChart
            margin={{
              top: 70,
              bottom: 5,
            }}
          >
            <Pie
              stroke="none"
              data={data}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={20}
              outerRadius={65}
              paddingAngle={0}
              activeIndex={activeIndex ?? -1}
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              isAnimationActive={true}
              label={renderLabel}
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2">
          <div className="w-20 h-20 rounded-full bg-black-border flex items-center justify-center">
            <Image src={Logo} alt="logo" quality={100} />
          </div>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-4.5 px-6">
        {data?.map((item, index) => (
          <div key={index} className="flex gap-1 items-center">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <TextSm className="text-white">{item.name}</TextSm>
          </div>
        ))}
      </div>
    </div>
  );
};

const renderLabel = ({ percent, x, y }: any) => {
  return (
    <text
      x={x}
      y={y}
      fill="#BFBFBF"
      textAnchor="middle"
      fontSize={16}
      fontWeight={600}
      fontFamily="inherit"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default CustomPieChart;
