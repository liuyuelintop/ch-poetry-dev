import { useState, useEffect } from "react";
import axios from "axios";

const useSearch = (initialParams = {}, initialPage = 1, initialLimit = 10) => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    const fetchPoems = async (page, searchParams) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `http://localhost:5001/api/poems/search`,
          { ...searchParams, page, limit: initialLimit }
        );
        setPoems(response.data.poems);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        setError("There was an error fetching the poems!");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems(currentPage, params);
  }, [currentPage, params, initialLimit]);

  return {
    poems,
    loading,
    error,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
    setParams,
  };
};

export default useSearch;
