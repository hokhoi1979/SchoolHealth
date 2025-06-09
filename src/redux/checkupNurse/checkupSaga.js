import axios from "axios";

import { takeLatest } from "redux-saga/effects";
import { FETCH__CHECKUP, fetchCheckupFail, fetchCheckupSuccess } from "./checkupSlice";

const URL_API=import.meta.env.VITE_API_URL;

function* checkupSaga(){
    try {
        const token = localStorage.getItem("accessToken");
        const response = yield call(axios.get,`${URL_API}/`,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        });

        if(response.status === 200 || response.status === 201){
            yield put(fetchCheckupSuccess(response.data))
        }
        else{
            yield put(fetchCheckupFail(response.status))
        }
    } catch (error) {
        yield put(fetchCheckupFail(error))
    }
}

function* watchFetchCheckup (){
    yield takeLatest(FETCH__CHECKUP, checkupSaga)
}

export default watchFetchCheckup;