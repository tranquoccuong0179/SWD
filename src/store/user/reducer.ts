// import { FETCH_USER, LOGIN_ACCOUNT, LOGOUT_USER } from "./action";

// const initialState = {
//   username: "",
//   avatar: "",
//   uid: "",
//   refreshToken: "",
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_ACCOUNT:
//       // localStorage.setItem("refreshToken", action.payload.refreshToken);
//       // localStorage.setItem("accessToken", action.payload.accessToken);
//       //   localStorage.setItem("role", action.payload.roleName);
//       // "Customer", "SalonOwner", "SalonEmployee"
//       return {
//         ...state,
//         // token: action.payload.accessToken,
//         username:
//           action.payload?.userName,
//         fullName: action.payload.fullName,
//         uid: action.payload.id,
//         phone: action.payload.phoneNumber
//       };

//     case FETCH_USER:
//       localStorage.setItem("role", action.payload.roleName);
//       return {
//         ...state,
//         // token: action.payload.accessToken,
//         username:
//           action.payload?.fullName,
//         avatar:
//           action.payload?.salonOwnerResponse?.img ||
//           action.payload?.customerResponse?.img ||
//           action.payload?.salonEmployeeResponse?.img,
//         uid: action.payload.id,
//         // idOwner: action.payload?.salonOwnerResponse?.id,
//         // idCustomer: action.payload?.customerResponse?.id,
//         // idEmployee: action.payload?.salonEmployeeResponse?.id,
//         // refreshToken: action.payload.refreshToken,
//       };
//     case LOGOUT_USER:

//       return {
//         ...state,
//         username:
//           action.payload?.fullName,
//         avatar:
//           action.payload?.salonOwnerResponse?.img ||
//           action.payload?.customerResponse?.img ||
//           action.payload?.salonEmployeeResponse?.img,
//         uid: action.payload.uid,

//       };

//     default:
//       return state;
//   }
// };

// export default reducer;

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
  username: "",
  avatar: "",
  uid: "",
  refreshToken: "",
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

    default:
      return state;
  }
};

export default reducer;