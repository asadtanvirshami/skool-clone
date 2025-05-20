import { combineReducers } from "redux";
import userReducer from "./user-reducer";
import errorReducer from "./error-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
