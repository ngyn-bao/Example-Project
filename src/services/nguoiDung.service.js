import { http } from "./config";

export const nguoiDungService = {
  getListUser: () => {
    return http.get("/users");
  },
  deleteUser: (id) => {
    return http.delete(`/users?id=${id}`);
  },
  createUser: (data) => {
    return http.post("/users", data);
  },
  uploadAvatar: (token, data) => {
    return http.post("/users/upload-avatar", data, { headers: { token } });
  },
};
