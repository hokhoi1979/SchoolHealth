import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH__VACCINE__STUDENT, fetchVaccineStudentFail, fetchVaccineStudentSucess } from "./vaccineByIdSlice";
import axios from "axios";

const URL_API = import.meta.env.VITE_API_URL || "http://localhost:8000/api";


function* vaccineStudentSaga (action){
    try {
        const token = localStorage.getItem("accessToken");
        const id = action.payload;
        const response = yield call(axios.get, `${URL_API}/nurse/v1/vaccinationEvent/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        });

        if(response.status === 200 || response.status === 201){
            console.log(response.data); 

            yield put(fetchVaccineStudentSucess(response.data))
        }
        else{
            yield put(fetchVaccineStudentFail(response.status))
        }
    } catch (error) {
        yield put(fetchVaccineStudentFail(error))
    }
}

function* watchFetchVaccineStudent (){
    yield takeLatest(FETCH__VACCINE__STUDENT, vaccineStudentSaga);
}

export default watchFetchVaccineStudent;