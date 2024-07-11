import useFetchData from "./useFetchData";

const useFetchPoems = (
  endpoint = "poems",
  query = {},
  page = 1,
  limit = 10,
  method = "GET"
) => {
  return useFetchData({ endpoint, params: { query, page, limit }, method });
};

export default useFetchPoems;
