import { useQuery } from "react-query";
import { fetchRandomPoems } from "../api/poem.js";

const useFetchRandomPoems = () => {
  return useQuery(["random-poems"], fetchRandomPoems);
};

export default useFetchRandomPoems;
