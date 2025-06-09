import React, { useEffect, useState } from "react";
import { AppFooter } from "../../../components/Footer/AppFooter";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { Link } from "react-router-dom";
import { Button, Input, Modal, Space, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../../redux/profileNurse/profileSlice";
import { fetchProfileDetail } from "../../../redux/vaccineNurse/profileDetail/profileStudentSlice";
const StudentProfile = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [healthId, setHealthId] = useState(null);
  const [dataDetail, setDataDetail] = useState([]);
  const [totalStudent, setTotalStudent] = useState(null);
  const [male, setMale] = useState(null);
  const [female, setFemale] = useState(null);

  const {
    student = [],
    loading,
    error,
  } = useSelector((state) => state.profile);

  const { profileStudent = [] } = useSelector(
    (state) => state.fetchProfileDetail
  );

  const fetchData = () => {
    dispatch(fetchProfile());
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(student);

  const formatData = () => {
    if (
      student?.listHealthProfiles &&
      Array.isArray(student.listHealthProfiles)
    ) {
      const formatted = student.listHealthProfiles.map((item) => {
        const save = item.student;
        return {
          id: item?.id,
          studentID: save?.student_code,
          name: save?.account?.fullname,
          grade: save?.classAssignments?.[0]?.class?.name ?? "Chưa rõ",
          gender: save?.gender,
          date: save?.dateOfBirth?.split("T")[0],
          parent: save?.ParentInfo?.fullname,
          phone: save?.ParentInfo?.phone,
          email: save?.ParentInfo?.email,
        };
      });
      const total = student.listHealthProfiles.length;
      setTotalStudent(total);
      setData(formatted);
    }
  };

  useEffect(() => {
    formatData();
  }, [student]);

  const columns = [
    {
      title: "ID",
      dataIndex: "studentID",
      key: "studentID",
      align: "center",
    },
    {
      title: "Student",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      align: "center",
    },
    {
      title: "Date of Birth",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      align: "center",
    },

    {
      title: "Parent",
      dataIndex: "parent",
      key: "parent",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
            styles={{
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
                onClick={() => {
                  setOpen(true);
                  setHealthId(record.id);
                }}
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

  const fetchDataDetail = () => {
    dispatch(fetchProfileDetail(healthId));
  };

  useEffect(() => {
    if (healthId) {
      fetchDataDetail();
    }
  }, [healthId]);

  const formatDataDetail = () => {
    if (profileStudent && Array.isArray(profileStudent)) {
      const formatDetail = profileStudent.map((item) => ({
        studentID: item?.student?.student_code,
        studentName: item?.student?.account?.fullname,
        bloodGroup: item?.bloodGroup,
        grade: item?.student?.classAssignments?.[0]?.class?.name ?? "Chưa rõ",
        parent: item?.student?.ParentInfo?.fullname,
        dateOfBirth: item?.student?.dateOfBirth?.split("T")[0],
        phone: item?.student?.ParentInfo?.phone,
        gender: item?.student?.gender,
        height: item?.height,
        weight: item?.weight,
        eyeLeft: item?.visionLeft,
        eyeRight: item?.visionRight,
        allergy: item?.detailAllergies,
        allergyMethod: item?.methodAllergies,
        hasAllergy: !item?.hasNoAllergies,
        chronicDisease: item?.detailChronicDiseases,
        chronicMethod: item?.methodChronicDiseases,
        hasChronic: !item?.hasNochronicDiseases,
        medication: item?.medicationNote,
        visionNote: item?.noteVision,
        hearingLeft: item?.hearingLeft,
        hearingRight: item?.hearingRight,
        hearingNote: item?.noteHearing,
        vaccineHistory: item?.vaccinationHistory,
        sideEffect: item?.sideEffect,
        sideEffectDetail: item?.DetailSideEffect,
        additionalNote: item?.additionalNote,
        vaccinations: item?.healthVaccination?.map((v) => v.vaccination?.name),
        allergiesList: item?.healthAllergies?.map((a) => a.allergies?.name),
        chronicList: item?.healthChronicDiseases?.map(
          (c) => c.chronicDiseases?.name
        ),
      }));

      const totalMale = student.listHealthProfiles.filter(
        (item) => item?.student?.gender?.toLowerCase() === "nam"
      ).length;
      const totalFemale = student.listHealthProfiles.filter(
        (item) => item?.student?.gender?.toLowerCase() === "nu"
      ).length;

      setMale(totalMale);
      setFemale(totalFemale);

      setDataDetail(formatDetail[0]);
      console.log("HELLO", dataDetail);
    }
  };

  useEffect(() => {
    if (profileStudent.length > 0) {
      formatDataDetail();
    }
  }, [profileStudent]);

  return (
    <>
      {" "}
      <div className="flex flex-col min-h-screen">
        <div className="p-6 flex flex-col flex-1">
          <h1 className="text-xl font-inria font-medium mb-4">
            <CommonBreadcrumb role={"Nurse"} page={"student"} />
          </h1>

          <div className="grid grid-cols-4 gap-5 mt-5 w-[100%] pl-5 pr-5 font-kameron ">
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Total Student</p>
              <p className="flex justify-center text-[50px]">{totalStudent}</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Male</p>
              <p className="flex justify-center text-[50px]">{male}</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Female</p>
              <p className="flex justify-center text-[50px]">{female}</p>
            </div>
            <div className="h-[120px] bg-white rounded-2xl">
              <p className="flex justify-center mt-5">Out of Stock</p>
              <p className="flex justify-center text-[50px]">12</p>
            </div>
          </div>
          <div className="pl-5 mt-5 flex gap-5">
            <Input
              style={{ borderRadius: "7px", width: "300px" }}
              placeholder="Search for ID, Name student..."
            />
            <Button
              className="!bg-[#90A8B0] !hover:bg-gray-600"
              type="secondary"
            >
              <p className="text-white font-kameron"> Search</p>
            </Button>
          </div>
          <Table className="mt-5" columns={columns} dataSource={data} />
        </div>

        <div className="h-30"></div>

        <AppFooter />
      </div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={800}
        closable={false}
      >
        <div className="flex justify-between">
          <div></div>
          <div className="w-[30px]" onClick={() => setOpen(false)}>
            <h2 className=" hover:bg-gray-200 px-2 py-1 flex justify-center rounded-2xl cursor-pointer">
              X
            </h2>
          </div>
        </div>
        <div className="p-4 max-h-[80vh] overflow-y-scroll font-serif">
          <h2 className="text-xl mb-4 text-center font-bold">
            Health Profile Details
          </h2>

          <div className="grid grid-cols-2 gap-x-4 text-sm mb-4">
            <div>
              <b>StudentID:</b> {dataDetail?.studentID || "Chưa rõ"}
            </div>
            <div>
              <b>StudentName:</b> {dataDetail?.studentName || "Chưa rõ"}
            </div>
            <div>
              <b>Blood type:</b> {dataDetail?.bloodGroup || "Chưa rõ"}
            </div>
            <div>
              <b>Grade:</b> {dataDetail?.grade || "Chưa rõ"}
            </div>
            <div>
              <b>Parent:</b> {dataDetail?.parent || "Chưa rõ"}
            </div>
            <div>
              <b>Date of birth:</b> {dataDetail?.dateOfBirth || "Chưa rõ"}
            </div>
            <div>
              <b>Phone:</b> {dataDetail?.phone || "Chưa rõ"}
            </div>
            <div>
              <b>Gender:</b> {dataDetail?.gender || "Chưa rõ"}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div className="bg-gray-100 p-3 rounded-2xl">
              <div className="text-sm text-gray-600">Height</div>
              <div className="text-xl font-semibold">
                {dataDetail?.height || "--"}
              </div>
              <div className="text-xs text-gray-500">cm</div>
            </div>
            <div className="bg-gray-100 p-3 rounded-2xl">
              <div className="text-sm text-gray-600">Weight</div>
              <div className="text-xl font-semibold">
                {dataDetail?.weight || "--"}
              </div>
              <div className="text-xs text-gray-500">kg</div>
            </div>

            <div className="bg-gray-100 p-3 rounded-2xl">
              <div className="text-sm text-gray-600">Eye</div>
              <div className="text-xl font-semibold">{`${
                dataDetail?.eyeLeft || "-"
              } / ${dataDetail?.eyeRight || "-"}`}</div>
              <div className="text-xs text-gray-500">trái/phải</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#f0b25c"
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-1-5h2v2h-2zm0-8h2v6h-2z"
                />
              </svg>
              <h3 className="font-semibold text-[#f0b25c] mb-1">
                Allergies & Reactions
              </h3>
            </div>
            <p>
              <b>Have allergies:</b> {dataDetail?.hasAllergy ? "Có" : "Không"}
            </p>
            <p>
              <b>Detail:</b> {dataDetail?.allergy || "Không có"}
            </p>
            <p>
              <b>Method:</b> {dataDetail?.allergyMethod || "Không có"}
            </p>
          </div>

          <div className="mb-4">
            <div className="flex gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#35b7a8"
                  d="M19 2v2h-2v3a3 3 0 0 1 3 3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10a3 3 0 0 1 3-3V4H5V2zm-2 7H7a1 1 0 0 0-1 1v10h12V10a1 1 0 0 0-1-1m-4 2v2h2v2h-2.001L13 17h-2l-.001-2H9v-2h2v-2zm2-7H9v3h6z"
                />
              </svg>
              <h3 className="font-semibold text-[#35b7a8] mb-1">
                Chronic Diseases & Treatment
              </h3>
            </div>
            <p>
              <b>Have a chronic illness:</b>{" "}
              {dataDetail?.hasChronic ? "Có" : "Không"}
            </p>
            <p>
              <b>Detail:</b> {dataDetail?.chronicDisease || "Không có"}
            </p>
            <p>
              <b>Method:</b> {dataDetail?.chronicMethod || "Không có"}
            </p>
            <p>
              <b>Treatment history:</b>{" "}
              {dataDetail?.treatmentHistory || "Không có"}
            </p>
          </div>

          <div className="mb-4">
            <div className="flex gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="#3dce66"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M20.193 12.999a6 6 0 1 1-10.392 6m10.392-6a6 6 0 0 0-10.392 6m10.392-6l-10.392 6m.242-13.457l5.085-3.005c1.872-1.106 4.266-.45 5.347 1.467A4.08 4.08 0 0 1 20 8.682m-9.957-3.14L4.958 8.547c-1.872 1.106-2.514 3.556-1.433 5.472A3.9 3.9 0 0 0 6.5 16m3.543-10.458L11.5 8"
                  color="#3dce66"
                />
              </svg>
              <h3 className="font-semibold text-green-600 mb-1">
                Medication & Dosage
              </h3>
            </div>
            <p>
              <b>Descriptions:</b>{" "}
              {dataDetail?.medication || "Không có ghi chú"}
            </p>
          </div>

          <div className="mb-4">
            <div className="flex gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="#3d47ce"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  color="#3d47ce"
                >
                  <path d="M2 8s4.477-5 10-5s10 5 10 5" />
                  <path d="M21.544 13.045c.304.426.456.64.456.955c0 .316-.152.529-.456.955C20.178 16.871 16.689 21 12 21c-4.69 0-8.178-4.13-9.544-6.045C2.152 14.529 2 14.315 2 14c0-.316.152-.529.456-.955C3.822 11.129 7.311 7 12 7c4.69 0 8.178 4.13 9.544 6.045" />
                  <path d="M15 14a3 3 0 1 0-6 0a3 3 0 0 0 6 0" />
                </g>
              </svg>
              <h3 className="font-semibold text-purple-700 mb-1">
                Vision & Hearing
              </h3>
            </div>
            <p>
              <b>Eye:</b> Trái {dataDetail?.eyeLeft || "-"} / Phải{" "}
              {dataDetail?.eyeRight || "-"}
            </p>
            <p>
              <b>Vision Notes:</b> {dataDetail?.visionNote || "Không có"}
            </p>
            <p>
              <b>Hearing:</b> Trái {dataDetail?.hearingLeft || "-"} / Phải{" "}
              {dataDetail?.hearingRight || "-"}
            </p>
            <p>
              <b>Note Hearing:</b> {dataDetail?.hearingNote || "Không có"}
            </p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-cyan-700 mb-1">💉 Vaccination</h3>
            <p>
              <b>History:</b> {dataDetail?.vaccineHistory || "Không có"}
            </p>
            <p>
              <b>Side effects:</b> {dataDetail?.sideEffect ? "Có" : "Không"}
            </p>
            {dataDetail?.sideEffect && (
              <p>
                <b>Details:</b> {dataDetail?.sideEffectDetail || "Không rõ"}
              </p>
            )}
          </div>

          {/* Notes */}
          {dataDetail?.additionalNote && (
            <div className="bg-yellow-50 p-3 rounded mb-4">
              <p className="italic">"{dataDetail.additionalNote}"</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default StudentProfile;
