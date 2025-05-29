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

function VaccinationManager() {
  const healthIssuesData = [
    { name: "2020", ThiLuc: 28, RangMieng: 20, DinhDuong: 18, CotSong: 14 },
    { name: "2021", ThiLuc: 30, RangMieng: 22, DinhDuong: 16, CotSong: 15 },
    { name: "2022", ThiLuc: 33, RangMieng: 19, DinhDuong: 15, CotSong: 15 },
    { name: "2023", ThiLuc: 35, RangMieng: 17, DinhDuong: 14, CotSong: 16 },
    { name: "2024", ThiLuc: 38, RangMieng: 15, DinhDuong: 12, CotSong: 18 },
  ];
  return (
    <div>
      <div className="bg-white rounded-2xl p-5">
        <h2 className="text-lg font-semibold mb-4">Health problem chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={healthIssuesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="ThiLuc"
              stroke="#4B9EFF"
              name="Thị lực"
            />
            <Line
              type="monotone"
              dataKey="RangMieng"
              stroke="#2DBE60"
              name="Răng miệng"
            />
            <Line
              type="monotone"
              dataKey="DinhDuong"
              stroke="#FFB74D"
              name="Dinh dưỡng"
            />
            <Line
              type="monotone"
              dataKey="CotSong"
              stroke="#B388EB"
              name="Cột sống"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default VaccinationManager;
