// Actions
const ON_VALUE_CHANGE = 'ON_VALUE_CHANGE'

const initialState = {
  selectedHour: '0',
  selectedMinute: '00',
  selectedSecond: '00',
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_VALUE_CHANGE:
      return Object.assign({},
        state,
        {
          selectedHour: action.selectedHour,
          selectedMinute: action.selectedMinute,
          selectedSecond: action.selectedSecond,
        }
      );
    default:
      return state;
  }
};

export default reducer;

// Action Creators
export const onValueChange = (selectedHour, selectedMinute, selectedSecond) => {
  return {
    type: ON_VALUE_CHANGE,
    selectedHour,
    selectedMinute,
    selectedSecond
  };
};
