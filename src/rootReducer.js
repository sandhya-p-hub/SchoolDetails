import {combineReducers} from 'redux';
import user from "./Reducer/user";
import schools from "./Reducer/schools"
import schoolArea from "./Reducer/schoolArea"
import InstituteArea from './Reducer/InstituteArea';
import Institute from './Reducer/Institute';
import chartData from './Reducer/chartData';

export default combineReducers({
user,
schools,
schoolArea,
Institute,
InstituteArea,
chartData
});
