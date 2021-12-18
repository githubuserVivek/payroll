/**

GET token from localstorage
*/

const getUserToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

/**
CLEAR token from localstorage
*/

const clearUserToken = () => {
  const clearToken = localStorage.clear();
  return clearToken;
};

/**
Handle response of API 
*/

const handleResponse = (response) => {
  let newResponse = "";
  try {
    if (
      response.status > 201 ||
      response.data.code === 500 ||
      response.data.code === 401
    ) {
      newResponse = {
        success: false,
        error: Array.isArray(response.data.message)
          ? response.data.message.join(", ")
          : response.data.message,
      };
      console.log(newResponse.error, {
        duration: 5,
        type: "error",
      });
    } else {
      newResponse = {
        success: true,
        data: response.data,
      };
    }
  } catch (error) {
    console.log("Server Error please retry after sometime.", {
      duration: 5,
      type: "error",
    });
    newResponse = {
      success: false,
      error: "Server Error please retry after sometime.",
    };
  }

  return newResponse;
};

export { handleResponse, getUserToken, clearUserToken };
