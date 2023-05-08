import { server } from './store';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });
    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      }
    );
    // console.log(data);
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });
    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    // console.log(data);
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: 'loadUserRequest' });
    const { data } = await axios.get(`${server}/me`, {
      withCredentials: true,
    });
    // console.log(data);
    dispatch({ type: 'loadUserSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.response.data.message });
  }
};
