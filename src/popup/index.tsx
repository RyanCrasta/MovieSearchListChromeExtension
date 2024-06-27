import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";
import Popup from "./popup";
import { Provider } from "react-redux";
import { createUIStore } from "redux-webext";

async function init() {
  const store = await createUIStore();
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);

  const root = createRoot(mountNode);

  root.render(
    <Provider store={store}>
      <Popup />
    </Provider>
  );
}

init();
