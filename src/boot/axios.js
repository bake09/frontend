import { boot } from 'quasar/wrappers'
import axios from 'axios'

import { useAuthStore } from "stores/auth-store";

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true
})

export default boot(async ({ app, router, store }) => {

  const authStore = useAuthStore(store);

  // Interceptor RESPONSE
  api.interceptors.response.use(function (response, err)
  {
    authStore.error = null
    return response;
  }, function (err)
  {
    const error = {
      status: err.response?.status,
      original: err,
      validation: {},
      message: null,
    };

    switch (err.response?.status) {
      case 422:
        for (let field in err.response.data.errors) {
          error.validation[field] = err.response.data.errors[field][0];
        }
        break;
      case 403:
        error.message = "You're not allowed to do that.";
        break;
      case 401:
        error.message = "Please re-login.";
        authStore.logout()
        break;
      case 500:
        error.message = "Something went really bad. Sorry.";
        break;
      default:
        error.message = "Something went wrong. Please try again later.";
    }

    return Promise.reject(error);
  });
})

export { api }
