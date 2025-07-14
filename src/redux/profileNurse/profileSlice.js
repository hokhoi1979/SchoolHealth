export const FETCH__PROFILE="FETCH__PROFILE";
export const FETCH__PROFILE__SUCCESS="FETCH__PROFILE__SUCCESS";
export const FETCH__PROFILE__FAIL="FETCH__PROFILE__FAIL";

export const fetchProfile = (data) =>({
    type:FETCH__PROFILE,
    payload:data
})

export const fetchProfileSuccess = (data) =>({
    type:FETCH__PROFILE__SUCCESS,
    payload:data
})

export const fetchProfileFail = (error) =>({
    type:FETCH__PROFILE__FAIL,
    payload:error
})

const initialState = {
    student:[],
    loading:false,
    error:null,
}

const profileReducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH__PROFILE :
            return{...state, loading:true, error:null};
        case FETCH__PROFILE__SUCCESS:
            return { ...state, loading:false, student:action.payload};
        case FETCH__PROFILE__FAIL:
            return { ...state, loading:false, error:action.payload};
        default:
            return state;
    }
}

export default profileReducer;