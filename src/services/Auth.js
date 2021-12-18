import axios from "axios";
import config from "../ApiActions/apiConfig";

/**
 * Authenticate login detail from api
 * @param {data} data
 */
export const login = async (data) => {
  return axios
    .post(`${config.api_base_url}admin/login`, data)
    .then((response) => response)
    .catch((error) => error.response);
};
