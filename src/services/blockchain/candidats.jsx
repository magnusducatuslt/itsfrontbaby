import axios from "axios";

export function getCandidats() {
  return axios
    .get(process.env.REACT_APP_CORE_HOST + process.env.REACT_APP_CANDIDATS)
    .then((res) => ({ candidates: res.data.message }));
}
