import { useEffect } from "react";

export function useKey(key, action) {
  // User jo pn ha cutom hooks use karnar tyala key send karayla lagnar and
  // ti key press zali ki konti action karaychi ti action pn send karayla lagnar
  useEffect(
    function () {
      function callback(e) {
        // me key send kartana escape ESCAPE kase pn send karnar properly
        // compare kartana Escape pahije pn nahi bhetle tari me doghna pn
        // lowercase madhe karnar and then check karnar
        // Basic rule of string checking
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, action]
    // je pn variables(props, state variables) use hotat useEffect te dependancy arr madhe yetat
  );
}
