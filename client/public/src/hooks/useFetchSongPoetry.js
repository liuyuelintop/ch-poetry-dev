import { useQuery } from "react-query";
import { fetchSong300Poems } from "../api/poem.js";

const useFetchSongPoetry = (page, limit) => {
  return useQuery(
    ["song-300-poems", page],
    () => fetchSong300Poems(page, limit),
    {
      keepPreviousData: true,
    }
  );
};

export default useFetchSongPoetry;
