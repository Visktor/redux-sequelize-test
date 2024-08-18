import { useAppDispatch, useAppSelector } from "#/lib/redux/hooks";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Center,
  Button,
  InputRightElement,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";
import {
  setEmail,
  setPassword,
  setShowPassword,
  setErrors,
} from "#/context/login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import { validateLoginInputs } from "./validation";

function Login() {
  const { email, password, showPassword, inputErrors } = useAppSelector(
    (state) => state.login,
  );

  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    ({ email, password }: { email: string; password: string }) => {
      const validationResult = validateLoginInputs({ email, password });

      if (!validationResult.success) {
        dispatch(setErrors(validationResult.errors));
      }

      // TODO: api call to login
    },
    [],
  );

  return (
    <Center
      w={"30%"}
      maxW="680px"
      ml="auto"
      bg="white"
      borderRadius="md"
      boxShadow="md"
      p={4}
      minW="400px"
    >
      <SimpleGrid gap={6}>
        <FormControl isInvalid={!!inputErrors.email}>
          <FormLabel>Email address</FormLabel>
          <Input
            value={email}
            onChange={(e) => {
              dispatch(setEmail(e.target.value));
            }}
            type="email"
          />
          <FormErrorMessage>{inputErrors.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!inputErrors.password}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              value={password}
              onChange={(e) => {
                dispatch(setPassword(e.target.value));
              }}
              type={showPassword ? "text" : "password"}
            />
            <InputRightElement>
              <IconButton
                aria-label="show or hide password"
                onClick={() => {
                  dispatch(setShowPassword());
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </IconButton>
            </InputRightElement>
          </InputGroup>

          <FormErrorMessage>{inputErrors.password}</FormErrorMessage>
        </FormControl>
        <Button onClick={() => handleSubmit({ email, password })}>Login</Button>
      </SimpleGrid>
    </Center>
  );
}

export { Login };
