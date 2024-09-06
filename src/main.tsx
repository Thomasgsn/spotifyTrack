import { redirect } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import * as React from "react";
import Home from "./pages/Home";
import Track from "./pages/Track";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import * as ReactDOM from "react-dom/client";

const RedirectToHome = () => {
  return redirect("/");
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/track/:track",
    element: <Track />,
  },
  {
    path: "/album/:album",
    element: <Album />,
  },
  {
    path: "/artist/:artist",
    element: <Artist />,
  },
  {
    path: "",
    element: <>{RedirectToHome()}</>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
