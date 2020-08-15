import axios from "axios";
console.log(process.env.REACT_APP_CORE_HOST + process.env.REACT_APP_CANDIDATS);
export function getCandidats() {
  return axios
    .get(process.env.REACT_APP_CORE_HOST + process.env.REACT_APP_CANDIDATS)
    .then((res) => res.data.message);
}
