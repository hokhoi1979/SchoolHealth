export const FETCH__PROFILE = "FETCH_PROFILE";
export const FETCH__PROFILE__SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH__PROFILE__FAIL = "FETCH_PROFILE_FAIL";

export const fetchProfile = (data) => ({
    type: FETCH__PROFILE,
    payload: data
})

export const fetchProfileSuccess = (data) => ({
    type: FETCH__PROFILE__SUCCESS,
    payload: data
})

export const fetchProfileFail = (data) => ({
    type: FETCH__PROFILE__FAIL,
    payload: data
})

const initialState = {
    parent: [],
    loading: false,
    error: null,
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH__PROFILE :
            return {...state, loading: true, error: null};
        case FETCH__PROFILE__SUCCESS :
            return {...state, loading: false, student: action.payload};
        case FETCH__PROFILE__FAIL :
            return {...state, loading: false, error:action.payload};
        default:
            return state; 
    }
}
export default profileReducer;