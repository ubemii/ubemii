import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import Courses from "./Courses";

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    courses: Courses
});

export default reducers;
