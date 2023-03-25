<h1 class="heading1"> Redux-ReduxToolkit Tutorial </h1>
video playlist link here: https://youtube.com/playlist?list=PLgH5QX0i9K3pe7Z7ATcyLdUW3grE4Vfld

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

## 7. API Calling - async actions using redux-thunk

- example

  ```js
  // async actions - api calling
  // api url - https://jsonplaceholder.typicode.com/todos
  // middleware- redux-thunk
  // axios api

  const { default: axios } = require("axios");
  const { createStore, applyMiddleware } = require("redux");
  const reduxThunk = require("redux-thunk").default;

  // define constants
  const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
  const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
  const GET_TODOS_FAILED = "GET_TODOS_FAILED";
  const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

  // define state
  const initialTodosState = {
    todos: [],
    isLoading: false,
    error: null,
  };

  const getTodosRequest = () => {
    return {
      type: GET_TODOS_REQUEST,
    };
  };

  const getTodosSuccess = (todos) => {
    return {
      type: GET_TODOS_SUCCESS,
      payload: todos,
    };
  };
  const getTodosFailed = (error) => {
    return {
      type: GET_TODOS_FAILED,
      payload: error,
    };
  };

  const todosReducer = (state = initialTodosState, action) => {
    switch (action.type) {
      case GET_TODOS_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case GET_TODOS_SUCCESS:
        return {
          ...state,
          todos: action.payload,
          isLoading: false,
        };
      case GET_TODOS_FAILED:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };

      default:
        state;
    }
  };

  // async action creator
  // thunk-middleware allows us to return a function isntead of obejct
  const fetchData = () => {
    return (dispatch) => {
      dispatch(getTodosRequest());
      axios
        .get(TODOS_URL)
        .then((res) => {
          const todos = res.data;
          const titles = todos.map((todo) => todo.title);
          dispatch(getTodosSuccess(titles));
        })
        .catch((err) => {
          const error = err.message;
          dispatch(getTodosFailed(error));
        });
    };
  };

  const store = createStore(todosReducer, applyMiddleware(reduxThunk));

  store.subscribe(() => {
    console.log(store.getState());
  });

  store.dispatch(fetchData());
  ```

  ## 8. React-redux counter example

  - install redux and react-redux package
  - we will make a counter app; first we will build with state and then we will do this with react-redux. example

    ```js
    // App.js
    import React, { useState } from "react";

    // state - count:0
    // action - increment, decrement, reset
    /*
       reducer - handle logic for state update
        count => count + 1
        count => count - 1
        count => 0
       */

    const App = () => {
      const [count, setCount] = useState(0);

      const handleIncrement = () => {
        setCount((count) => count + 1);
      };

      const handleReset = () => {
        setCount(0);
      };

      const handleDecrement = () => {
        setCount((count) => count - 1);
      };

      return (
        <div>
          <h1>React Redux Example</h1>
          <h2>Count : {count}</h2>
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleDecrement}>Decrement</button>
        </div>
      );
    };

    export default App;
    ```

- now we will make the same counter app using react-redux

  ```js
    // step 1: create constants
    //services/constants/counterConstants.js
      export const INCREMENT = "INCREMENT";
      export const RESET = "RESET";
      export const DECREMENT = "DECREMENT";

    // step 2: create actions
    //services/actions/counterActions.js
    // action - increment, decrement, reset

      import { DECREMENT, INCREMENT, RESET } from "../constants/counterConstants";

      export const incrementCounter = () => {
        return {
          type: INCREMENT,
        };
      };

      export const resetCounter = () => {
        return {
          type: RESET,
        };
      };

      export const decrementCounter = () => {
        return {
          type: DECREMENT,
        };
      };


      // step 3: create reducers
      //services/reducers/counterReducer.js
          /*
        reducer - handle logic for state update
         count => count + 1
         count => count - 1
         count => 0
        */
        import { DECREMENT, INCREMENT, RESET } from "../constants/counterConstants";

        const initialState = { count: 0 };

        const counterReducer = (state = initialState, action) => {
          switch (action.type) {
            case INCREMENT:
              return {
                ...state,
                count: state.count + 1,
              };
            case RESET:
              return {
                ...state,
                count: 0,
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

        export default counterReducer;

      // step 4: create store
      // npm install redux
      // src/store.js
          import { createStore } from "redux";
          import counterReducer from "./services/reducers/counterReducer";
          const store = createStore(counterReducer);
          export default store;

       // step 5: provide store in index.js
       // npm install react-redux
          import React from "react";
          import { createRoot } from "react-dom/client";
          import { Provider } from "react-redux";

          import App from "./App";
          import store from "./store";

          const container = document.getElementById("root");
          const root = createRoot(container);

          root.render(
            <Provider store={store}>
              <App />
            </Provider>
          );

        // step 6: use store in anywhere in your app. for example in Counter.js
        import React from "react";
        import { useDispatch, useSelector } from "react-redux";
        import {
          incrementCounter,
          decrementCounter,
          resetCounter,
        } from "./services/actions/counterAction";

        const Counter = () => {
          const count = useSelector((state) => state.count);
          const dispatch = useDispatch();

          const handleIncrement = () => {
            dispatch(incrementCounter());
          };

          const handleReset = () => {
            dispatch(resetCounter());
          };

          const handleDecrement = () => {
            dispatch(decrementCounter());
          };

          return (
            <div>
              <h1>React Redux Example</h1>
              <h2>Count : {count}</h2>
              <button onClick={handleIncrement}>Increment</button>
              <button onClick={handleReset}>Reset</button>
              <button onClick={handleDecrement}>Decrement</button>
            </div>
          );
        };

        export default Counter;

        // create actions & constants
        // create reducers
        // create & provide store
        // useSelector, useDispatch

  ```

## 9. API calling in react-redux

- step 1: setup project & install packages `npm install redux react-redux redux-thunk axios`
- step 2: define constants-> src/services/constants/todosConstant.js

```js
export const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODOS_FAILED = "GET_TODOS_FAILED";
```

- step 3: create async action creator -> src/services/actions/todosAction.js

  ```js
  import {
    GET_TODOS_FAILED,
    GET_TODOS_REQUEST,
    GET_TODOS_SUCCESS,
  } from "../constants/todosConstant";

  import axios from "axios";

  export const getAllTodos = () => async (dispatch) => {
    dispatch({ type: GET_TODOS_REQUEST });
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      dispatch({ type: GET_TODOS_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_TODOS_FAILED, payload: error.message });
    }
  };
  ```

- step 4: create reducer -> src/services/reducers/todosReducer.js

  ```js
  import {
    GET_TODOS_FAILED,
    GET_TODOS_REQUEST,
    GET_TODOS_SUCCESS,
  } from "../constants/todosConstant";

  const initialState = {
    isLoading: false,
    todos: [],
    error: null,
  };

  export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_TODOS_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case GET_TODOS_SUCCESS:
        return {
          isLoading: false,
          todos: action.payload,
          error: null,
        };
      case GET_TODOS_FAILED:
        return {
          isLoading: false,
          todos: [],
          error: action.payload,
        };

      default:
        return state;
    }
  };
  ```

- step 5: create store -> src/store.js

  ```js
  import { applyMiddleware, createStore } from "redux";
  import thunk from "redux-thunk";
  import { todosReducer } from "./services/reducers/todosReducer";

  const store = createStore(todosReducer, applyMiddleware(thunk));
  export default store;
  ```

- step 6: provide store -> src/index.js

  ```js
  import React from "react";
  import ReactDOM from "react-dom/client";
  import "./index.css";
  import App from "./App";
  import reportWebVitals from "./reportWebVitals";

  import { Provider } from "react-redux";
  import store from "./store";

  const root = ReactDOM.createRoot(document.getElementById("root"));

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  reportWebVitals();
  ```

- step 7: use store -> src/components/Todos.js

  ```js
  import React, { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { getAllTodos } from "../services/actions/todosAction";

  const Todos = () => {
    const { isLoading, todos, error } = useSelector((state) => state);

    console.log(isLoading);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllTodos());
    }, []);

    return (
      <div>
        <h2>Todos App</h2>
        {isLoading && <h3>Loading ...</h3>}
        {error && <h3>{error.message}</h3>}
        <section>
          {todos &&
            todos.map((todo) => {
              return (
                <article key={todo.id}>
                  <h4>{todo.id}</h4>
                  <p>{todo.title}</p>
                </article>
              );
            })}
        </section>
      </div>
    );
  };
  export default Todos;
  ```

- step 8: adding style -> src/App.css

  ```css
  section {
    display: grid;
    grid-gap: 0.5rem;
    padding: 1rem;
  }

  article {
    background-color: #293462;
    color: white;
    padding: 0.5rem;
  }

  @media (min-width: 600px) {
    section {
      grid-template-columns: auto auto;
    }
  }
  @media (min-width: 768px) {
    section {
      grid-template-columns: auto auto auto;
    }
  }
  ```

## 10. redux-toolkit counter app

- step1: install packages -> `npm install @reduxjs/toolkit react-redux`
- step2: create a recommended folder structure for redux-toolkit - features (contains individual feature of our app) - app (contains store of our app)
- step3: create slice. collection of logic for a feature is called slices in redux. - src/features/counter/counterSlice

  ```js
  import { createSlice } from "@reduxjs/toolkit";

  // state: count:0
  // increment, decrement, reset

  // const incrementCounter = () => {
  //   return { type: "INCREMENT" };
  // };

  export const counterSlice = createSlice({
    name: "counter",
    initialState: { count: 0 },
    reducers: {
      increment: (state) => {
        state.count = state.count + 1;
      },
      decrement: (state) => {
        state.count = state.count - 1;
      },
      reset: (state) => {
        state.count = 0;
      },
      increaseByAmount: (state, action) => {
        state.count = state.count + action.payload;
      },
    },
  });

  // export reducer and action createor
  // Action creators are generated for each case reducer function
  export const { increment, decrement, reset, increaseByAmount } =
    counterSlice.actions;

  export default counterSlice.reducer;
  ```

- step4: create store -> app/store.js

  ```js
  import { configureStore } from "@reduxjs/toolkit";

  import counterReducer from "../features/counter/counterSlice";

  const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
  });
  export default store;
  ```

- step5: provide store in root file -> src/index.js

  ```js
  import React from "react";
  import ReactDOM from "react-dom/client";
  import "./index.css";
  import App from "./App";
  import reportWebVitals from "./reportWebVitals";
  import { Provider } from "react-redux";

  import store from "./app/store";

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  ```

- step6: use store & dispatch actions

  ```js
  import React from "react";
  import { useDispatch, useSelector } from "react-redux";
  import {
    decrement,
    increaseByAmount,
    increment,
    reset,
  } from "./counterSlice";

  const CounterView = () => {
    const count = useSelector((state) => state.counter.count);

    const dispatch = useDispatch();

    return (
      <div>
        <h2>Counter: {count}</h2>
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment
        </button>
        <button
          onClick={() => {
            dispatch(reset());
          }}
        >
          reset
        </button>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
        >
          Decrement
        </button>
        <button
          onClick={() => {
            dispatch(increaseByAmount(5));
          }}
        >
          IncrementBy5
        </button>
      </div>
    );
  };

  export default CounterView;
  ```

## 11. API calling using redux-toolkit in react

## 12. CRUD APP using redux-toolkit in react

- project code in github: https://github.com/anisul-Islam/redux-toolkit-crud-app

```

```
# 13.[A complete CRUD APP using RTK Query](https://github.com/anisul-Islam/rtk-query-crud-app)
