import { Tooltip } from "antd";
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

function Checkup() {
  const heightWeightData = [
    { name: "6 tuổi", ChieuCao: 115, CanNang: 21 },
    { name: "7 tuổi", ChieuCao: 122, CanNang: 24 },
    { name: "8 tuổi", ChieuCao: 128, CanNang: 27 },
    { name: "9 tuổi", ChieuCao: 134, CanNang: 30 },
    { name: "10 tuổi", ChieuCao: 140, CanNang: 33 },
    { name: "11 tuổi", ChieuCao: 145, CanNang: 36 },
  ];
  return (
    <div>
      {" "}
      <div className="bg-white rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-4">Height and weight chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={heightWeightData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ChieuCao"
              stroke="#4B9EFF"
              name="Chiều cao (cm)"
            />
            <Line
              type="monotone"
              dataKey="CanNang"
              stroke="#2DBE60"
              name="Cân nặng (kg)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Checkup;
