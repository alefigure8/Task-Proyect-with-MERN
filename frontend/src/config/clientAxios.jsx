import axios from 'axios';
const clientAxios = axios.create({
  baseURL: `${process.env.VITE_BACKEND_URL}/api`,
});

export default clientAxios;