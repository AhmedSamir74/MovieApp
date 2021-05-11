import axios from "axios";
const API_KEY = `564e2ee657f9d953e1e12c1d151adf01`;

const APIKit = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: API_KEY,
  },
});

export default APIKit;
