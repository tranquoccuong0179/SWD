// First, let's create the necessary types (store/types.ts)
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export interface UserState {
    id: string;
    email: string;
    fullName: string;
    userName: string;
    gender: number;
    phoneNumber: number;
    isAuthenticated: boolean;
}

export interface RootState {
    USER: UserState;
    // Add other state slices here if you have them
}

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AnyAction
>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// Now update the action file (store/user/action.ts)
import { AppThunk } from '../types';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: UserState;
}

interface LoginFailureAction {
    type: typeof LOGIN_FAILURE;
    payload: string;
}

export type UserActionTypes = LoginSuccessAction | LoginFailureAction;

// Action Creators
export const loginSuccess = (user: UserState): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    payload: user
});

export const loginFailure = (error: string): LoginFailureAction => ({
    type: LOGIN_FAILURE,
    payload: error
});

export const loginAccount = (userData: Omit<UserState, 'isAuthenticated'>): AppThunk => async (
    dispatch
) => {
    try {
        dispatch(loginSuccess({
            ...userData,
            isAuthenticated: true
        }));
    } catch (error) {
        dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
    }
};