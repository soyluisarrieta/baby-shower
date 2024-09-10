import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.105/EJERCICIOS/OTROS/baby-shower/server/public_html/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
