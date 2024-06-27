import { createStore } from "redux";
import { createBackgroundStore } from "redux-webext";
import reducer from "./reducers";
import { addMovie } from "./actions";

const store = createStore(reducer);
let tabUpdated = false;

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

        store.dispatch(
          addMovie({
            movieName: tab.title,
          })
        );

        chrome.storage.local
          .set({
            urls: newArr,
          })
          .then(() => {
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

          store.dispatch(
            addMovie({
              movieName: tab.title,
            })
          );

          chrome.storage.local
            .set({
              urls: URL.urls,
            })
            .then(() => {
              tabUpdated = true;
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
