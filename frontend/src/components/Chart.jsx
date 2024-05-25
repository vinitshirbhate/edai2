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
import { useEspData } from "../pages/EspDataContext";

export const AreaChartComponent = ({ dataKey, stroke, fill }) => {
  const espData = useEspData();

  if (!espData || espData.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart width={500} height={400} data={espData}>
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
