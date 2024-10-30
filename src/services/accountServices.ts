import { API } from "./api";


export const accountService = {
    registerUser(data: {}) {
        return API.post("/auth/SignUp", data);
    },
    fetchUser() {
        return API.get("/auth/google-auth/signin-google");
    }
}