import { createBrowserRouter, redirect } from "react-router-dom";
import Country from "../views/country";
import DetailCountry from "../views/detailCountry";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "",
        element: <Country />,
      },
      {
        path: "/:countryName",
        element: <DetailCountry />,
      },
    ],
  },
]);

export default router;
