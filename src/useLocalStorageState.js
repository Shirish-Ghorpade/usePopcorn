import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  // 1. Here main target of custom hook is me tya hook la multiple jagi use karu shakto
  // so, state che name pn generalize de
  // const [watched, setWatched] ------> Previous name
  const [value, setValue] = useState(function () {
    // const storedValue = localStorage.getItem("watched");--> previously we put the key watched but te user decide karnar ki mala kontya key ne data store karaycha aahe, so key user send karnar fucntion argument madhun
    const storedValue = localStorage.getItem(key);
    // convert string into original data
    // parse is opposite to stringify
    return storedValue ? JSON.parse(storedValue) : initialState;
    // stored value madhe undefined asle tar initial state return kar
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value]
  );
  return [value, setValue];
}
