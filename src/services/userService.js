import http from "./httpService";
import { apiUrl } from "../config.json";

export function register(user) {
  return http.post(apiUrl + "/users", {
    name: user.firstName,
    lastName: user.lastName,
    email: user.emailId,    
    password: user.password,
    confirmPassword: user.confirmPassword
  });
}
