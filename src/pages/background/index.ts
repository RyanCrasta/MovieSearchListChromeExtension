import { addMovie } from "./actions";
import store from "./store";

let tabUpdated = false;

interface result {
  title: string;
  release_date: string;
  overview: string;
  vote_average: number;
  id: number;
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2ZlNDBmNGE5Y2JhZDlhM2VlNjNhOTJlMWViYjJkZiIsIm5iZiI6MTcxOTQ2Mzk2OS4xODA2OTEsInN1YiI6IjY2N2FiY2ZmNGY1NGI2YmMwNDhiZTQ4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rbJS5aF5MykuEhQMyI-36cqHaUl7ZimtBsV_BR6D0BI",
  },
};

const url = "https://api.themoviedb.org/3/search/movie?query=";

function searchUpdated(
  requestDetails: number,
  changeInfo: { status: string },
  tab: { status?: string; url?: string; title?: string }
) {
  if (
    tab.status === "complete" &&
    tab.url !== undefined &&
    tab.url !== "chrome://newtab/"
  ) {
    // check if same search already saved then no need to search again
    chrome.storage.local.get("urls", function (URL) {
      if (
        Object.keys(URL).length === 0 &&
        URL.constructor === Object &&
        !tabUpdated
      ) {
        tabUpdated = true;
        const newMovieSearch = [tab.title];

        const newURL = `${url}${
          tab.title.split(" - ")[0]
        }&language=en-US&page=1`;

        fetch(newURL, options)
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            if (json.results.length > 0) {
              json.results.map((result: result) => {
                // update state when result fetched successfully
                store.dispatch(
                  addMovie({
                    movieName: result.title,
                    release_date: result.release_date,
                    overview: result.overview,
                    vote_average: Math.round(result.vote_average * 10) / 10,
                    id: result.id,
                  })
                );
              });
            }
            // store movie title in local so next time no need to search again
            chrome.storage.local.set({
              urls: newMovieSearch,
            });
            tabUpdated = true;
          });
      } else {
        if (
          tabUpdated &&
          Object.keys(URL).length > 0 &&
          !URL.urls.includes(tab.title)
        ) {
          tabUpdated = false;
          URL.urls.push(tab.title);

          const newURL = `${url}${
            tab.title.split(" - ")[0]
          }&language=en-US&page=1`;

          fetch(newURL, options)
            .then((res) => {
              return res.json();
            })
            .then((json) => {
              if (json.results.length > 0) {
                json.results.map((result: result) => {
                  // update state when result fetched successfully
                  store.dispatch(
                    addMovie({
                      movieName: result.title,
                      release_date: result.release_date,
                      overview: result.overview,
                      vote_average: Math.round(result.vote_average * 10) / 10,
                      id: result.id,
                    })
                  );
                });
              }
              tabUpdated = true;
              chrome.storage.local.set({
                urls: URL.urls,
              });
            });
        }
      }
    });
  }
}

// whenever new search made this would be triggered
chrome.tabs.onUpdated.addListener(searchUpdated);
