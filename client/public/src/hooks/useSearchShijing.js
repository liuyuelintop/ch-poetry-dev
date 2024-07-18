import { useQuery } from "react-query";
import { searchShijing } from "../api/poem.js";

const useSearchShijing = (queryParams) => {
  return useQuery(
    ["search-shijing", queryParams],
    () => searchShijing({ ...queryParams }),
    {
      keepPreviousData: true,
    }
  );
};

export default useSearchShijing;
