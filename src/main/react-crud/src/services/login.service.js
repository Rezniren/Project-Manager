import http from "../http-common";
class LoginDataService {

    findUser(data) {
        return http.post(`/login`, data);
    }
}
export default new LoginDataService();