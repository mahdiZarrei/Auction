import { createBrowserRouter } from "react-router-dom";
import Auction from "../pages/Auction";
import Main from "../pages/Main";
import Page_404 from "../pages/404/404";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "Auction/:AuctionAddress",
    element: <Auction />,
  },
  { path: "*", element: <Page_404 /> },
]);
