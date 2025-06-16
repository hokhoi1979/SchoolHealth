"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Input,
  Select,
  Radio,
  Checkbox,
  Alert,
  Modal,
} from "antd";
import { SaveOutlined, CheckCircleOutlined } from "@ant-design/icons";
import CommonBreadcrumb from "../../../components/CommonBreadcrumb/CommonBreadcrumb";
import { AppFooter } from "../../../components/Footer/AppFooter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudent } from "../../../redux/profileParent/StudentOfParentSlice";
import { fetchParentHealth } from "../../../redux/profileParent/parentGetHealth/parentGetHealthSlice";
import { fetchCreateHealth } from "../../../redux/profileParent/createHealthSlice";
import { fetchForm } from "../../../redux/profileParent/formSlice";
import { fetchHealth } from "../../../redux/profileParent/HealthByIdSlice";
import { fetchUpdateHealth } from "../../../redux/profileParent/updateHealthSlice";

const { TextArea } = Input;
const { Option } = Select;

const StudentHealth = () => {
  const dispatch = useDispatch();

  //API get information student
  const { student, loading } = useSelector((state) => state.studentOfParent);
  //API get detail form
  const { formData, loading: formLoading } = useSelector(
    (state) => state.formParent
  );
  //API get detail health information
  const { healthDetail } = useSelector((state) => state.healthStudent);

  // Add selector for update health status
  const { loading: updateLoading, success: updateSuccess } = useSelector(
    (state) => state.updateHealth || {}
  );

  const allergiesDetail = Array.isArray(formData?.Allergies)
    ? formData.Allergies
    : [];
  const chronicDetail = Array.isArray(formData?.ChronicDiseases)
    ? formData.ChronicDiseases
    : [];
  const vaccinationList = Array.isArray(formData?.Vaccination)
    ? formData.Vaccination
    : [];

  //State for save status
  const [saved, setSaved] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showHealthForm, setShowHealthForm] = useState(false);
  const [healthExists, setHealthExists] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  const { healthProfileParent = [] } = useSelector(
    (state) => state.healthParentProfile
  );

  const fetchData = () => {
    dispatch(fetchStudent());
    dispatch(fetchForm());
    dispatch(fetchParentHealth());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectedStudent = (studentId) => {
    setSelectedStudent(studentId);
    setShowHealthForm(false);
    dispatch(fetchHealth(studentId));
  };

  useEffect(() => {
    if (healthDetail && selectedStudent) {
      setHealthExists(true);
    } else {
      setHealthExists(false);
    }
  }, [healthDetail, selectedStudent]);

  // FIX 1: Re-fetch health data after successful update
  useEffect(() => {
    if (updateSuccess && selectedStudent) {
      // Re-fetch the health data to get updated information
      dispatch(fetchHealth(selectedStudent));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }, [updateSuccess, selectedStudent, dispatch]);

  //Autofill form if data exists
  useEffect(() => {
    if (healthDetail && selectedStudent === healthDetail.studentID) {
      setHeight(healthDetail.height || "");
      setWeight(healthDetail.weight || "");
      setBloodGroup(healthDetail.bloodGroup?.toLowerCase() || "");
      setTreatmentHistory(healthDetail.treatmentHistory || "");
      setAddtionalNote(healthDetail.additionalNote || "");

      setHasAllergy(healthDetail.hasNoAllergies ? "no" : "yes");
      setAllergies(healthDetail.selectedAllergyIds || []);
      setDetailAllergies(healthDetail.detailAllergies || "");
      setMethodAllergies(healthDetail.methodAllergies || "");

      setHasChronic(healthDetail.hasNochronicDiseases ? "no" : "yes");
      setChronicDiseases(healthDetail.selectedChronicDiseases || []);
      setDetailChronicDiseases(healthDetail.detailChronicDiseases || "");
      setMethodChronicDiseases(healthDetail.methodChronicDiseases || "");
      setMedicationNote(healthDetail.medicationNote || "");

      setSelectedVaccinations(healthDetail.selectedVaccinations || []);
      setVaccinationHistory(healthDetail.vaccinationHistory || "");
      setHadSideEffects(healthDetail.sideEffect ? "yes" : "no");
      setDetailSideEffect(healthDetail.detailSideEffect || "");

      setVisionLeft(healthDetail.visionLeft || "");
      setVisionRight(healthDetail.visionRight || "");
      setWearGlasses(healthDetail.wearGlasses ? "yes" : "no");
      setNoteVision(healthDetail.noteVision || "");

      setHearingLeft(healthDetail.hearingLeft || "");
      setHearingRight(healthDetail.hearingRight || "");
      setUseHearingAids(healthDetail.hearingAid ? "yes" : "no");
      setNoteHearing(healthDetail.noteHearing || "");
    }
  }, [healthDetail, selectedStudent]);

  //State for information health
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [treatmentHistory, setTreatmentHistory] = useState("");
  const [additionalNote, setAddtionalNote] = useState("");

  //State for Allergies
  const [hasAllergy, setHasAllergy] = useState("no");
  const [allergies, setAllergies] = useState([]);
  const [detailAllergies, setDetailAllergies] = useState("");
  const [methodAllergies, setMethodAllergies] = useState("");

  //State for Chronic
  const [hasChronic, setHasChronic] = useState("no");
  const [chronicDiseases, setChronicDiseases] = useState([]);
  const [detailChronicDiseases, setDetailChronicDiseases] = useState("");
  const [methodChronicDiseases, setMethodChronicDiseases] = useState("");
  const [medicationNote, setMedicationNote] = useState("");

  //State for Vaccination
  const [healthVaccination, setHealthVaccination] = useState("no");
  const [selectedVaccinations, setSelectedVaccinations] = useState([]);
  const [vaccinationHistory, setVaccinationHistory] = useState("");
  const [hadSideEffects, setHadSideEffects] = useState("no");
  const [detailSideEffect, setDetailSideEffect] = useState("");

  //State for Vision & Hearing
  const [visionLeft, setVisionLeft] = useState("");
  const [visionRight, setVisionRight] = useState("");
  const [wearGlasses, setWearGlasses] = useState("no");
  const [noteVision, setNoteVision] = useState("");
  const [hearingLeft, setHearingLeft] = useState("");
  const [hearingRight, setHearingRight] = useState("");
  const [useHearingAids, setUseHearingAids] = useState("no");
  const [noteHearing, setNoteHearing] = useState("");

  //Save function
  const handleSave = () => {
    const payload = {
      studentID: selectedStudent,
      height,
      weight,
      bloodGroup: bloodGroup?.toUpperCase(),
      treatmentHistory,
      additionalNote,
      hasNoAllergies: hasAllergy === "no",
      selectedAllergyIds: allergies,
      detailAllergies,
      methodAllergies,
      hasNochronicDiseases: hasChronic === "no",
      selectedChronicDiseases: chronicDiseases,
      detailChronicDiseases,
      methodChronicDiseases,
      medicationNote,
      visionLeft,
      visionRight,
      wearGlasses: wearGlasses === "yes",
      noteVision,
      hearingLeft,
      hearingRight,
      hearingAid: useHearingAids === "yes",
      noteHearing,
      selectedVaccinations,
      vaccinationHistory,
      sideEffect: hadSideEffects === "yes",
      detailSideEffect,
    };
    dispatch(fetchCreateHealth(payload));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  //State local trong modal de edit
  const [modalIsEditing, setModalIsEditing] = useState(false);
  const [updateModalForm, setUpdateModalForm] = useState({
    height: "",
    weight: "",
    bloodGroup: "",
    treatmentHistory: "",
    additionalNote: "",
    hasNoAllergies: false,
    selectedAllergyIds: [],
    detailAllergies: "",
    methodAllergies: "",
    hasNochronicDiseases: false,
    selectedChronicDiseases: [],
    detailChronicDiseases: "",
    methodChronicDiseases: "",
    medicationNote: "",
    visionLeft: "",
    visionRight: "",
    wearGlasses: false,
    noteVision: "",
    hearingLeft: "",
    hearingRight: "",
    hearingAid: false,
    noteHearing: "",
    selectedVaccinations: [],
    vaccinationHistory: "",
    sideEffect: false,
    DetailSideEffect: "",
  });

  // FIX 2: Update modal form when healthDetail changes
  useEffect(() => {
    if (healthDetail?.data?.healthProfile) {
      const p = healthDetail.data.healthProfile;
      setUpdateModalForm({
        height: p.height || "",
        weight: p.weight || "",
        bloodGroup: p.bloodGroup || "",
        treatmentHistory: p.treatmentHistory || "",
        additionalNote: p.additionalNote || "",
        hasNoAllergies: p.hasNoAllergies || false,
        selectedAllergyIds: p.hasNoAllergies
          ? []
          : p.healthAllergies?.map((a) => a.allergies.id) || [1],
        detailAllergies: p.detailAllergies || "",
        methodAllergies: p.methodAllergies || "",
        hasNochronicDiseases: p.hasNochronicDiseases || false,
        selectedChronicDiseases: p.hasNochronicDiseases
          ? []
          : p.healthChronicDiseases?.map((c) => c.chronicDiseases.id) || [1],
        detailChronicDiseases: p.detailChronicDiseases || "",
        methodChronicDiseases: p.methodChronicDiseases || "",
        medicationNote: p.medicationNote || "",
        visionLeft: p.visionLeft || "",
        visionRight: p.visionRight || "",
        wearGlasses: p.wearGlasses || false,
        noteVision: p.noteVision || "",
        hearingLeft: p.hearingLeft || "",
        hearingRight: p.hearingRight || "",
        hearingAid: p.hearingAid || false,
        noteHearing: p.noteHearing || "",
        selectedVaccinations: p.healthVaccination?.map(
          (v) => v.vaccination.id
        ) || [1],
        vaccinationHistory: p.vaccinationHistory || "",
        sideEffect: p.sideEffect || false,
        DetailSideEffect: p.DetailSideEffect || "",
      });
    }
  }, [healthDetail]);

  //State lay du lieu healthDetail
  const openModalWithData = () => {
    setModalIsEditing(false);
    setViewModal(true);
  };

  // FIX 3: Improved modal save function
  const handleModalSave = async () => {
    const updatedFields = {
      ...updateModalForm,
      studentID: healthDetail.data.healthProfile.id,
    };

    console.log("Update fields", updatedFields);

    try {
      await dispatch(fetchUpdateHealth(updatedFields));
      setViewModal(false);
      setModalIsEditing(false);
      // The useEffect above will handle re-fetching and showing success message
    } catch (error) {
      console.error("Update failed:", error);
      // Handle error if needed
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <h1 className="pl-10 pt-5 text-xl font-inria font-medium mb-4">
        <CommonBreadcrumb role={"Parent"} page={"student"} />
      </h1>
      <div className="p-6 flex flex-col flex-1">
        <h1 className="text-3xl font-bold text-blue-600 ml-5">
          STUDENT HEALTH RECORD
        </h1>
        <p className="pt-5 ml-5 text-blue-500 font-medium">
          Declare student health information so the school can provide the best
          care.
        </p>
        <div className="p-6">
          <Card
            title="Select student"
            className="rounded-lg shadow-md border-none"
          >
            <Select
              id="student"
              placeholder="Choose your student"
              className="w-full"
              loading={loading}
              onChange={handleSelectedStudent}
            >
              {student?.map((s) => (
                <Option key={s.id} value={s.id}>
                  {`${s.account?.fullname} - ${s.student_code} (${
                    s.classAssignments?.[0]?.class?.name || "No Class"
                  })`}
                </Option>
              ))}
            </Select>
          </Card>
          {selectedStudent && !showHealthForm && (
            <Card className="rounded-lg shadow-md border-none mb-6">
              {healthExists ? (
                <>
                  <p className="text-green-700 text-base">
                    Health record information available
                  </p>
                  <div className="flex gap-3 mt-3">
                    <Button onClick={openModalWithData}>View detail</Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-red-700 text-base">
                    Chưa có hồ sơ học sinh
                  </p>
                  <Button
                    type="primary"
                    onClick={() => setShowHealthForm(true)}
                    className="mt-3"
                  >
                    Tạo hồ sơ mới
                  </Button>
                </>
              )}
            </Card>
          )}
          {saved && (
            <Alert
              message="Success"
              description="Health record information has been saved successfully"
              type="success"
              showIcon
              icon={<CheckCircleOutlined />}
              className="mt-5 ml-5 mr-5 mb-6 rounded-lg shadow-sm"
            />
          )}
          {showHealthForm && (
            <div className="flex-1 overflow-auto mt-5 ml-5 mr-5 space-y-6">
              {/* General Information Card */}
              <Card
                title="General Information"
                extra="Basic information about student health"
                className="rounded-lg shadow-md border-none"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label
                      htmlFor="height"
                      className="block mb-1 text-base font-medium text-gray-700"
                    >
                      Height (cm)
                    </label>
                    <Input
                      placeholder="Enter your height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="weight"
                      className="block mb-1 text-base font-medium text-gray-700"
                    >
                      Weight (kg)
                    </label>
                    <Input
                      placeholder="Enter your weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="blood-type"
                      className="block mb-1 text-base font-medium text-gray-700"
                    >
                      Blood Type
                    </label>
                    <Select
                      placeholder="Enter your blood type"
                      value={bloodGroup}
                      onChange={setBloodGroup}
                      className="w-full"
                    >
                      <Option value="a">A</Option>
                      <Option value="b">B</Option>
                      <Option value="ab">AB</Option>
                      <Option value="o">O</Option>
                      <Option value="unknown">Unknown</Option>
                    </Select>
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="medical-history"
                    className="block mb-1 text-base font-medium text-gray-700"
                  >
                    Treatment history
                  </label>
                  <TextArea
                    placeholder="Enter information about previously treated diseases"
                    value={treatmentHistory}
                    onChange={(e) => setTreatmentHistory(e.target.value)}
                    rows={4}
                    className="rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="special-notes"
                    className="block mb-1 text-base font-medium text-gray-700"
                  >
                    Notes
                  </label>
                  <TextArea
                    placeholder="Enter special notes about student health"
                    value={additionalNote}
                    onChange={(e) => setAddtionalNote(e.target.value)}
                    rows={4}
                    className="rounded-md"
                  />
                </div>
              </Card>

              {/* Allergies Card */}
              <Card
                title="Allergies Information"
                extra="Declare information about student allergies"
                className="rounded-lg shadow-md border-none"
              >
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Does the student have allergies?
                  </label>
                  <Radio.Group
                    onChange={(e) => setHasAllergy(e.target.value)}
                    value={hasAllergy}
                    className="mt-2"
                  >
                    <Radio
                      value="yes"
                      className="mb-3"
                      style={{ display: "block" }}
                    >
                      Yes
                    </Radio>
                    <Radio value="no" style={{ display: "block" }}>
                      No
                    </Radio>
                  </Radio.Group>
                </div>
                {hasAllergy === "yes" && (
                  <>
                    <div className="mt-4">
                      <label className="block text-base font-medium text-gray-700">
                        Type of allergies
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-2 mt-2 gap-2">
                        {formLoading ? (
                          <p className="text-gray-500">
                            Loading allergy options...
                          </p>
                        ) : (
                          <Checkbox.Group
                            value={allergies}
                            onChange={setAllergies}
                            className="mb-2"
                          >
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                              {allergiesDetail.map((item) => (
                                <Checkbox
                                  key={item.id}
                                  value={item.id}
                                  className="text-gray-800"
                                >
                                  {item.name}
                                </Checkbox>
                              ))}
                            </div>
                          </Checkbox.Group>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="allergy-details"
                        className="block mb-1 text-base font-medium text-gray-700"
                      >
                        Allergy Detail
                      </label>
                      <TextArea
                        placeholder="Detailed description of allergies, including symptoms and severity"
                        value={detailAllergies}
                        onChange={(e) => setDetailAllergies(e.target.value)}
                        rows={4}
                        className="rounded-md"
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="allergy-treatment"
                        className="block mb-1 text-base font-medium text-gray-700"
                      >
                        Allergy Treatment
                      </label>
                      <TextArea
                        placeholder="Describe treatments for allergic reactions"
                        value={methodAllergies}
                        onChange={(e) => setMethodAllergies(e.target.value)}
                        rows={4}
                        className="rounded-md"
                      />
                    </div>
                  </>
                )}
              </Card>

              {/* Chronic Card */}
              <Card
                title="Chronic"
                extra="Declaration of information about students' chronic diseases"
                className="rounded-lg shadow-md border-none"
              >
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Does the student have chronic?
                  </label>
                  <Radio.Group
                    onChange={(e) => setHasChronic(e.target.value)}
                    value={hasChronic}
                    className="mt-2"
                  >
                    <Radio
                      value="yes"
                      className="mb-3"
                      style={{ display: "block" }}
                    >
                      Yes
                    </Radio>
                    <Radio value="no" style={{ display: "block" }}>
                      No
                    </Radio>
                  </Radio.Group>
                </div>
                {hasChronic === "yes" && (
                  <>
                    <div className="mt-4">
                      <label className="block text-base font-medium text-gray-700">
                        Type of chronic
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-2 mt-2 gap-2">
                        {formLoading ? (
                          <p className="text-gray-500">
                            Loading chronic options...
                          </p>
                        ) : (
                          <Checkbox.Group
                            value={chronicDiseases}
                            onChange={setChronicDiseases}
                            className="mb-2"
                          >
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                              {chronicDetail.map((item) => (
                                <Checkbox
                                  key={item.id}
                                  value={item.id}
                                  className="text-gray-800"
                                >
                                  {item.name}
                                </Checkbox>
                              ))}
                            </div>
                          </Checkbox.Group>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="chronic-details"
                        className="block mb-1 text-base font-medium text-gray-700"
                      >
                        Chronic disease details
                      </label>
                      <TextArea
                        placeholder="Detailed description of chronic diseases, including duration and severity"
                        value={detailChronicDiseases}
                        onChange={(e) =>
                          setDetailChronicDiseases(e.target.value)
                        }
                        rows={4}
                        className="rounded-md"
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="chronic-treatment"
                        className="block mb-1 text-base font-medium text-gray-700"
                      >
                        Treatment
                      </label>
                      <TextArea
                        placeholder="Describe current treatments for chronic conditions"
                        value={methodChronicDiseases}
                        onChange={(e) =>
                          setMethodChronicDiseases(e.target.value)
                        }
                        rows={4}
                      />
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="medication"
                        className="block mb-1 text-base font-medium text-gray-700"
                      >
                        Current medications
                      </label>
                      <TextArea
                        placeholder="List current medications, dosages, and frequency"
                        value={medicationNote}
                        onChange={(e) => setMedicationNote(e.target.value)}
                        rows={4}
                        className="rounded-md"
                      />
                    </div>
                  </>
                )}
              </Card>

              {/* Vaccination Card */}
              <Card
                title="Vaccination"
                extra="Declare information about student's vaccination history"
                className="rounded-lg shadow-md border-none"
              >
                <div>
                  <label className="block text-base font-medium text-gray-700">
                    Does the student have vaccination?
                  </label>
                  <Radio.Group
                    onChange={(e) => setHealthVaccination(e.target.value)}
                    value={healthVaccination}
                    className="mt-2"
                  >
                    <Radio
                      value="yes"
                      className="mb-3"
                      style={{ display: "block" }}
                    >
                      Yes
                    </Radio>
                    <Radio value="no" style={{ display: "block" }}>
                      No
                    </Radio>
                  </Radio.Group>
                </div>
                {healthVaccination === "yes" && (
                  <>
                    <div className="mt-4">
                      <label className="block text-base font-medium text-gray-700">
                        Type of vaccination
                      </label>
                      <div className="grid grid-cols-3 md:grid-cols-2 mt-2 gap-2">
                        {formLoading ? (
                          <p className="text-gray-500">
                            Loading vaccination options...
                          </p>
                        ) : (
                          <Checkbox.Group
                            value={selectedVaccinations}
                            onChange={setSelectedVaccinations}
                            className="mb-2"
                          >
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                              {vaccinationList.map((item) => (
                                <Checkbox
                                  key={item.id}
                                  value={item.id}
                                  className="text-gray-800"
                                >
                                  {item.name}
                                </Checkbox>
                              ))}
                            </div>
                          </Checkbox.Group>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="vaccination_history"
                        className="block mb-1 text-base font-medium text-gray-700"
                      >
                        Vaccination history
                      </label>
                      <TextArea
                        placeholder="Enter details of vaccination history, including date of vaccination and post-vaccination reactions (if any)"
                        value={vaccinationHistory}
                        onChange={(e) => setVaccinationHistory(e.target.value)}
                        rows={4}
                        className="rounded-md"
                      />
                    </div>
                    <div className="mt-4">
                      <label className="block text-base font-medium text-gray-700">
                        Does the student have side effects after vaccination?
                      </label>
                      <Radio.Group
                        onChange={(e) => setHadSideEffects(e.target.value)}
                        value={hadSideEffects}
                        className="mt-2"
                      >
                        <Radio
                          value="yes"
                          className="mb-3"
                          style={{ display: "block" }}
                        >
                          Yes
                        </Radio>
                        <Radio value="no" style={{ display: "block" }}>
                          No
                        </Radio>
                      </Radio.Group>
                    </div>
                    {hadSideEffects === "yes" && (
                      <div className="mt-4">
                        <label
                          htmlFor="detail_side_effect"
                          className="block mb-1 text-base font-medium text-gray-700"
                        >
                          Detail side effect
                        </label>
                        <TextArea
                          placeholder="Detailed description of adverse reactions after vaccination (if any)"
                          value={detailSideEffect}
                          onChange={(e) => setDetailSideEffect(e.target.value)}
                          rows={4}
                          className="rounded-md"
                        />
                      </div>
                    )}
                  </>
                )}
              </Card>

              {/* Vision & Hearing Card */}
              <Card
                title="Vision & Hearing"
                extra="Declare information about students' vision and hearing"
                className="rounded-lg shadow-md border-none"
              >
                <div>
                  <label className="block text-lg font-medium text-gray-700">
                    Vision
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
                    <div>
                      <label
                        htmlFor="left-eye"
                        className="block mb-1 text-base font-medium text-gray-700"
                      >
                        Left Eye
                      </label>
                      <Input
                        placeholder="Enter left eye vision (eg 10/10)"
                        value={visionLeft}
                        onChange={(e) => setVisionLeft(e.target.value)}
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="right-eye"
                        className="block mb-1 text-base font-medium text-gray-700"
                      >
                        Right Eye
                      </label>
                      <Input
                        placeholder="Enter right eye vision (eg 10/10)"
                        value={visionRight}
                        onChange={(e) => setVisionRight(e.target.value)}
                        className="rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-base font-medium text-gray-700">
                    Do students wear glasses?
                  </label>
                  <Radio.Group
                    onChange={(e) => setWearGlasses(e.target.value)}
                    value={wearGlasses}
                    className="mt-2"
                  >
                    <Radio
                      value="yes"
                      className="mb-3"
                      style={{ display: "block" }}
                    >
                      Yes
                    </Radio>
                    <Radio value="no" style={{ display: "block" }}>
                      No
                    </Radio>
                  </Radio.Group>
                </div>
                {wearGlasses === "yes" && (
                  <div className="mt-4">
                    <label
                      htmlFor="vision-notes"
                      className="block mb-1 text-base font-medium text-gray-700"
                    >
                      Vision Notes
                    </label>
                    <TextArea
                      placeholder="Enter student vision notes"
                      value={noteVision}
                      onChange={(e) => setNoteVision(e.target.value)}
                      rows={4}
                      className="rounded-md"
                    />
                  </div>
                )}
                <div className="mt-6">
                  <label className="block text-lg font-medium text-gray-700">
                    Hearing
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
                    <div>
                      <label
                        htmlFor="left-ear"
                        className="block mb-1 text-base font-medium text-gray-700"
                      >
                        Left Ear
                      </label>
                      <Select
                        placeholder="Select hearing level"
                        value={hearingLeft}
                        onChange={setHearingLeft}
                        className="w-full"
                      >
                        <Option value="normal">Normal</Option>
                        <Option value="mild">Mild</Option>
                        <Option value="moderate">Moderate</Option>
                        <Option value="severe">Severe</Option>
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="right-ear"
                        className="block mb-1 text-base font-medium text-gray-700"
                      >
                        Right Ear
                      </label>
                      <Select
                        placeholder="Select hearing level"
                        value={hearingRight}
                        onChange={setHearingRight}
                        className="w-full"
                      >
                        <Option value="normal">Normal</Option>
                        <Option value="mild">Mild</Option>
                        <Option value="moderate">Moderate</Option>
                        <Option value="severe">Severe</Option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-base font-medium text-gray-700">
                    Do students use hearing aids?
                  </label>
                  <Radio.Group
                    onChange={(e) => setUseHearingAids(e.target.value)}
                    value={useHearingAids}
                    className="mt-2"
                  >
                    <Radio
                      value="yes"
                      className="mb-3"
                      style={{ display: "block" }}
                    >
                      Yes
                    </Radio>
                    <Radio value="no" style={{ display: "block" }}>
                      No
                    </Radio>
                  </Radio.Group>
                </div>
                {useHearingAids === "yes" && (
                  <div className="mt-4">
                    <label
                      htmlFor="hearing-notes"
                      className="block mb-1 text-base font-medium text-gray-700"
                    >
                      Hearing Notes
                    </label>
                    <TextArea
                      placeholder="Enter student hearing notes"
                      value={noteHearing}
                      onChange={(e) => setNoteHearing(e.target.value)}
                      rows={4}
                      className="rounded-md"
                    />
                  </div>
                )}
              </Card>

              {/* Single Save Button */}
              <div className="text-center mt-8">
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSave}
                  className="w-full md:w-1/3 h-12 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg transform transition-transform hover:scale-105"
                >
                  Save All Information
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="h-[160px] w-full"></div>
      </div>
      <AppFooter />

      {/* Modal xem chi tiết - FIX 4: Improved Modal */}
      <Modal
        title="Health Record Detail"
        open={viewModal}
        onCancel={() => {
          setViewModal(false);
          setModalIsEditing(false);
        }}
        footer={
          modalIsEditing ? (
            <>
              <Button
                onClick={() => setModalIsEditing(false)}
                disabled={updateLoading}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={handleModalSave}
                loading={updateLoading}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setViewModal(false)}>Close</Button>
              <Button type="primary" onClick={() => setModalIsEditing(true)}>
                Update
              </Button>
            </>
          )
        }
        width={800}
      >
        {healthDetail?.data?.healthProfile ? (
          <div className="grid grid-cols-2 gap-4">
            {/* Height */}
            <div>
              <b>Height:</b>
              {modalIsEditing ? (
                <Input
                  value={updateModalForm.height}
                  onChange={(e) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      height: e.target.value,
                    })
                  }
                />
              ) : (
                <span> {updateModalForm.height} cm</span>
              )}
            </div>

            {/* Weight */}
            <div>
              <b>Weight:</b>
              {modalIsEditing ? (
                <Input
                  value={updateModalForm.weight}
                  onChange={(e) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      weight: e.target.value,
                    })
                  }
                />
              ) : (
                <span> {updateModalForm.weight} kg</span>
              )}
            </div>

            {/* Blood Group */}
            <div>
              <b>Blood Group:</b>
              {modalIsEditing ? (
                <Select
                  value={updateModalForm.bloodGroup}
                  onChange={(val) =>
                    setUpdateModalForm({ ...updateModalForm, bloodGroup: val })
                  }
                  className="w-full"
                >
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                  <Option value="AB">AB</Option>
                  <Option value="O">O</Option>
                  <Option value="unknown">Unknown</Option>
                </Select>
              ) : (
                <span> {updateModalForm.bloodGroup}</span>
              )}
            </div>

            {/* Treatment History */}
            <div className="col-span-2">
              <b>Treatment History:</b>
              {modalIsEditing ? (
                <TextArea
                  rows={3}
                  value={updateModalForm.treatmentHistory}
                  onChange={(e) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      treatmentHistory: e.target.value,
                    })
                  }
                />
              ) : (
                <p>{updateModalForm.treatmentHistory}</p>
              )}
            </div>

            {/* Additional Note */}
            <div className="col-span-2">
              <b>Additional Note:</b>
              {modalIsEditing ? (
                <TextArea
                  rows={3}
                  value={updateModalForm.additionalNote}
                  onChange={(e) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      additionalNote: e.target.value,
                    })
                  }
                />
              ) : (
                <p>{updateModalForm.additionalNote}</p>
              )}
            </div>

            {/* Allergies */}
            <div className="col-span-2">
              <b>Has No Allergies:</b>
              {modalIsEditing ? (
                <Radio.Group
                  value={updateModalForm.hasNoAllergies ? "no" : "yes"}
                  onChange={(e) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      hasNoAllergies: e.target.value === "no",
                      selectedAllergyIds:
                        e.target.value === "no"
                          ? []
                          : updateModalForm.selectedAllergyIds,
                      detailAllergies:
                        e.target.value === "no"
                          ? ""
                          : updateModalForm.detailAllergies,
                      methodAllergies:
                        e.target.value === "no"
                          ? ""
                          : updateModalForm.methodAllergies,
                    })
                  }
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              ) : (
                <span>{updateModalForm.hasNoAllergies ? "No" : "Yes"}</span>
              )}
            </div>

            {!updateModalForm.hasNoAllergies && (
              <>
                <div className="col-span-2">
                  <b>Allergies:</b>
                  {modalIsEditing ? (
                    <Checkbox.Group
                      value={updateModalForm.selectedAllergyIds}
                      onChange={(values) =>
                        setUpdateModalForm({
                          ...updateModalForm,
                          selectedAllergyIds:
                            values.length > 0 || updateModalForm.hasNoAllergies
                              ? values
                              : [1],
                        })
                      }
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                        {allergiesDetail.map((item) => (
                          <Checkbox key={item.id} value={item.id}>
                            {item.name}
                          </Checkbox>
                        ))}
                      </div>
                    </Checkbox.Group>
                  ) : (
                    <p>
                      {updateModalForm.selectedAllergyIds
                        .map(
                          (id) =>
                            allergiesDetail.find((item) => item.id === id)
                              ?.name || "Unknown"
                        )
                        .join(", ")}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <b>Allergy Details:</b>
                  {modalIsEditing ? (
                    <TextArea
                      rows={3}
                      value={updateModalForm.detailAllergies}
                      onChange={(e) =>
                        setUpdateModalForm({
                          ...updateModalForm,
                          detailAllergies: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p>{updateModalForm.detailAllergies}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <b>Allergy Methods:</b>
                  {modalIsEditing ? (
                    <TextArea
                      rows={3}
                      value={updateModalForm.methodAllergies}
                      onChange={(e) =>
                        setUpdateModalForm({
                          ...updateModalForm,
                          methodAllergies: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p>{updateModalForm.methodAllergies}</p>
                  )}
                </div>
              </>
            )}

            {/* Chronic Diseases */}
            <div className="col-span-2">
              <b>Has No Chronic Diseases:</b>
              {modalIsEditing ? (
                <Radio.Group
                  value={updateModalForm.hasNochronicDiseases ? "no" : "yes"}
                  onChange={(e) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      hasNochronicDiseases: e.target.value === "no",
                      selectedChronicDiseases:
                        e.target.value === "no"
                          ? []
                          : updateModalForm.selectedChronicDiseases,
                      detailChronicDiseases:
                        e.target.value === "no"
                          ? ""
                          : updateModalForm.detailChronicDiseases,
                      methodChronicDiseases:
                        e.target.value === "no"
                          ? ""
                          : updateModalForm.methodChronicDiseases,
                      medicationNote:
                        e.target.value === "no"
                          ? ""
                          : updateModalForm.medicationNote,
                    })
                  }
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              ) : (
                <span>
                  {updateModalForm.hasNochronicDiseases ? "No" : "Yes"}
                </span>
              )}
            </div>

            {!updateModalForm.hasNochronicDiseases && (
              <>
                <div className="col-span-2">
                  <b>Chronic Diseases:</b>
                  {modalIsEditing ? (
                    <Checkbox.Group
                      value={updateModalForm.selectedChronicDiseases}
                      onChange={(values) =>
                        setUpdateModalForm({
                          ...updateModalForm,
                          selectedChronicDiseases:
                            values.length > 0 ? values : [1],
                        })
                      }
                    >
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                        {chronicDetail.map((item) => (
                          <Checkbox key={item.id} value={item.id}>
                            {item.name}
                          </Checkbox>
                        ))}
                      </div>
                    </Checkbox.Group>
                  ) : (
                    <p>
                      {updateModalForm.selectedChronicDiseases
                        .map(
                          (id) =>
                            chronicDetail.find((item) => item.id === id)
                              ?.name || "Unknown"
                        )
                        .join(", ")}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <b>Chronic Disease Details:</b>
                  {modalIsEditing ? (
                    <TextArea
                      rows={3}
                      value={updateModalForm.detailChronicDiseases}
                      onChange={(e) =>
                        setUpdateModalForm({
                          ...updateModalForm,
                          detailChronicDiseases: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p>{updateModalForm.detailChronicDiseases}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <b>Chronic Disease Methods:</b>
                  {modalIsEditing ? (
                    <TextArea
                      rows={3}
                      value={updateModalForm.methodChronicDiseases}
                      onChange={(e) =>
                        setUpdateModalForm({
                          ...updateModalForm,
                          methodChronicDiseases: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p>{updateModalForm.methodChronicDiseases}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <b>Medication Notes:</b>
                  {modalIsEditing ? (
                    <TextArea
                      rows={3}
                      value={updateModalForm.medicationNote}
                      onChange={(e) =>
                        setUpdateModalForm({
                          ...updateModalForm,
                          medicationNote: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p>{updateModalForm.medicationNote}</p>
                  )}
                </div>
              </>
            )}

            {/* Vision */}
            <div className="col-span-2">
              <b>Vision Left:</b>
              {modalIsEditing ? (
                <Input
                  value={updateModalForm.visionLeft}
                  onChange={(e) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      visionLeft: e.target.value,
                    })
                  }
                />
              ) : (
                <span>{updateModalForm.visionLeft}</span>
              )}
            </div>

            <div className="col-span-2">
              <b>Vision Right:</b>
              {modalIsEditing ? (
                <Input
                  value={updateModalForm.visionRight}
                  onChange={(e) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      visionRight: e.target.value,
                    })
                  }
                />
              ) : (
                <span>{updateModalForm.visionRight}</span>
              )}
            </div>

            <div className="col-span-2">
              <b>Wear Glasses:</b>
              {modalIsEditing ? (
                <Radio.Group
                  value={updateModalForm.wearGlasses ? "yes" : "no"}
                  onChange={(e) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      wearGlasses: e.target.value === "yes",
                      noteVision:
                        e.target.value === "no"
                          ? ""
                          : updateModalForm.noteVision,
                    })
                  }
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              ) : (
                <span>{updateModalForm.wearGlasses ? "Yes" : "No"}</span>
              )}
            </div>

            {updateModalForm.wearGlasses && (
              <div className="col-span-2">
                <b>Vision Notes:</b>
                {modalIsEditing ? (
                  <TextArea
                    rows={3}
                    value={updateModalForm.noteVision}
                    onChange={(e) =>
                      setUpdateModalForm({
                        ...updateModalForm,
                        noteVision: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{updateModalForm.noteVision}</p>
                )}
              </div>
            )}

            {/* Hearing */}
            <div className="col-span-2">
              <b>Hearing Left:</b>
              {modalIsEditing ? (
                <Select
                  value={updateModalForm.hearingLeft}
                  onChange={(val) =>
                    setUpdateModalForm({ ...updateModalForm, hearingLeft: val })
                  }
                  className="w-full"
                >
                  <Option value="normal">Normal</Option>
                  <Option value="mild">Mild</Option>
                  <Option value="moderate">Moderate</Option>
                  <Option value="severe">Severe</Option>
                </Select>
              ) : (
                <span>{updateModalForm.hearingLeft}</span>
              )}
            </div>

            <div className="col-span-2">
              <b>Hearing Right:</b>
              {modalIsEditing ? (
                <Select
                  value={updateModalForm.hearingRight}
                  onChange={(val) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      hearingRight: val,
                    })
                  }
                  className="w-full"
                >
                  <Option value="normal">Normal</Option>
                  <Option value="mild">Mild</Option>
                  <Option value="moderate">Moderate</Option>
                  <Option value="severe">Severe</Option>
                </Select>
              ) : (
                <span>{updateModalForm.hearingRight}</span>
              )}
            </div>

            <div className="col-span-2">
              <b>Use Hearing Aids:</b>
              {modalIsEditing ? (
                <Radio.Group
                  value={updateModalForm.hearingAid ? "yes" : "no"}
                  onChange={(e) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      hearingAid: e.target.value === "yes",
                      noteHearing:
                        e.target.value === "no"
                          ? ""
                          : updateModalForm.noteHearing,
                    })
                  }
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              ) : (
                <span>{updateModalForm.hearingAid ? "Yes" : "No"}</span>
              )}
            </div>

            {updateModalForm.hearingAid && (
              <div className="col-span-2">
                <b>Hearing Notes:</b>
                {modalIsEditing ? (
                  <TextArea
                    rows={3}
                    value={updateModalForm.noteHearing}
                    onChange={(e) =>
                      setUpdateModalForm({
                        ...updateModalForm,
                        noteHearing: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{updateModalForm.noteHearing}</p>
                )}
              </div>
            )}

            {/* Vaccinations */}
            <div className="col-span-2">
              <b>Vaccinations:</b>
              {modalIsEditing ? (
                <Checkbox.Group
                  value={updateModalForm.selectedVaccinations}
                  onChange={(values) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      selectedVaccinations: values.length > 0 ? values : [1],
                    })
                  }
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                    {vaccinationList.map((item) => (
                      <Checkbox key={item.id} value={item.id}>
                        {item.name}
                      </Checkbox>
                    ))}
                  </div>
                </Checkbox.Group>
              ) : (
                <p>
                  {updateModalForm.selectedVaccinations
                    .map(
                      (id) =>
                        vaccinationList.find((item) => item.id === id)?.name ||
                        "Unknown"
                    )
                    .join(", ")}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <b>Vaccination History:</b>
              {modalIsEditing ? (
                <TextArea
                  rows={3}
                  value={updateModalForm.vaccinationHistory}
                  onChange={(e) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      vaccinationHistory: e.target.value,
                    })
                  }
                />
              ) : (
                <p>{updateModalForm.vaccinationHistory}</p>
              )}
            </div>

            <div className="col-span-2">
              <b>Had Side Effects:</b>
              {modalIsEditing ? (
                <Radio.Group
                  value={updateModalForm.sideEffect ? "yes" : "no"}
                  onChange={(e) =>
                    setUpdateModalForm({
                      ...updateModalForm,
                      sideEffect: e.target.value === "yes",
                      DetailSideEffect:
                        e.target.value === "no"
                          ? ""
                          : updateModalForm.DetailSideEffect,
                    })
                  }
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              ) : (
                <span>{updateModalForm.sideEffect ? "Yes" : "No"}</span>
              )}
            </div>

            {updateModalForm.sideEffect && (
              <div className="col-span-2">
                <b>Side Effect Details:</b>
                {modalIsEditing ? (
                  <TextArea
                    rows={3}
                    value={updateModalForm.DetailSideEffect}
                    onChange={(e) =>
                      setUpdateModalForm({
                        ...updateModalForm,
                        DetailSideEffect: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{updateModalForm.DetailSideEffect}</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </Modal>
    </div>
  );
};

export default StudentHealth;
