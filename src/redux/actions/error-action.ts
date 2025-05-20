export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export interface ErrorAction {
  type: typeof SET_ERROR | typeof CLEAR_ERROR;
  payload?: string | null; // Ensuring payload can only be string or null, not undefined
}

export const setError = (error: string | null): ErrorAction => ({
  type: SET_ERROR,
  payload: error,
});

export const clearError = (): ErrorAction => ({
  type: CLEAR_ERROR,
  payload: null, // Explicitly set payload to null to ensure consistency
});
