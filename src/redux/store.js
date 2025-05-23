import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "@/redux/rootReducer";
import rootSaga from "@/redux/rootSaga";
import { jwtDecode } from "jwt-decode";
import { fetchSuccess } from "./auth/authSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

const storeToken= localStorage.getItem("accessToken");
if(storeToken){
    const decode=jwtDecode(storeToken);
    store.dispatch(fetchSuccess({user:decode, token:storeToken}))
}

export default store;