import { useAppDispatch, useAppSelector } from "#/lib/redux/hooks";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Center,
  Button,
} from "@chakra-ui/react";
import { setEmail, setPassword } from "#/context/login";

function Login() {
  const { email, password } = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();

  return (
    <Center
      w={"30%"}
      maxW="680px"
      ml="auto"
      bg="white"
      borderRadius="md"
      boxShadow="md"
      p={4}
    >
      <SimpleGrid gap={6}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input
            value={email}
            onChange={() => {
              dispatch(setEmail(email));
            }}
            type="email"
          />
          <FormErrorMessage />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            onChange={() => {
              dispatch(setPassword(password));
            }}
            value={password}
            type="password"
          />
          <FormErrorMessage />
        </FormControl>
        <Button>Login</Button>
      </SimpleGrid>
    </Center>
  );
}

export { Login };
