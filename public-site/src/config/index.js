import axios from "axios";

const TABLETIME_SERVER_API = "https://server.tabletime.online";
const tableTimeApi = axios.create({
  baseURL: TABLETIME_SERVER_API,
});

export default tableTimeApi;
