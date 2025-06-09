import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import Item from "antd/es/list/Item";
import { fetchVaccine } from "../../../redux/vaccineNurse/vaccine/vaccineSlice";

function VaccineDay() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { vaccine = [], error } = useSelector((state) => state.vaccine);

  const fetchData = () => {
    dispatch(fetchVaccine());
  };
  useEffect(() => {
    console.log("DUC", data);
  }, [data]);

  const formatData = () => {
    if (
      vaccine?.data?.vaccinationEvents &&
      Array.isArray(vaccine?.data?.vaccinationEvents)
    ) {
      const format = vaccine?.data?.vaccinationEvents.map((item) => {
        return {
          id: item?.id,
          status: item?.status,
          name: item?.name,
          description: item?.customMailBody,
          scheduledAt: item?.scheduledAt
            ? dayjs(item.scheduledAt).format("DD/MM/YYYY HH:mm")
            : "Chưa xác định",

          updatedAt: item?.updatedAt
            ? dayjs(item.updatedAt).format("DD/MM/YYYY HH:mm")
            : "Chưa cập nhật",

          updatedBy: item?.updatedBy,
          grade: item?.targets?.map((target) => target.className).join(", "),
          accept: item?.studentResponseCount?.studentsAcceptCount,
          total: item?.studentResponseCount?.totalStudent,
        };
      });
      setData(format);
    }
  };

  useEffect(() => {
    formatData();
  }, [vaccine]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 pl-5 gap-5.5 h-auto ">
        {data.map((item) => (
          <div
            className="bg-white p-6 rounded-2xl hover:bg-gray-100"
            style={{ cursor: "pointer" }}
            // onClick={() => navigate("studentList", { state: { item } })}
            onClick={() => navigate(`studentList/${item.id}`)}
          >
            <div className="flex justify-between">
              {item.status === "CONFIRMED" ? (
                <>
                  <Button className="!bg-[#6CC76F] !text-white">
                    {item.status}
                  </Button>
                </>
              ) : (
                <Button className="!bg-[#CBD361] !text-white">
                  {item.status}
                </Button>
              )}
            </div>
            <h1 className="mt-2 text-2xl">{item.name}</h1>
            <p className="text-gray-500">Grade: {item?.grade}</p>
            <p className="text-gray-500">{item.participate}</p>

            <div className="flex gap-2.5 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#5B5454"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m17 3l4 4m-2-2l-4.5 4.5m-3-3l6 6m-1-1L10 18H6v-4l6.5-6.5m-5 5L9 14m1.5-4.5L12 11M3 21l3-3"
                />
              </svg>
              <p>School</p>
            </div>

            <div className="flex gap-2.5 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="gray"
                  d="M16.95 15.95a7 7 0 1 0-9.9 0L12 20.9zM12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM13 11h4v2h-6V6h2z"
                />
              </svg>
              <p>
                {item.updatedAt
                  ? dayjs(item.updatedAt).format("DD/MM/YYYY HH:mm")
                  : "Không rõ cập nhật"}
              </p>
            </div>

            <div className="mt-3">
              <div className="flex justify-between mb-1 text-sm text-gray-600">
                <span>Xác nhận tham gia:</span>
                <span>
                  {item.accept}/{item.total}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                <div
                  className="bg-teal-500 h-2.5 rounded-full"
                  style={{
                    width: `${
                      item.total && item.total > 0
                        ? ((item.accept / item.total) * 100).toFixed(0)
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

              <div className="text-right text-sm text-gray-500 mt-1">
                {item.total && item.total > 0
                  ? `${((item.accept / item.total) * 100).toFixed(0)}%`
                  : "0%"}
              </div>
            </div>
          </div>
        ))}
        <div className="h-30"></div>
      </div>
    </div>
  );
}

export default VaccineDay;
