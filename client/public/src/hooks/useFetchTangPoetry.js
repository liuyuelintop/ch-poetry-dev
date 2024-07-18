import { useQuery } from "react-query";
import { fetchTang300Poems } from "../api/poem.js";

const useFetchTangPoetry = (page, limit) => {
  return useQuery(
    ["tang-300-poems", page],
    () => fetchTang300Poems(page, limit),
    {
      keepPreviousData: true,
    }
  );
};

export default useFetchTangPoetry;
