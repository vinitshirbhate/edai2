import React from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export const AreaChartComponent = ({ data, dataKey, stroke, fill }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart width={500} height={400} data={data}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={dataKey} stroke={stroke} fill={fill} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
