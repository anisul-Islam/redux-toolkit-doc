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

- Reducer: reducers are pure function which handles all logic. it updates the state depends on action type

  ```js
  // crate reducer
  const counterReducer = (state = initialState, action) => {
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
        return state;
    }
  };
  ```

- Store: It holds the states. It has 3 important methods- getState(), dispatch(), suscribe()

  ```js
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
  ```

## 3. Complete Counter App

- example of counter app

  ```js
  const { createStore } = require("redux");

  const INCREMENT = "INCREMENT";
  const DECREMENT = "DECREMENT";
  const RESET = "RESET";

  const initialCounterState = {
    count: 0,
  };

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
  const resetCounter = () => {
    return {
      type: RESET,
    };
  };

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
      case RESET:
        return {
          ...state,
          count: 0,
        };

      default:
        state;
    }
  };

  const store = createStore(counterReducer);

  store.subscribe(() => {
    console.log(store.getState());
  });

  store.dispatch(incrementCounter());
  store.dispatch(incrementCounter());
  store.dispatch(decrementCounter());
  store.dispatch(resetCounter());
  ```

## 4. payload in action

- example

  ```js
  const { createStore } = require("redux");

  const GET_PRODUCTS = "GET_PRODUCTS";
  const ADD_PRODUCTS = "ADD_PRODUCTS";

  const initialProductState = {
    products: ["sugar", "salt"],
    numberOfProducts: 2,
  };

  const getProductAction = () => {
    return {
      type: GET_PRODUCTS,
    };
  };
  const addProductAction = (product) => {
    return {
      type: ADD_PRODUCTS,
      payload: product,
    };
  };

  const productsReducer = (state = initialProductState, action) => {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state,
        };
      case ADD_PRODUCTS:
        return {
          products: [...state.products, action.payload],
          numberOfProducts: state.numberOfProducts + 1,
        };

      default:
        return state;
    }
  };

  const store = createStore(productsReducer);

  store.subscribe(() => {
    console.log(store.getState());
  });

  store.dispatch(getProductAction());
  store.dispatch(addProductAction("pen"));
  store.dispatch(addProductAction("pencil"));
  ```

## 5. Multiple reducers & combine multiple reducers

- example

  ```js
  const { createStore, combineReducers } = require("redux");

  // product constants
  const GET_PRODUCTS = "GET_PRODUCTS";
  const ADD_PRODUCTS = "ADD_PRODUCTS";

  // cart constants
  const GET_CART_ITEMS = "GET_CART_ITEMS";
  const ADD_CART_ITEMS = "ADD_CART_ITEMS";

  // product states
  const initialProductState = {
    products: ["sugar", "salt"],
    numberOfProducts: 2,
  };

  // cart states
  const initialCartState = {
    cart: ["sugar"],
    numberOfProducts: 1,
  };

  // product actions
  const getProductAction = () => {
    return {
      type: GET_PRODUCTS,
    };
  };
  const addProductAction = (product) => {
    return {
      type: ADD_PRODUCTS,
      payload: product,
    };
  };

  // cart actions
  const getCartAction = () => {
    return {
      type: GET_CART_ITEMS,
    };
  };
  const addCartAction = (product) => {
    return {
      type: ADD_CART_ITEMS,
      payload: product,
    };
  };

  const productsReducer = (state = initialProductState, action) => {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state,
        };
      case ADD_PRODUCTS:
        return {
          products: [...state.products, action.payload],
          numberOfProducts: state.numberOfProducts + 1,
        };

      default:
        return state;
    }
  };

  const cartReducer = (state = initialCartState, action) => {
    switch (action.type) {
      case GET_CART_ITEMS:
        return {
          ...state,
        };
      case ADD_CART_ITEMS:
        return {
          cart: [...state.cart, action.payload],
          numberOfProducts: state.numberOfProducts + 1,
        };

      default:
        return state;
    }
  };

  const rootReduer = combineReducers({
    productR: productsReducer,
    cartR: cartReducer,
  });

  const store = createStore(rootReduer);

  store.subscribe(() => {
    console.log(store.getState());
  });

  store.dispatch(getProductAction());
  store.dispatch(addProductAction("pen"));
  store.dispatch(getCartAction());
  store.dispatch(addCartAction("salt"));
  ```

## 6. Middleware

- for extra features, middlepoint of dispatching an action and handledby reducer, performing async tasks, login etc.
- Example of popular redux middlewares packages: redux-logger, redux-thunk
- `npm install redux-logger`
- example

  ```js
  const { createStore, combineReducers, applyMiddleware } = require("redux");
  const { default: logger } = require("redux-logger");

  // product constants
  const GET_PRODUCTS = "GET_PRODUCTS";
  const ADD_PRODUCTS = "ADD_PRODUCTS";

  // product states
  const initialProductState = {
    products: ["sugar", "salt"],
    numberOfProducts: 2,
  };

  // product actions
  const getProductAction = () => {
    return {
      type: GET_PRODUCTS,
    };
  };
  const addProductAction = (product) => {
    return {
      type: ADD_PRODUCTS,
      payload: product,
    };
  };

  const productsReducer = (state = initialProductState, action) => {
    switch (action.type) {
      case GET_PRODUCTS:
        return {
          ...state,
        };
      case ADD_PRODUCTS:
        return {
          products: [...state.products, action.payload],
          numberOfProducts: state.numberOfProducts + 1,
        };

      default:
        return state;
    }
  };

  const store = createStore(productsReducer, applyMiddleware(logger));

  store.subscribe(() => {
    console.log(store.getState());
  });

  store.dispatch(getProductAction());
  store.dispatch(addProductAction("pen"));
  ```
