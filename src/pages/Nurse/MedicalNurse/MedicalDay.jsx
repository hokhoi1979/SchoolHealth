import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router";

function MedicalDay() {
  const navigate = useNavigate();
  let vaccineDate = [
    {
      status: "Scheduled",
      name: "Medical ",
      grade: "12A3, 12A5, 12A6, 12T1",
      date: "15//6/2025",
      place: "District 1 Medical Center",
      participate: "62/80 Student",
      time: "8:00-11:30 am",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 pl-5 gap-5.5 h-auto ">
        {vaccineDate.map((item) => (
          <div
            className="bg-white p-6 rounded-2xl hover:bg-gray-100"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("studentList", { item })}
          >
            <div className="flex justify-between">
              {item.status === "Scheduled" ? (
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={25}
                height={25}
                viewBox="0 0 24 24"
              >
                <path
                  fill="gray"
                  d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                ></path>
              </svg>
            </div>
            <h1 className="mt-2 text-2xl">{item.name}</h1>
            <p className="text-gray-500">{item.grade}</p>
            <p className="text-gray-500">{item.participate}</p>

            <div className="flex gap-2.5 mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#5B5454"
                  fill-rule="evenodd"
                  d="M17.297 6.572c-.41 0-.75-.34-.75-.75V4.598c-.774-.026-1.683-.026-2.75-.026h-2c-1.068 0-1.976 0-2.75.026v1.224c0 .41-.34.75-.75.75s-.75-.34-.75-.75V4.706c-.945.123-1.594.36-2.05.816c-.602.602-.822 1.54-.903 3.05H21c-.081-1.51-.302-2.448-.903-3.05c-.456-.456-1.105-.693-2.05-.816v1.116c0 .41-.34.75-.75.75m3.744 3.5q.008.793.006 1.75v1c0 .41.34.75.75.75s.75-.34.75-.75v-1c0-3.98 0-5.97-1.39-7.36c-.772-.772-1.73-1.115-3.11-1.268v-.872c0-.41-.34-.75-.75-.75s-.75.34-.75.75v.775c-.796-.025-1.705-.025-2.75-.025h-2c-1.046 0-1.954 0-2.75.025v-.775c0-.41-.34-.75-.75-.75s-.75.34-.75.75v.872c-1.38.153-2.338.496-3.11 1.268c-1.39 1.39-1.39 3.39-1.39 7.36v2c0 3.98 0 5.97 1.39 7.36s3.38 1.39 7.36 1.39c.41 0 .75-.34.75-.75s-.34-.75-.75-.75c-3.56 0-5.35 0-6.3-.95s-.95-2.74-.95-6.3v-2q-.001-.956.005-1.75zm-3.244 13c-2.62 0-4.75-2.13-4.75-4.75s2.13-4.75 4.75-4.75s4.75 2.13 4.75 4.75s-2.13 4.75-4.75 4.75m0-8c-1.79 0-3.25 1.46-3.25 3.25s1.46 3.25 3.25 3.25s3.25-1.46 3.25-3.25s-1.46-3.25-3.25-3.25m.47 4.78c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.77 0-1.06l-.78-.78v-1.69c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2c0 .2.08.39.22.53z"
                  color="#5B5454"
                />
              </svg>
              <p>{item.date}</p>
            </div>

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
              <p>{item.place}</p>
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
              <p>{item.time}</p>
            </div>

            <div className="mt-3">
              <div className="flex justify-between mb-1 text-sm text-gray-600">
                <span>Xác nhận tham gia:</span>
                <span>{item.status}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                <div
                  className="bg-teal-500 h-2.5 rounded-full"
                  style={{ width: `${(62 / 80) * 100}%` }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-500 mt-1">
                {((62 / 80) * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        ))}
        <div className="h-30"></div>
      </div>
    </div>
  );
}

export default MedicalDay;
