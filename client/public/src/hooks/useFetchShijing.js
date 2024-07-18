import { useQuery } from "react-query";
import { fetchShijing } from "../api/poem.js";

const useFetchShijing = (page, limit) => {
  return useQuery(["shijing", page], () => fetchShijing(page, limit), {
    keepPreviousData: true,
  });
};

export default useFetchShijing;
