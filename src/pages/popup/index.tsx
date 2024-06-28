import React from "react";
import Popup from "./app";
import { Provider } from "react-redux";
import { createUIStore } from "redux-webext";
import ReactDOM from "react-dom";

async function init() {
  const store = await createUIStore();
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);

  ReactDOM.render(
    <Provider store={store}>
      <Popup />
    </Provider>,
    mountNode
  );
}

init();
