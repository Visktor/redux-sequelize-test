import { RouterProvider } from "react-router-dom";
import { appRouter } from "./lib/router";
import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { chakraLightTheme } from "./lib/chakra/themes";

function App() {
  return (
    <StrictMode>
      <ChakraProvider theme={chakraLightTheme} resetCSS>
        <RouterProvider router={appRouter} />
      </ChakraProvider>
    </StrictMode>
  );
}

export default App;
