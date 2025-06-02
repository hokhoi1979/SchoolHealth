import { Tooltip } from "antd";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
function Trend() {
  const eventTrendData = [
    { name: "Tuần 1", SuKien: 25 },
    { name: "Tuần 2", SuKien: 32 },
    { name: "Tuần 3", SuKien: 29 },
    { name: "Tuần 4", SuKien: 35 },
    { name: "Tuần 5", SuKien: 30 },
    { name: "Tuần 6", SuKien: 26 },
    { name: "Tuần 7", SuKien: 34 },
    { name: "Tuần 8", SuKien: 38 },
  ];
  return (
    <div>
      {" "}
      <div className="bg-white rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-4">Event trends over time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={eventTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="SuKien"
              stroke="#4B9EFF"
              name="Số sự kiện"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Trend;
