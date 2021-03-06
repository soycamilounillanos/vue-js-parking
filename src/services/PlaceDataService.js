import http from "../axios";

class PlaceDataService {
  getAll() {
    const token = sessionStorage.getItem('jwt')
    return http.get("/parkings/types", {
      headers: {
        Authorization: token
      }
    });
  }
}

export default new PlaceDataService();
