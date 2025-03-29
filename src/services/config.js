import axios from "axios";

// Xem và setup lại một axios custom xử lí gọi API cho dự án Fiverr
export const http = axios.create({
  baseURL: "https://fiverrnew.cybersoft.edu.vn/api/",
  timeout: 30000,
  headers: {
    tokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBKYXZhIDA4IiwiSGV0SGFuU3RyaW5nIjoiMTYvMDkvMjAyNSIsIkhldEhhblRpbWUiOiIxNzU3OTgwODAwMDAwIiwibmJmIjoxNzI3NTQyODAwLCJleHAiOjE3NTgxMjg0MDB9.eTGzzIu_2nXoMGM-HMJQM0h-6Nk4yfnHvLmWHpxqlsU",
  },
});
