const { createStore } = require("redux");

// defining constants
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// state
const initialCounterState = {
  count: 0,
};

// action - Object- type, payload
const incrementCounter = () => {
  return {
    type: INCREMENT,
  };
};

const decrementCounter = () => {
  return {
    type: DECREMENT,
  };
};

// create reducer for counter
const counterReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      state;
  }
};

// 1. state
// 2. dispatch action
// 3. reducer
// 4. store - getState(), dispatch(), subscribe()

// create store
const store = createStore(counterReducer);

store.subscribe(() => {
  console.log(store.getState());
});

// dispatch action
store.dispatch(incrementCounter());
store.dispatch(incrementCounter());
store.dispatch(incrementCounter());
store.dispatch(decrementCounter());
