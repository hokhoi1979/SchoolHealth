import { call, put, takeLatest } from "redux-saga/effects";
import { UPDATE__RESULT__VACCINE, updateVaccineResultFail, updateVaccineResultSuccess } from "./updateResultSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL;
function* updateVaccineSaga ({IdVaccine, bodyVaccine}){
    try {
        const token = localStorage.getItem("accessToken");
        const id = IdVaccine;
        const body =bodyVaccine;
        const response = yield call(axios.post,`${URL_API}/nurse/v1/${id}/result`,body,
            {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
            }
        )
        if(response.status === 200 || response.status === 201){
            yield put(updateVaccineResultSuccess(response.data))
        }
        else{
             yield put(updateVaccineResultFail(response.status))
        }
    } catch (error) {
        yield put(updateVaccineResultFail(error?.response?.data?.message || error.message || "Unknown error"))
        console.log("Chưa đến thời gian tiêm chủng, không thể ghi nhận kết quả.")
    }
}

function* watchUpdateVaccineResult (){
    yield takeLatest(UPDATE__RESULT__VACCINE, updateVaccineSaga);
}

export default watchUpdateVaccineResult;