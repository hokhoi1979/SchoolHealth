import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH__PROFILE, FETCH__PROFILE__SUCCESS, fetchProfile, fetchProfileFail, fetchProfileSuccess } from "./profileSlice";
import axios from "axios";
const URL_API = import.meta.env.VITE_API_URL;

function* profileSaga() {
    try {
        const token = localStorage.getItem("accessToken")
        const response = yield call(axios.get,`${URL_API}/nurse/v1/health?page=1&limit=5&sortBy=createdAt&order=asc`,{
        headers: {
          Authorization: `${token}`, 
          "Content-Type": "application/json",     
        },
      });
        
        if(response.status === 200 || response.status === 201){
            yield put(fetchProfileSuccess(response.data.result))
        }
        else{
            yield put(fetchProfileFail(`API Error: ${response.status}`))
        }
        
    } catch (error) {
          yield put(fetchProfileFail(`API Error: ${error}`))
    }
}

function* watchFetchProfile () {
    yield takeLatest(FETCH__PROFILE, profileSaga)
}

export default watchFetchProfile;