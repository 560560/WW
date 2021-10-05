import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { commentReducer } from './comment-reducer';
import { authReducer } from './auth-reducer';

let reducers = combineReducers({
  commentsState: commentReducer,
  authState: authReducer,
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

let store = createStore(reducers, composedEnhancer);

export type RootState = ReturnType<typeof reducers>;

export default store;
