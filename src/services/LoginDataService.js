import http from "../axios";

class PlaceDataService {
  login(data) {
    return http.post("/auth/login", data);
  }

  logout(token) {
    return http.get("/auth/logout", {
      headers: {
        Authorization: token
      }
    });
  }
}

export default new PlaceDataService();
