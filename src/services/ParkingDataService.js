import http from "../axios";

class ParkingDataService {

  getAll() {
    const token = sessionStorage.getItem('jwt')
    return http.get("/parkings", {
      headers: {
        Authorization: token
      }
    });
  }

  get(id) {
    return http.get(`/parkings/${id}`);
  }

  create(data) {
    const token = sessionStorage.getItem('jwt')
    return http.post("/parkings", data, {
      headers: {
        Authorization: token
      }
    });
  }

  checkout(id) {
    const token = sessionStorage.getItem('jwt')
    return http.post(`/parkings/${id}/checkout`, {}, {
      headers: {
        Authorization: token
      }
    });
  }

  update(id, data) {
    return http.put(`/parkings/${id}`, data);
  }

  delete(id) {
    return http.delete(`/parkings/${id}`);
  }

  deleteAll() {
    return http.delete(`/parkings`);
  }

  search(q) {
    const token = sessionStorage.getItem('jwt')
    return http.get(`/parkings?q=${q}`, {
      headers: {
        Authorization: token
      }
    });
  }
}

export default new ParkingDataService();
