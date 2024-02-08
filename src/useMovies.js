import { useEffect, useState } from "react";

//3. Me ithe copy karun thveli App and ithe key asunde kahi hot nahi
// key is tightly coupled so mahun file madhe thevli
const KEY = "4b9b46ae";
//2. custom hook is the function of JS it is NOT s component
// so, ithe me arguments use karto props nahi
// query ha state variable ahe App madhla pn mala ithe tya chi garaj aahe so tithun as
// pass kar as parameter and ithe accept kar as argument
//1. jonas custom hooks la export deto and components la export default deto for differentiates
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong while fetching movies");
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      //   handleCloseMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  // 4. hai state variables tithe lagnar and tya sathi mala ya state variables na as object mahun send karayla lagel and tithe object destruture karun accept kar
  return { movies, isLoading, error };
}
