import { useEffect, useState } from "react";

import { Link, Outlet } from "react-router-dom";
import { Button, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { AppFooter } from "../../../components/Footer/AppFooter";

function Materials() {
  const [click, setClick] = useState("inventory");
  let material = [
    {
      total: "79",
      stock: "99",
    },
  ];

  useEffect(() => {
    console.log(material);
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="p-6 flex flex-col flex-1">
          <h1 className="text-xl font-inria font-medium mb-4">
            <CommonBreadcrumb role={"Nurse"} page={"materials"} />
          </h1>

          <div className="flex justify-between mt-5">
            <div className="flex bg-[#F3F3F3] font-kameron w-[500px] h-10 items-center rounded-md ml-5">
              <div className="m-auto flex gap-5">
                <div
                  className={`hover:bg-white p-1 rounded-md ${
                    click === "inventory"
                      ? "bg-white rounded-md text-black"
                      : ""
                  }`}
                >
                  <Link onClick={() => setClick("inventory")} to={""}>
                    Inventory
                  </Link>
                </div>
                <div
                  className={`hover:bg-white p-1 rounded-md ${
                    click === "import" ? "bg-white rounded-md text-black" : ""
                  }`}
                >
                  <Link onClick={() => setClick("import")} to={"import"}>
                    Import
                  </Link>
                </div>

                <div
                  className={`hover:bg-white p-1 rounded-md ${
                    click === "medicine" ? "bg-white rounded-md text-black" : ""
                  }`}
                >
                  <Link onClick={() => setClick("medicine")} to={"medicine"}>
                    Drugs for Student
                  </Link>
                </div>

                <div
                  className={`hover:bg-white p-1 rounded-md ${
                    click === "schedule" ? "bg-white rounded-md text-black" : ""
                  }`}
                >
                  <Link onClick={() => setClick("schedule")} to={"schedule"}>
                    Medication schedule
                  </Link>
                </div>
              </div>
            </div>

            {click === "medicine" && <> </>}
          </div>

          <div className="flex-1 overflow-auto mt-5 ml-5 mr-5 mb-10">
            <Outlet />
          </div>
          <div className="mt-20"></div>

          {click === "inventory" && <> </>}

          {click === "medicine" && <> </>}
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default Materials;
