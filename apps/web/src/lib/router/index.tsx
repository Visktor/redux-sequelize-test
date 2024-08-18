import { AppLayout } from "#/pages/layout";
import { Login } from "#/pages/login";
import { createBrowserRouter } from "react-router-dom";

const appRouter = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
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
    ],
  },
]);

export { appRouter };
