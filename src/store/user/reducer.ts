import {LOGIN_FAILURE, LOGIN_SUCCESS, UserState} from '../types';
import { FETCH_USER, LOGIN_ACCOUNT, LOGOUT_USER } from "./action";

interface UserState {
  username: string;
  avatar: string;
  uid: string;
  refreshToken: string;
  fullName?: string;
  phone?: string;
}

interface LoginPayload {
  userName?: string;
  fullName: string;
  id: string;
  phoneNumber: string;
  accessToken?: string;
  refreshToken?: string;
  roleName?: string;
}

interface FetchUserPayload {
  fullName: string;
  id: string;
  roleName: string;
  salonOwnerResponse?: {
    id?: string;
    img?: string;
  };
  customerResponse?: {
    id?: string;
    img?: string;
  };
  salonEmployeeResponse?: {
    id?: string;
    img?: string;
  };
}

interface LogoutPayload {
  fullName?: string;
  uid: string;
  salonOwnerResponse?: {
    img?: string;
  };
  customerResponse?: {
    img?: string;
  };
  salonEmployeeResponse?: {
    img?: string;
  };
}

type UserAction = 
  | { type: typeof LOGIN_ACCOUNT; payload: LoginPayload }
  | { type: typeof FETCH_USER; payload: FetchUserPayload }
  | { type: typeof LOGOUT_USER; payload: LogoutPayload };

const initialState: UserState = {
  id: '',
  email: '',
  fullName: '',
  userName: '',
  gender: 0,
  phoneNumber: 0,
  isAuthenticated: false
};


const reducer = (state = initialState, action: UserAction): UserState => {


  switch (action.type) {
    case LOGIN_ACCOUNT:
      return {
        ...state,
        username: action.payload?.userName ?? "",
        fullName: action.payload.fullName,
        uid: action.payload.id,
        phone: action.payload.phoneNumber,
      };

    case FETCH_USER:
      localStorage.setItem("role", action.payload.roleName);
      return {
        ...state,
        username: action.payload.fullName,
        avatar:
          action.payload.salonOwnerResponse?.img ||
          action.payload.customerResponse?.img ||
          action.payload.salonEmployeeResponse?.img ||
          "",
        uid: action.payload.id,
      };

    case LOGOUT_USER:
      return {
        ...state,
        username: action.payload.fullName ?? "",
        avatar:
          action.payload.salonOwnerResponse?.img ||
          action.payload.customerResponse?.img ||
          action.payload.salonEmployeeResponse?.img ||
          "",
        uid: action.payload.uid,
      };

    case LOGIN_SUCCESS:
      return {
        ...action.payload,
        isAuthenticated: true
      };
    case LOGIN_FAILURE:
      return {
        ...initialState,
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export default reducer;