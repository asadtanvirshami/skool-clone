import { combineReducers, Reducer } from 'redux';
import userReducer from './user-reducer';


const reducers = combineReducers({
  user: userReducer,
});

export default reducers;