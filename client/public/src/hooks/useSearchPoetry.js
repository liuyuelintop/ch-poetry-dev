import { useQuery } from "react-query";
import { searchPoetry } from "../api/poem.js";

const useSearchPoetry = (queryParams) => {
  return useQuery(
    ["search-poetry", queryParams],
    () => searchPoetry({ ...queryParams }),
    {
      keepPreviousData: true,
    }
  );
};

export default useSearchPoetry;
