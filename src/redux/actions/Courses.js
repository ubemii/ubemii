import {SET_SUBSCRIBED_CATEGORIES, SET_SUBSCRIBED_COURSES, SET_SUBSCRIBED_INSTRUCTORS} from "../constants/Courses";
import store from "../store";

export const setSubscribedCourses = (courses) => {
  return store.dispatch({
    type: SET_SUBSCRIBED_COURSES,
    payload: courses
  });
};

export const setSubscribedInstructors = (instructors) => {
  return store.dispatch({
    type: SET_SUBSCRIBED_INSTRUCTORS,
    payload: instructors
  });
};

export const setSubscribedCategories = (categories) => {
  return store.dispatch({
    type: SET_SUBSCRIBED_CATEGORIES,
    payload: categories
  });
};
