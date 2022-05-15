import http from "../http-common";
class BugDataService {
    getAll() {
        return http.get("/bugs");
    }
    get(id) {
        return http.get(`/bugs/${id}`);
    }
    create(data) {
        return http.post("/bugs", data);
    }
    update(id, data) {
        return http.put(`/bugs/${id}`, data);
    }
    delete(id) {
        return http.delete(`/bugs/${id}`);
    }
    deleteAll() {
        return http.delete(`/bugs`);
    }
    findByName(name) {
        return http.get(`/bugs?name=${name}`);
    }
}
export default new BugDataService();
