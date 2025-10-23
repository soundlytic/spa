import axios from 'axios';

export type ApiError = {
  field?: string;   // e.g. "email" or "password"
  message: string;  // e.g. "Email does not exist"
  code?: string;    // optional error code like "USER_NOT_FOUND"
};

// Create an Axios instance with the base URL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use env variable or fallback to localhost
  timeout: 10000, // Timeout in ms
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👇 Intercept responses to transform errors into ApiError
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let apiError: ApiError = { message: "An unexpected error occurred" };

    if (error.response?.status === 401) {
      // Clear auth state if using context / redux
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect once
    }

    if (error.response) {
      // Server responded with status code not 2xx
      const data = error.response.data;

      console.log(data)
      // Handle different formats your backend might return
      if (typeof data === "string") {
        apiError.message = data;
      } else if (data?.message) {
        apiError.message = data.message;
      }

      if (data?.field) {
        apiError.field = data.field;
      }

      if (data?.code) {
        apiError.code = data.code;
      }
    } else if (error.request) {
      // No response
      apiError.message = "Network error. Please try again later.";
    }

    return Promise.reject(apiError);
  }
);
export default apiClient