import { DeepPartial, Theme, extendTheme } from "@chakra-ui/react";

const chakraLightTheme: DeepPartial<Theme> = extendTheme({
  config: {
    useSystemColorMode: true,
  },
});

export { chakraLightTheme };
