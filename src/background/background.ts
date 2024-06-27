import { createStore } from "redux";
import { createBackgroundStore } from "redux-webext";
import reducer from "./reducers";
import { addMovie } from "./actions";

const store = createStore(reducer);
let tabUpdated = false;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2ZlNDBmNGE5Y2JhZDlhM2VlNjNhOTJlMWViYjJkZiIsIm5iZiI6MTcxOTQ2Mzk2OS4xODA2OTEsInN1YiI6IjY2N2FiY2ZmNGY1NGI2YmMwNDhiZTQ4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rbJS5aF5MykuEhQMyI-36cqHaUl7ZimtBsV_BR6D0BI",
  },
};

const url = "https://api.themoviedb.org/3/search/movie?query=";

function searchUpdated(requestDetails, changeInfo, tab) {
  if (
    tab.status === "complete" &&
    tab.url !== undefined &&
    tab.url !== "chrome://newtab/"
  ) {
    chrome.storage.local.get("urls", function (URL) {
      // Iterate through this list here and match with tab.url, if the match is found, just return.
      if (
        Object.keys(URL).length === 0 &&
        URL.constructor === Object &&
        !tabUpdated
      ) {
        tabUpdated = true;
        const newArr = [tab.title];

        const newURL = `${url}${
          tab.title.split(" - ")[0]
        }&language=en-US&page=1`;

        fetch(newURL, options)
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            if (json.results.length > 0) {
              json.results.map((result) => {
                store.dispatch(
                  addMovie({
                    movieName: result.title,
                    release_date: result.release_date,
                    overview: result.overview,
                    vote_average: Math.round(result.vote_average * 10) / 10,
                    id: result.id,
                  })
                );

                chrome.storage.local
                  .set({
                    urls: newArr,
                  })
                  .then(() => {
                    tabUpdated = true;
                  });
              });
            } else {
              chrome.storage.local
                .set({
                  urls: newArr,
                })
                .then(() => {
                  tabUpdated = true;
                });
            }
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
                json.results.map((result) => {
                  store.dispatch(
                    addMovie({
                      movieName: result.title,
                      release_date: result.release_date,
                      overview: result.overview,
                      vote_average: Math.round(result.vote_average * 10) / 10,
                      id: result.id,
                    })
                  );

                  chrome.storage.local
                    .set({
                      urls: URL.urls,
                    })
                    .then(() => {
                      tabUpdated = true;
                    });
                });
              } else {
                chrome.storage.local
                  .set({
                    urls: URL.urls,
                  })
                  .then(() => {
                    tabUpdated = true;
                  });
              }
            });
        }
      }
    });
  }
}

chrome.tabs.onUpdated.addListener(searchUpdated);

export default createBackgroundStore({
  store,
  actions: {
    MOVIE_ADD: addMovie,
  },
});
