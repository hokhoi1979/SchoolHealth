export const FETCH__PROFILE__DETAIL="FETCH__PROFILE__DETAIL";
export const FETCH__PROFILE__DETAIL__SUCCESS="FETCH__PROFILE__DETAIL__SUCCESS";
export const FETCH__PROFILE__DETAIL__FAIL="FETCH__PROFILE__DETAIL__FAIL";

export const fetchProfileDetail =(data) =>({
    type:FETCH__PROFILE__DETAIL,
    payload:data
})

export const fetchProfileDetailSuccess =(data) =>({
    type:FETCH__PROFILE__DETAIL__SUCCESS,
    payload:data
})

export const fetchProfileDetailFail =(error) =>({
    type:FETCH__PROFILE__DETAIL__FAIL,
    payload:error
})

const initialState = {
    profileStudent:[],
    loading:false,
    error:null,
}

const profileDetailReducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH__PROFILE__DETAIL:
            return {...state, loading:true, error:null};
        case FETCH__PROFILE__DETAIL__SUCCESS:
            return {...state, loading:false, profileStudent:action.payload};
        case FETCH__PROFILE__DETAIL__FAIL:
            return {...state, loading:false, error:action.payload};
        default:
            return state;
    }
}

export default profileDetailReducer;