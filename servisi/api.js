import axios from 'axios';

// Axios osnova
const apiClient = axios.create({
  baseURL: '/http://pabp.viser.edu.rs:8000/api'
});

// interseptori za hvatanje grešaka
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error.response?.data || error.message);

    return Promise.reject(error);
  }
);

export default apiClient;