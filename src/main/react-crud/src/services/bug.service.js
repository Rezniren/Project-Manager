import http from "../http-common";
class BugDataService {
    getAll() {
        return http.get("/board");
    }
    get(id) {
        return http.get(`/board/${id}`);
    }
    create(data) {
        return http.post("/board", data);
    }
    update(id, data) {
        return http.put(`/board/${id}`, data);
    }
    delete(id) {
        return http.delete(`/board/${id}`);
    }
    deleteAll() {
        return http.delete(`/board`);
    }
    findByName(name) {
        return http.get(`/board?name=${name}`);
    }
}
export default new BugDataService();
