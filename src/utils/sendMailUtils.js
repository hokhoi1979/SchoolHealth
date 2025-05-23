import { call } from "redux-saga/effects";
import { sendMail } from "@/apis/index.js";

async function sendEmail(mail, msg) {
  try {
    const res = await sendMail({ email: mail, message: msg });
    return res;
  } catch (error) {
    console.error("sendEmail error:", error);
    throw error;
  }
}

export default sendEmail;
