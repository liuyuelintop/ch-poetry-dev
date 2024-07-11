import { useState, useEffect } from "react";
import axios from "axios";

const useGetPoems = (endpoint, initialPage = 1, initialLimit = 10) => {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPoems = async (page) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5001/api/${endpoint}?page=${page}&limit=${initialLimit}`
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

    fetchPoems(currentPage);
  }, [currentPage, endpoint, initialLimit]);

  return {
    poems,
    loading,
    error,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
  };
};

export default useGetPoems;
