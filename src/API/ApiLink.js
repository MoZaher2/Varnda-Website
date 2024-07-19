import axios from "axios";
const instance = axios.create({
  baseURL: 'https://varnda-production.up.railway.app/api',
});
export default instance;
