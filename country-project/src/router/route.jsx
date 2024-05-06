import { createBrowserRouter, redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    children: [
      {
        path: "",
        element: <Country />,
      },
    ],
  },
]);

export default router;
