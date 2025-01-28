import { createBrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pastes from "./pages/Paste";
import View from "./pages/View";
const Routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path:"/:id",element :<Home/>
  },

  {
    path: "/Pastes",
    element: <Pastes />,
  },
   {
        path: "/Pastes/:id",
        element: <View/>,
      },
      
    ],
  );
export default Routes;