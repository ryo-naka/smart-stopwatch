import { getMsecs } from '../utils';

// Actions
const TOGGLE_STOPWATCH = 'TOGGLE_STOPWATCH'
const RESET_STOPWATCH = 'RESET_STOPWATCH'
const ADD_NOTIF_TIMES = 'ADD_NOTIF_TIMES'
const NOTIFY = 'NOTIFY'

const initialState = {
  stopwatchStart: false,
  stopwatchReset: false,
  notifTimes: {
    interval: [],
    custom: []
  },
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_STOPWATCH:
      return Object.assign({},
        state,
        {
          stopwatchStart: !state.stopwatchStart,
          stopwatchReset: false,
        }
      );
    case RESET_STOPWATCH:
      return Object.assign({},
        state,
        {
          stopwatchStart: false,
          stopwatchReset: true,
        }
      );
    case ADD_NOTIF_TIMES:
      return Object.assign({},
        state,
        {
          notifTimes: {
            custom: [
              ...state.notifTimes.custom,
              {
                time: getMsecs(action.selectedHour, action.selectedMinute, action.selectedSecond),
                notified: false
              }
            ]
          }
        }
      );
    case NOTIFY:
      console.log(action.time);
      console.log(state);
      return Object.assign({},
        state,
        {
          notifTimes: {
            custom: state.notifTimes.custom.map(notifTime => (
              notifTime.time == action.time ? { ...notifTime, notified: true } : notifTime
            ))
          }
        }
      );
    default:
      return state;
  }
};

export default reducer;

// Action Creators
export const toggleStopwatch = () => {
  return {
    type: TOGGLE_STOPWATCH
  };
};

export const resetStopwatch = () => {
  return {
    type: RESET_STOPWATCH
  };
};

export const addNotifTimes = (selectedHour, selectedMinute, selectedSecond) => {
  return {
    type: ADD_NOTIF_TIMES,
    selectedHour,
    selectedMinute,
    selectedSecond
  };
};

export const notify = time => {
  return {
    type: NOTIFY,
    time
  };
}
