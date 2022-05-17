# Redux Tutorial

## 1. Introduction to Redux

### 1.1 What is Redux & why Redux?

- A small JS Library
- for managing medium/large amount of states globally
  in your app.
- useContext + useReducer Hook ideas will help you to understand redux.

### 1.2 Some common terms related to redux

- React-redux: redux is used with some common packages such as react-redux
- redux-toolkit : recommended way to write redux logic for building redux app easily and avoiding mistakes.
- redux devtools extension: helps to debug redux app easily.

### 1.3 how redux works?

- define state.
- dispatch an Action.
- Reducer update state based on Action Type.
- store will update the view

<img width="745" alt="Screenshot 2022-05-17 at 19 37 57" src="https://user-images.githubusercontent.com/28184926/168863620-b2ffa708-8c0b-4b90-b81d-45212248b055.png">

## 2. redux core concept

- State: consider what states you want to manage

  ```js
  // define states
  count: 0;
  const initialState = { count: 0 };
  const initialState2 = { users: [{ name: "anisul islam" }] };
  ```

- Action: actions are object that have 2 things- type & payload

  ```js
  // define constants
  const INCREMENT = "INCREMENT";
  const DECREMENT = "DECREMENT";
  const ADD_USER = "ADD_USER";

  // dispatch(Action)
  {
    type: INCREMENT,
  }
  {
    type: DECREMENT,
  }
  {
    type: ADD_USER,
    payload: {
      name: "rafiqul islam",
    }
  }
  ```
