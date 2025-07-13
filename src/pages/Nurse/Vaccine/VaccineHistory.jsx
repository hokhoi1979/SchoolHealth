import { Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVaccine } from "../../../redux/vaccineNurse/vaccine/vaccineSlice";
import dayjs from "dayjs";

function VaccineHistory() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { vaccine = [], error } = useSelector((state) => state.vaccine);
  const fetchData = () => {
    dispatch(fetchVaccine());
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const formatData = () => {
    if (
      vaccine?.data?.vaccinationEvents &&
      Array.isArray(vaccine?.data?.vaccinationEvents)
    ) {
      const formatted = vaccine.data.vaccinationEvents
        .filter((item) => item.status === "SUCCESS") // chỉ lấy những sự kiện thành công
        .map((item) => {
          // Tính tỉ lệ tham gia
          const accept = item?.studentResponseCount?.studentsAcceptCount || 0;
          const total = item?.studentResponseCount?.totalStudent || 0;

          const rate =
            total > 0
              ? `${Math.round((accept / total) * 100)}% (${accept}/${total})`
              : "N/A";

          return {
            id: item?.id || "N/A",
            name: item?.name || "N/A",
            date: dayjs(item?.scheduledAt).isValid()
              ? dayjs(item.scheduledAt).format("DD/MM/YYYY")
              : "Chưa xác định",
            place: item?.place || "Chưa xác định",
            rate: rate,
          };
        });

      setData(formatted);
    }
  };

  useEffect(() => {
    formatData();
  }, [vaccine]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "num",
      align: "center",
    },

    {
      title: "Name of vaccination day",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
      align: "center",
    },
    {
      title: "Participation rate",
      dataIndex: "rate",
      key: "rate",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip
            placement="bottom"
            title="View"
            overlayInnerStyle={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "12px",
            }}
          >
            <div style={{ cursor: "pointer" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                ></path>
              </svg>
            </div>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {" "}
      <Table className="mt-5" columns={columns} dataSource={data} rowKey="id" />
      <div className="h-20"></div>
    </div>
  );
}

export default VaccineHistory;
