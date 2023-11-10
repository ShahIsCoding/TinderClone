import { axiosInstance } from "./axios";

const userApi = {
  register: (payload, onSuccess, onFailure) => {
    axiosInstance
      .post("/users/register", payload)
      .then((resp) => onSuccess())
      .catch((err) => onFailure());
  },
  signin: (payload, onSuccess, onFailure) => {
    axiosInstance
      .post(`/users/signin`, payload)
      .then((resp) => onSuccess())
      .catch((err) => onFailure());
  },
  logout: (payload, onSuccess, onFailure) => {
    axiosInstance
      .get("/users/logout")
      .then((resp) => onSuccess && onSuccess(resp.data))
      .catch((err) => onFailure && onFailure(err));
  },
  fetchUser: (payload, onSuccess, onFailure) => {
    axiosInstance
      .get("/users/user")
      .then((resp) => onSuccess && onSuccess(resp.data))
      .catch((err) => onFailure && onFailure());
  },
};

export { userApi };
