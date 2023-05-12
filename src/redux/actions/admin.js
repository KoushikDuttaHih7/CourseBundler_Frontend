import { server } from '../store';
import axios from 'axios';

export const createCourse = formData => async dispatch => {
  try {
    dispatch({ type: 'createCourseRequest ' });

    const { data } = await axios.post(`${server}/createcourse`, formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({
      type: 'createCourseSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'createCourseFail',
      payload: error.response.data.message,
    });
  }
};

export const deleteCourse = id => async dispatch => {
  try {
    dispatch({ type: 'deleteCourseRequest ' });

    const { data } = await axios.delete(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: 'deleteCourseSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'deleteCourseFail',
      payload: error.response.data.message,
    });
  }
};
