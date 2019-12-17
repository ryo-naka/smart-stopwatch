// Actions
const TOGGLE_TIMER = 'TOGGLE_TIMER'
const RESET_TIMER = 'RESET_TIMER'

const initialState = {
  timerStart: false,
  totalDuration: 0,
  timerReset: false,
  notifTimes: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TIMER:
      return Object.assign({},
        state,
        {
          timerStart: !state.timerStart,
          timerReset: false,
        }
      );
    case RESET_TIMER:
      return Object.assign({},
        state,
        {
          timerStart: false,
          timerReset: true,
        }
      );
    default:
      return state;
  }
};

export default reducer;

// Action Creators
export const toggleTimer = () => {
  return {
    type: TOGGLE_TIMER
  };
};

export const resetTimer = () => {
  return {
    type: RESET_TIMER
  };
};
