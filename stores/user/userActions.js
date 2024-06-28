import axios from "axios";
import { api_url } from "../../config";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const ERROR_LOGIN = "ERROR_LOGIN";
export const NULL_THE_ERROR = "NULL_THE_ERROR";

export const getAllUser = () => async (dispatch) => {
  const response = await axios.get(`${api_url}`);
  if (response.data.status === 200) {
    dispatch({
      type: GET_ALL_USERS,
      payload: [{ name: "Ahemd", id: 1 }],
    });
  }
};

// export const createUser = (user) => async (dispatch) => {
//   try {
//     const response = await axios.post(`${api_url}/user/create`, user);

//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// };

export const userLogin = (user) => async (dispatch) => {
  try {
    const response = await axios.post(`${api_url}/user/login`, user);
    console.log("RESPONSE IN LOGIN",response)
    if (response.data.status === 200) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response?.data?.user?.token}`;
      dispatch({ type: USER_LOGIN, payload: response.data.user });
    } else {
      dispatch({ type: ERROR_LOGIN, payload: { error: response.data } });
    }
  } catch (err) {
    dispatch({ type: ERROR_LOGIN, payload: { error: err } });
  }
};

export const userLogOut = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT, payload: [] });
};
export const exptyingError = () => (dispatch) => {
  dispatch({ type: NULL_THE_ERROR})
}