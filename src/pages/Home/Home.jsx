import { Header } from "../../components/Header/Header";

import hand from "../../img/hand.jpg";
import nenbs from "../../img/nenbs.jpg";
import nurse from "../../img/nurse.png";
import school from "../../img/school.png";
import health from "../../img/health.png";
import dungcu from "../../img/dungcu.png";
import tainghe from "../../img/tainghe.png";
import tainghe2 from "../../img/tainghe2.png";
import thuoc from "../../img/thuoc.png";
import bs3 from "../../img/bs3.png";
import certificate from "../../img/certificate.png";
import team from "../../img/team.png";
import medicine from "../../img/medicine.png";
import bs from "../../img/bs.png";
import { AppFooter } from "../../components/Footer/AppFooter";
import newspic from "../../img/newspic.jpg";
import { Button } from "antd";

function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col flex-1">
          <div className="container w-full h-[100px] mt-20 mb-4">
            <div className="flex justify-between gap-6">
              <div className="flex gap-6 p-6 w-1/2">
                <div className="text-gray-300 font-bold text-7xl opacity-50 pt-[80px]">
                  <p>01</p>
                </div>
                <div className="flex flex-col gap-6 pt-[90px]">
                  <p className="text-[40px]">Welcome to School Health Care</p>
                  <p className="text-[20px]">
                    We provide health care services for students at school,
                    allowing parents to easily send medication and health
                    information for their children to the school. Our healthcare
                    staff will ensure that students receive the correct
                    medication and timely treatment, ensuring their health
                    throughout their learning journey.
                  </p>
                </div>
              </div>
              <div className="w-1/2">
                <img className=" rounded-xl" src={hand} alt="" />
              </div>
            </div>

            <div className="relative mt-10 w-full h-[500px] rounded-xl">
              <img
                src={nenbs}
                alt="background"
                className="w-full h-full object-cover rounded-3xl p-3"
              />
              <div
                className="absolute top-20 left-10 bg-[#F6F6F6] bg-opacity-90 rounded-lg p-6 flex flex-col gap-4 ml-12"
                style={{ width: "500px", height: "300px" }}
              >
                <p className="text-black text-center text-[30px] font-bold">
                  Few words about School Health
                </p>
                <div className="flex gap-6 text-black text-2xl pl-[50px]">
                  <img
                    src={school}
                    alt="School icon"
                    className="w-[100px] h-[100px]"
                  />
                  <img
                    src={nurse}
                    alt="Nurse icon"
                    className="w-[100px] h-[100px] "
                  />
                  <img
                    src={health}
                    alt="Health icon"
                    className="w-[100px] h-[100px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-6 pt-[90px]">
              <div className="text-gray-300 font-bold text-7xl opacity-50 p-[10px]">
                <p>02</p>
              </div>
              <div>
                <p className="text-[40px] font-bold text-center mb-[0px]">
                  Safe Schools Start with Essentials
                </p>
                <p className="text-[20px] w-[900px] mt-[30px]">
                  We specialize in providing standardized medical supplies and
                  essential medications for schools, from kindergarten to high
                  school. Our products include first aid materials, essential
                  medicines, basic medical equipment, and school first aid kits.
                  All items are sourced from certified suppliers and comply with
                  Ministry of Health regulations, supporting schools in creating
                  a safe learning environment and effectively caring for
                  students’ health.
                </p>
              </div>
            </div>

            <div className="flex justify-normal mt-[70px]">
              <div>
                <img src={tainghe} alt="" />
              </div>
              <div>
                <img src={dungcu} alt="" />
              </div>
              <div>
                <img src={tainghe2} alt="" />
              </div>
              <div>
                <img src={thuoc} alt="" />
              </div>
            </div>

            <div className="flex justify-between gap-6 mt-[30px] pl-6">
              <div className="flex gap-6 w-1/2">
                <div className="text-gray-300 font-bold text-7xl opacity-50 pt-[80px]">
                  <p>03</p>
                </div>
                <div className="flex flex-col gap-6 pt-[90px]">
                  <p className="text-[40px] text-center font-bold">
                    Why choose us?
                  </p>
                  <p className="text-[20px]">
                    We care beyond the classroom. With certified supplies,
                    trained medical staff, and a fully equipped health room, we
                    ensure every student’s well-being is in safe hands — every
                    day.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-10 w-full h-[500px] ">
              <img
                src={bs3}
                alt="background"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute top-40 left-10 bg-[#F6F6F6] bg-opacity-90 rounded-lg p-6 flex flex-col gap-10"
                style={{ width: "850px", height: "300px" }}
              >
                <p className="text-black text-center text-[30px] font-bold ">
                  Few words about us
                </p>
                <div className="flex justify-normal gap-[100px] text-black text-2xl pl-[50px]">
                  <div className="flex flex-col items-center">
                    {" "}
                    <img src={team} alt="" className="w-[100px] h-[100px]  " />
                    <p className="font-serif mt-2 text-center  whitespace-nowrap">
                      Attentive Care
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <img
                      src={medicine}
                      alt=""
                      className="w-[100px] h-[100px]"
                    />
                    <p className="font-serif mt-2 text-center  whitespace-nowrap">
                      Qualified Medical Staff
                    </p>
                  </div>

                  <div>
                    <img
                      src={certificate}
                      alt=""
                      className=" w-[100px] h-[100px]  "
                    />
                    <p className="font-serif ml-[-20px]">Attentive Care</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 p-10 mb-17 ">
              <div className="">
                <div className="">
                  <div className="h-[250px] flex flex-col gap-[6px]">
                    {" "}
                    <div className="text-gray-300 font-bold text-7xl opacity-50 pt-[80px]">
                      <p>04</p>
                    </div>
                    <div>
                      <p className="text-[40px] mb-5">
                        School Health: A Global Connection
                      </p>
                      <p className="text-[20px] pb-10">
                        We provide health care services for students at school,
                        allowing parents to easily send medication and health
                        information for their children to the school. Our
                        healthcare staff will ensure that students receive the
                        correct medication and timely treatment, ensuring their
                        health throughout their learning journey.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" ml-10 mb-10">
                <img src={newspic} alt="" className=" rounded-2xl" />
              </div>
     
            </div>

            <AppFooter />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
