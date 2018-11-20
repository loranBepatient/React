import axios from "axios";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  if (!expectedError) {
    console.log("Logging the error", error);
    alert("unexcepted error occured");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  delete: axios.delete,
  put: axios.put,
  post: axios.post
};
