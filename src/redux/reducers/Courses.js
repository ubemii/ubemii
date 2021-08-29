import {SET_SUBSCRIBED_CATEGORIES, SET_SUBSCRIBED_COURSES, SET_SUBSCRIBED_INSTRUCTORS} from "../constants/Courses";

const initState = {
  courses: [],
  instructors: [],
  categories: []
}

const Courses = (state = initState, action) => {
  switch (action.type) {
    case SET_SUBSCRIBED_COURSES: {
      return {
        ...state,
        courses: action.payload
      }
    }
    case SET_SUBSCRIBED_INSTRUCTORS: {
      return {
        ...state,
        instructors: action.payload
      }
    }
    case SET_SUBSCRIBED_CATEGORIES: {
      return {
        ...state,
        categories: action.payload
      }
    }
    default:
      return state;
  }
}

export default Courses
