import React from "react";
import Navbar from "./Navbar";
import Content from "./Content";
import { AppFooter } from "../../components/Footer/AppFooter";
const New = () => {
  return (
    <div className="">
      <div className="">
        <Navbar />
      </div>
      <div>
        <Content />
      </div>
      <AppFooter />
    </div>
  );
};
export default New;
