import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useColorModeValue,
  Box,
  InputGroup,
  InputRightElement,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useUserLoginMutation } from "../app/features/userSLice/userApiSlice";
import { useNavigate } from "react-router-dom";
import CookieService from "../services/cookies";
import { Navigate } from "react-router-dom";

export default function Login({ isAuthenticated }) {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const bg = useColorModeValue("white", "gray.800");
  const bg1 = useColorModeValue("gray.50", "gray.900");
  const bg2 = useColorModeValue("gray.100", "gray.700");
  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const [loginUser, { isLoading }] = useUserLoginMutation();

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!user.email && !user.password) {
      setIsEmail(true);
      setIsPassword(true);
      return;
    }
    if (!user.email) {
      setIsEmail(true);
      return;
    }
    setIsEmail(false);
    if (!user.password) {
      setIsPassword(true);
      return;
    }
    setIsPassword(false);

    const date = new Date();
    date.setTime(date.getTime() + 3 * 24 * 60 * 60 * 1000); //expire at 7 days
    try {
      const result = await loginUser(user).unwrap();
      CookieService.set("jwt", result.accessToken, {
        path: "/",
        expires: date,
      });
      CookieService.set("user", JSON.stringify(result.user), { path: "/" });
      toast({
        title: "Login Successful",
        description: `Welcome back, ${result.user?.name || "User"}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
      console.log(result);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error?.data || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
    console.log(user);
  };
  // Redirect if authenticated
  if (isAuthenticated) return <Navigate to="/" replace />;
  return (
    <Flex
      minH="calc(100vh - 4rem)"
      align="center"
      justify="center"
      bg={bg1}
      px={4}
    >
      <Flex
        w={{ base: "100%", md: "900px" }}
        borderRadius="xl"
        boxShadow="2xl"
        overflow="hidden"
        bg={bg}
      >
        {/* Left side: Form */}
        <Flex flex={1} p={8} align="center" justify="center">
          <Box as={"form"} w="full" maxW="md" onSubmit={handelSubmit}>
            <Stack spacing={6}>
              <Heading fontSize="3xl" textAlign="center">
                Sign in to your account
              </Heading>

              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  focusBorderColor="blue.400"
                  bg={bg2}
                  isInvalid={isEmail}
                  errorBorderColor="crimson"
                  onChange={handelChange}
                  name={"email"}
                  value={user.email}
                />
                <FormHelperText color="red.500" hidden={!isEmail}>
                  Email is required.
                </FormHelperText>
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    focusBorderColor="blue.400"
                    bg={bg2}
                    isInvalid={isPassword}
                    errorBorderColor="crimson"
                    onChange={handelChange}
                    name={"password"}
                    value={user.password}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                      p={0}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText color="red.500" hidden={!isPassword}>
                  Password is required.
                </FormHelperText>
              </FormControl>

              <Stack
                direction={{ base: "column", sm: "row" }}
                align="start"
                justify="space-between"
              >
                <Checkbox>Remember me</Checkbox>
                <Text
                  as="button"
                  color="blue.400"
                  fontWeight="sm"
                  // _hover={{ textDecoration: "underline" }}
                >
                  Forgot password?
                </Text>
              </Stack>

              <Button
                colorScheme="blue"
                size="lg"
                w="full"
                _hover={{ bg: "blue.500" }}
                type="submit"
                isLoading={isLoading}
              >
                Sign in
              </Button>
            </Stack>
          </Box>
        </Flex>

        {/* Right side: Image */}
        <Flex flex={1} display={{ base: "none", md: "block" }}>
          <Image
            alt="Login Image"
            objectFit="cover"
            w="100%"
            h="100%"
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1352&q=80"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
