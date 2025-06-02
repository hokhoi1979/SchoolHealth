import { Tooltip } from "antd";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

function MedicalManager() {
  const eventTypeData = [
    { name: "Tháng 9", TaiNan: 12, Benh: 18, Khac: 5 },
    { name: "Tháng 10", TaiNan: 15, Benh: 25, Khac: 8 },
    { name: "Tháng 11", TaiNan: 10, Benh: 30, Khac: 5 },
    { name: "Tháng 12", TaiNan: 8, Benh: 22, Khac: 6 },
    { name: "Tháng 1", TaiNan: 14, Benh: 19, Khac: 4 },
    { name: "Tháng 2", TaiNan: 16, Benh: 15, Khac: 7 },
  ];
  return (
    <div>
      <div className="bg-white rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-4">Event chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={eventTypeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="TaiNan" fill="#4B9EFF" name="Tai nạn" />
            <Bar dataKey="Benh" fill="#2DBE60" name="Bệnh" />
            <Bar dataKey="Khac" fill="#FFB74D" name="Khác" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MedicalManager;
