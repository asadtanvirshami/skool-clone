
import { SET_ERROR, CLEAR_ERROR, ErrorAction } from "../actions/error-action";
interface ErrorState {
  error: string | null; 
}

const initialState: ErrorState = {
  error: null,
};

const errorReducer = (
  state = initialState,
  action: ErrorAction
): ErrorState => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload ?? null }; 
    case CLEAR_ERROR:
      return { ...state, error: null }; 
    default:
      return state;
  }
};

export default errorReducer;
