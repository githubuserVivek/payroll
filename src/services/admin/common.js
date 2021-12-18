import axios from "axios";
import config from "ApiActions/apiConfig";
import { getUserToken } from "ApiActions/common";

/**
ADD Employees API
*/

export const add = async (data) => {
  return axios
    .post(`${config.api_base_url}employee`, data, {
      headers: {
        Authorization: getUserToken(),
      },
    })
    .then((response) => response)
    .catch((error) => error.response);
};

/**
LIST All Employees API
*/
export const list = async (limit, page) => {
  return axios
    .get(`${config.api_base_url}employee?limit=${limit}&page=${page}`, {
      headers: {
        Authorization: getUserToken(),
      },
    })
    .then((response) => response)
    .catch((error) => error.response);
};

/**
List all Salary Data API
*/
export const listSalaryData = async () => {
  return axios
    .get(`${config.api_base_url}employee?limit=-1&page=0`, {
      headers: {
        Authorization: getUserToken(),
      },
    })
    .then((response) => response)
    .catch((error) => error.response);
};

/**
DELETE Employee API
*/

export const deleteEmployee = async (id) => {
  return axios
    .delete(`${config.api_base_url}employee/${id}`, {
      headers: {
        Authorization: getUserToken(),
      },
    })
    .then((response) => response)

    .catch((error) => error.response);
};

/**
GET data for particular Employee API
*/

export const singleUser = (id) => {
  return axios
    .get(`${config.api_base_url}employee/${id}`, {
      headers: {
        Authorization: getUserToken(),
      },
    })
    .then((response) => response)
    .catch((error) => error.response);
};

/**
UPDATE Employees data API
not used yet 
*/

export const updateData = async (data, id) => {
  return axios
    .put(
      `${config.api_base_url}employee/${id}`,
      data,

      {
        headers: {
          Authorization: getUserToken(),
        },
      }
    )
    .then((response) => response)
    .catch((error) => error.response);
};

/**
Employees Password generate API
*/

export const passworGen = (id) => {
  return axios
    .post(`${config.api_base_url}changePassword?id=${id}`, id, {
      headers: {
        Authorization: getUserToken(),
      },
    })
    .then((response) => response)
    .catch((error) => error.response);
};

/**
Salary API to get all employee's 
*/

export const getSalaryDetail = () => {
  return axios
    .get(`${config.api_base_url}getSalary?limit=100&page=0`, {
      headers: {
        Authorization: getUserToken(),
      },
    })
    .then((response) => response)
    .catch((error) => error.response);
};

/**
 * Final Salary Save API
 */

export const finalSalaryApi = (id) => {
  return axios
    .put(`${config.api_base_url}salaryDetails?user_id=${id}`, {
      headers: {
        Authorization: getUserToken(),
      },
    })
    .then((response) => response)
    .catch((error) => error.response);
};
