"use client";

import cn from "@/utils/cn";
import {
  CartesianGrid,
  DotProps,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Loader from "@/components/Loader";
import React from "react";
import Image from "next/image";
import NoDataImage from "public/images/no-data.png";

interface LineChartProps {
  data: any[];
  XdataKey: string | number;
  dataKey: string | number;
  isLoading?: boolean;
  className?: string;
}

const LineCharts: React.FC<LineChartProps> = ({
  className,
  isLoading,
  XdataKey,
  dataKey,
  data,
}) => {
  if (isLoading) {
    return (
      <div className="flex text-white items-center justify-center h-2/3 w-full">
        <Loader />
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[338px]">
        <Image src={NoDataImage} alt="" quality={100} />
      </div>
    );
  }
  return (
    <div className={cn("h-[321px] pl-3", className)}>
      <ResponsiveContainer width="95%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            bottom: 5,
          }}
        >
          <XAxis
            tickMargin={16}
            dataKey={XdataKey}
            tick={{ fill: "#fff", fontSize: 14, fontWeight: "normal" }}
            axisLine={{ stroke: "transparent" }}
            tickLine={{ stroke: "transparent" }}
          />
          <YAxis
            tickMargin={20}
            orientation="left"
            axisLine={{ stroke: "transparent" }}
            tickLine={{ stroke: "transparent" }}
            tick={{ fill: "#fff", fontSize: 14, fontWeight: "normal" }}
          />
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null;
              const { value } = payload[0];

              return (
                <div className="bg-black-2 border border-black p-2.5 w-20">
                  <p className="text-sm text-white text-center">{value}GB</p>
                </div>
              );
            }}
            contentStyle={{
              backgroundColor: "#191919",
              border: "1px solid #000",
              color: "#FFFFFF",
            }}
            wrapperStyle={{ outline: "none" }}
            itemStyle={{ color: "#fff" }}
            cursor={{
              stroke: "#FFFFFFA1",
              strokeWidth: 1,
              strokeDasharray: "5 5",
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#04FDF9"
            dot={false}
            activeDot={<CustomActiveDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomActiveDot = ({ cx, cy }: DotProps) => {
  if (cx == null || cy == null) return null;

  return (
    <>
      <rect
        x={cx - 8}
        y={cy - 8}
        width={16}
        height={16}
        fill="none"
        stroke="#fff"
        strokeWidth={2}
        transform={`rotate(45, ${cx}, ${cy})`}
      />
      <rect
        x={cx - 7}
        y={cy - 7}
        width={14}
        height={14}
        fill="none"
        stroke="#000"
        strokeWidth={2}
        transform={`rotate(45, ${cx}, ${cy})`}
      />
      <rect
        transform={`rotate(45, ${cx}, ${cy})`}
        x={cx - 6}
        y={cy - 6}
        width={12}
        height={12}
        fill="#04FDF9"
      />
    </>
  );
};

export default LineCharts;
