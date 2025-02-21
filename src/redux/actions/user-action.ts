// authActions.js
import {
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FALIURE,
    USER_PROFILE_UPDATE,
    LOGOUT,
  } from "../constants/user-constant";
  
  export const loginSuccess = (user) => ({
    type: USER_SIGNIN_SUCCESS,
    payload: { user },
  });
  
  export const updateSuccess = (user) => ({
    type: USER_PROFILE_UPDATE,
    payload: { user },
  });
  
  export const loginFailure = (error) => ({
    type: USER_SIGNIN_FALIURE,
    payload: { error },
  });
  
  export const logout = () => ({
    type: LOGOUT,
  });
  