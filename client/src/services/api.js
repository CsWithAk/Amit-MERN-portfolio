
import axios from 'axios';

// Use the same-origin /api proxy in both development and production.
// Netlify redirects /api/* requests to the Render backend.
// Vite proxy handles /api requests during local development.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Normalize API errors for consistent error handling.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error?.response?.data || {};

    const message =
      data.message ||
      (error.code === 'ERR_NETWORK'
        ? 'Network error — please check your internet connection or API server.'
        : 'Something went wrong. Please try again.');

    return Promise.reject(
      Object.assign(error, {
        friendlyMessage: message,
        payload: data,
      })
    );
  }
);

export default api;



// import axios from 'axios';

// // Centralized Axios instance. `withCredentials` ensures the HTTP-only auth
// // cookie (amit_token) is sent with every request. In dev the Vite proxy maps
// // /api -> http://localhost:5000; in prod set VITE_API_URL to the API origin.
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "https://cswithak.onrender.com/" ||'/api',
//   withCredentials: true,
//   headers: { 'Content-Type': 'application/json' },
// });

// // Normalize errors so callers always get a readable `message` and payload.
// api.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     const data = error?.response?.data || {};
//     const message =
//       data.message ||
//       (error.code === 'ERR_NETWORK'
//         ? 'Network error — is the API server running?'
//         : 'Something went wrong. Please try again.');
//     return Promise.reject(Object.assign(error, { friendlyMessage: message, payload: data }));
//   }
// );

// export default api;
