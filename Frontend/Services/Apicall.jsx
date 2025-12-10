// // src/services/apiService.js
// import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000";

// export const apiService = async ({
//   endpoint,
//   method = "GET",
//   payload = {},
//   onSuccess = () => {},
//   onError = () => {},
//   headers = {},
//   fullUrl = false,
// }) => {
//   try {
//     const url = fullUrl ? endpoint : `${BASE_URL}${endpoint}`;
//     const response = await axios({
//       url: url,
//       method,
//       data: payload,
//       headers: {
//         "Content-Type": "application/json",
//         ...headers,
//       },
//     });
//     onSuccess(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("API Error:", error);

//     onError(error);
//     throw error;
//   }
// };
import axios from "axios";

// const BASE_URL = " https://ai-powered-study-assistan-1.onrender.com";
const BASE_URL = "http://127.0.0.1:8000";

export const apiService = async ({
  endpoint,
  method = "GET",
  payload = {},
  onSuccess = () => {},
  onError = () => {},
  headers = {},
  fullUrl = false,
}) => {
  try {
    const url = fullUrl ? endpoint : `${BASE_URL}${endpoint}`;
    const isFormData = payload instanceof FormData;

    const response = await axios({
      url,
      method,
      data: payload,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        accept: "application/json",
        ...headers,
      },
    });

    onSuccess(response.data);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    onError(error);
    throw error;
  }
};
