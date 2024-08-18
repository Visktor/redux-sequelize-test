import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <Box display={"flex"} w={"100vw"} h="100vh">
      <Outlet />
    </Box>
  );
}

export { AppLayout };
