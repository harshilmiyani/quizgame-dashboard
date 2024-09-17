import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://api.insneic.com/api/v1",
});

export const APIEndpoints = {
  getCategories: "/category/get_categories",
  createContent: "contest/set_new_contest",
};
