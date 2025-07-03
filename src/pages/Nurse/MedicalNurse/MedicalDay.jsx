import { Button, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchCheckup } from "../../../redux/checkupNurse/checkupDay/checkupSlice";
import dayjs from "dayjs";

function MedicalDay() {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const { medical = [] } = useSelector((state) => state.checkupNurse);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCheckup());
  }, []);

  useEffect(() => {
    if (
      medical?.data?.checkUpEvents &&
      Array.isArray(medical.data.checkUpEvents)
    ) {
      const formatted = medical.data.checkUpEvents.map((item) => {
        const targetType = item?.HealthCheckupTarget?.[0]?.targetType;
        const targetsArray = Array.isArray(item.targets) ? item.targets : [];

        const formattedTargets =
          targetType === "CLASS"
            ? targetsArray.map((t) => t.className).join(", ")
            : targetType === "GRADE"
            ? targetsArray.map((t) => t.grade).join(", ")
            : "";

        return {
          id: item.id,
          title: item.title,
          description: item.description,
          customMailTitle: item.customMailTitle,
          customMailBody: item.customMailBody,
          createdAt: dayjs(item.createdAt).format("HH:mm DD/MM/YYYY"),
          updatedAt: dayjs(item.updatedAt).format("HH:mm DD/MM/YYYY"),
          scheduledAt: dayjs(item.scheduledAt).format("HH:mm DD/MM/YYYY"),
          status: item.status,
          createdBy: item.createdBy,
          updatedBy: item.updatedBy,
          totalStudent: item.studentResponseCount?.totalStudent || 0,
          studentPendingCount:
            item.studentResponseCount?.studentPendingCount || 0,
          studentsAcceptCount:
            item.studentResponseCount?.studentsAcceptCount || 0,
          studentsDeclinedCount:
            item.studentResponseCount?.studentsDeclinedCount || 0,
          targets: formattedTargets,
          targetType,
        };
      });

      setEvent(formatted);
    }
  }, [medical]);

  return (
    <div>
      <div className="grid grid-cols-3 pl-5 gap-5.5 h-auto">
        {event.map((item) => (
          <div
            key={item.id}
            className="h-auto bg-white bg-gradient-to-br from-[#e0f7fa] via-white to-[#fce4ec] rounded-2xl border border-gray-200 shadow-md hover:shadow-lg p-5 relative flex flex-col justify-between transition-all duration-300"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`studentListCheckup/${item.id}`)}
          >
            <div className="flex justify-between">
              {item.status === "CONFIRMED" ? (
                <Tag color="green">{item.status}</Tag>
              ) : (
                <Tag color="orange">{item.status}</Tag>
              )}
            </div>

            <h1 className="mt-2 text-2xl">{item.title}</h1>

            {item.targetType === "GRADE" && (
              <p className="text-gray-500">Khối: {item.targets}</p>
            )}
            {item.targetType === "CLASS" && (
              <p className="text-gray-500">Lớp: {item.targets}</p>
            )}

            {item.targetType === "SCHOOL" && (
              <p className="text-gray-500">Toàn trường</p>
            )}

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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
              <p>{item.scheduledAt}</p>
            </div>

            <div className="mt-3">
              <div className="flex justify-between mb-1 text-sm text-gray-600">
                <span>Xác nhận tham gia:</span>
                <span>
                  {item.studentsAcceptCount}/{item.totalStudent}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                <div
                  className="bg-teal-500 h-2.5 rounded-full"
                  style={{
                    width: `${
                      item.totalStudent > 0
                        ? (
                            (item.studentsAcceptCount / item.totalStudent) *
                            100
                          ).toFixed(0)
                        : 0
                    }%`,
                  }}
                ></div>
              </div>

              <div className="text-right text-sm text-gray-500 mt-1">
                {item.totalStudent > 0
                  ? `${(
                      (item.studentsAcceptCount / item.totalStudent) *
                      100
                    ).toFixed(0)}%`
                  : "0%"}
              </div>
            </div>
          </div>
        ))}
        <div className="h-30" />
      </div>
    </div>
  );
}

export default MedicalDay;
