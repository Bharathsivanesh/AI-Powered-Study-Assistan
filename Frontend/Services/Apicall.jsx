// src/services/apiService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000";

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
    const response = await axios({
      url: url,
      method,
      data: payload,
      headers: {
        "Content-Type": "application/json",
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
