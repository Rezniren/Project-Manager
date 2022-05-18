import http from "../http-common";
class CardDataService {
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



    findByTag(tag) {
        return http.get(`/board?tag=${tag}`);
    }
    getTags(data) {
        return http.put('board/tags', data);
    }

}
export default new CardDataService();
