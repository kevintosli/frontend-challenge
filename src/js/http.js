import axios from "axios";

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  Accept: "application/json"
};

export const http = axios.create(headers);

export default {
  http
};
