import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = ({
  endpoint,
  params: { query = {}, page = 1, limit = 10 } = {},
  method = "GET",
}) => {
  const [data, setData] = useState({
    tangPoems: [],
    songPoems: [],
    poems: [],
    totalPages: 1,
    currentPage: 1,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setData((prevData) => ({ ...prevData, loading: true, error: null }));
      try {
        const config = {
          method,
          url: `http://localhost:5001/api/${endpoint}`,
          ...(method === "POST" ? { data: { ...query, page, limit } } : {}),
          ...(method === "GET" ? { params: { ...query, page, limit } } : {}),
        };
        const response = await axios(config);
        setData({
          tangPoems: response.data.tangPoems || [],
          songPoems: response.data.songPoems || [],
          poems: response.data.poems || response.data.poem || response.data,
          totalPages: response.data.totalPages || 1,
          currentPage: response.data.currentPage || 1,
          loading: false,
          error: null,
        });
      } catch (error) {
        setData((prevData) => ({
          ...prevData,
          loading: false,
          error: "There was an error fetching the data!",
        }));
        console.error(error);
      }
    };

    fetchData();
  }, [endpoint, query, page, limit, method]);

  return data;
};

export default useFetchData;
