import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Description from "./Description.jsx";
import StudyGoals from "./StudyGoals.jsx";
import RequiredKnowledge from "./RequiredKnowledge.jsx";
import ToC from "./ToC.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <Description /> },
      { path: "studyGoals", element: <StudyGoals /> },
      { path: "requiredKnowledge", element: <RequiredKnowledge /> },
      { path: "toc", element: <ToC /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider {...{ router }} />
  </React.StrictMode>
);
