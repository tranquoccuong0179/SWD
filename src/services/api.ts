import axios from "axios";
const BASE_URL = "https://mamin-api-hrbrffbrh3h6embb.canadacentral-01.azurewebsites.net/api";

export const API = axios.create({
  baseURL: BASE_URL,
});