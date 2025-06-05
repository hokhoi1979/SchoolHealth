import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH__VACCINE, fetchVaccineFail, fetchVaccineSuccess } from "./vaccineSlice";

const URL_API=import.meta.env.VITE_API_URL;

function* vaccineSaga () {
    try {
        const token = localStorage.getItem("accessToken");
        const response = yield call(axios.get,`${URL_API}/nurse/v1/vaccinationEvent`,{
        headers: {
          Authorization: `${token}`, 
          "Content-Type": "application/json",     
        }})
                    
        if(response.status === 200 || response.status === 201){
            console.log("KHOI",response.data)
            yield put(fetchVaccineSuccess(response.data))
        }
        else{
             yield put(fetchVaccineFail(`API Error: ${response.status}`))
        }
    } catch (error) {
            yield put(fetchVaccineFail(`API Error: ${error}`))
    }
}

function* watchFetchVaccine() {
    yield takeLatest(FETCH__VACCINE, vaccineSaga);
}

export default watchFetchVaccine;