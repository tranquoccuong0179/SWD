import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk"; // Use named import for redux-thunk
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  USER: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunkDispatch = ReturnType<typeof rootReducer>;
const store = createStore(rootReducer, applyMiddleware(thunk)); // Apply middleware correctly

export default store;
