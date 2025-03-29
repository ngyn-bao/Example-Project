import { http } from "./config";

export const skillService = {
  getListSkill: () => {
    return http.get("/skill");
  },
};
