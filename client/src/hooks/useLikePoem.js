import { useState, useEffect } from "react";
import axios from "axios";

const useLikePoem = (id) => {
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5001/api/poems/${id}`
        );
        setLikeCount(response.data.like);
        setLoading(false);
      } catch (error) {
        setError("There was an error fetching the like count!");
        setLoading(false);
        console.error(error);
      }
    };

    fetchLikes();
  }, [id]);

  const likePoem = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5001/api/poems/like/${id}`
      );
      setLikeCount(response.data.poem.like);
    } catch (error) {
      setError("There was an error liking the poem!");
      console.error(error);
    }
  };

  return { likeCount, loading, error, likePoem };
};

export default useLikePoem;
