import { API } from "./api";

export const accountService = {
    registerUser(data) {
        return API.post("/auth/SignUp", data);
    },
}