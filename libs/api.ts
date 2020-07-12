import Axios from "axios";

const baseURL = "https://corona.lmao.ninja/v2";

export default Axios.create({
  baseURL,
});
