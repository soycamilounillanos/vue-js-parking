import http from "../axios";

class ParkingDataService {
  token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDU3MzcxMzBjNTVmYmFjMzE3MzE5ZmUzZTVkZTJjYTc3YjE5NjAzMGI3NDkzMjY2NDU2MDQwYzcwOTkzMWY2ZjNhZWVkZmU3OTgzZmJjNjciLCJpYXQiOjE2MTk3OTU1OTEsIm5iZiI6MTYxOTc5NTU5MSwiZXhwIjoxNjUxMzMxNTkxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.LeA_HrCzxktDJcNaPKV1GhFOqYN1pH68pg92jZbRk-kpcG9xoowSvtrSxVWv7K1VVwqbSmTN3IPKUTtcwXlS8sMe-_1Qt77zQr6uP2zPjuhWRd1HI6PhmwCXloA14cFs0TjS2qOBH1o63JFyKAmLqertQCnpr6b9cSexpmDHlWQkr-GF26vL1XbUGd-Usv2GW5hdowV_GWnYqpesDjc1k7rUdSIfGkOxiKzBHOAT61LDF6dLK-KPraRkp248S_OVWIDvMO3OiTHqaYQZLj66-dnjJOEOeG3YsKFhR7H8UpD-zIUS73reWqezcg4EQ_ForkYrsbpg-RHqOfUQUlUaYEt6AJZP_45F6aT6mvt1j9-WXwH4BBRq35BUPeaqn70ykjy2lZD9qo5DStReh4IsaHHAyAs3f2gP1Z8QgFQAlVPBF8gEsLauBgeh0BZPWqUa3Z7kFzazYfk7_S52OxJJmmQuukCZCnt1k3xEF0N_ZGtpbCZnWgXmrG0dAOAmuWLn3jE1GslU8fd4ZggHN5Dg5x1hxU7CQoy9O3oI6ocD-kbKYOrdSEIdtPn3K8smFd2ELWo-tWKfYlsqGTLCMfPPXRW_BFTVUyh5YeL43lNKBJOWSDJDg6bD3AEaTtDgQTVcctBXcNmw1cNkXD0O5kazY9KQf-syRxzmsGxu0IwUmWU'
  
  getAll() {
    return http.get("/parkings", {
      headers: {
        Authorization: this.token
      }
    });
  }

  get(id) {
    return http.get(`/parkings/${id}`);
  }

  create(data) {
    return http.post("/parkings", data, {
      headers: {
        Authorization: this.token
      }
    });
  }

  checkout(id) {
    return http.post(`/parkings/${id}/checkout`, {}, {
      headers: {
        Authorization: this.token
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

  findByTitle(title) {
    return http.get(`/parkings?title=${title}`);
  }
}

export default new ParkingDataService();
