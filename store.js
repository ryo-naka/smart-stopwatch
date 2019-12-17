import { combineReducers, createStore } from "redux";
import stopwatch from './modules/stopwatch';
import timer from './modules/timer';
import timePicker from './modules/timePicker';

rootReducer = combineReducers({
  stopwatch,
  timer,
  timePicker
});

export default createStore(rootReducer);
