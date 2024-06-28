import { createStore } from "redux";
import { createBackgroundStore } from "redux-webext";
import reducer from "./reducers";
import { addMovie } from "./actions";

const store = createStore(reducer);

export default createBackgroundStore({
  store,
  actions: {
    MOVIE_ADD: addMovie,
  },
});
