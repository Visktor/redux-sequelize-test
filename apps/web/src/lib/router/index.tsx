import { Login } from "#/pages/login";
import { createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/Home",
    lazy: async () => {
      const { Home } = await import("#/pages/home");
      return {
        Component: Home,
      };
    },
  },
]);

export { appRouter };
