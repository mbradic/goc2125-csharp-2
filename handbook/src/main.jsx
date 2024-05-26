import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Anotation from "./Anotation.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [{ path: "", element: <Anotation /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider {...{ router }} />
  </React.StrictMode>
);
