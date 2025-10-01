import {
  Button,
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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserRegisterMutation } from "../app/features/userSLice/userApiSlice";
export default function SignUp({ isAuthenticated }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const bg = useColorModeValue("white", "gray.800");
  const bg1 = useColorModeValue("gray.50", "gray.900");
  const bg2 = useColorModeValue("gray.100", "gray.700");

  const [registerUser, { isLoading }] = useUserRegisterMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name && !user.email && !user.password && !user.confirmPassword) {
      setIsName(true);
      setIsEmail(true);
      setIsPassword(true);
      setIsConfirmPassword(true);
      return;
    }
    if (!user.name) {
      setIsName(true);
      return;
    }
    setIsName(false);

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
    if (!user.confirmPassword) {
      setIsConfirmPassword(true);
      return;
    }
    if (user.password !== user.confirmPassword) {
      setIsConfirmPassword(true);
      return;
    }
    setIsConfirmPassword(false);
    try {
      const result = await registerUser({
        name: user.name,
        email: user.email,
        password: user.password,
      }).unwrap();
      toast({
        title: "SignUp Successful",
        description: `Welcome ${
          result.user?.name || "User"
        }! Please login to continue.`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setTimeout(() => {
        navigate("/login");
        window.location.reload();
      }, 2000);
      console.log(result);
    } catch (error) {
      toast({
        title: "Register Failed",
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
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Flex minH="80vh" align="center" justify="center" bg={bg1} px={4} py={10}>
      <Flex
        w={{ base: "100%", md: "900px" }}
        borderRadius="xl"
        boxShadow="2xl"
        overflow="hidden"
        bg={bg}
      >
        {/* Left side: Image */}
        <Flex flex={1} display={{ base: "none", md: "block" }}>
          <Image
            alt="Signup Image"
            objectFit="cover"
            w="100%"
            h="100%"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1352&q=80"
          />
        </Flex>

        {/* Right side: Form */}
        <Flex flex={1} p={8} align="center" justify="center">
          <Box w="full" maxW="md" as={"form"} onSubmit={handleSubmit}>
            <Stack spacing={6}>
              <Heading fontSize="3xl" textAlign="center">
                Create your account
              </Heading>

              <FormControl id="name">
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  focusBorderColor="blue.400"
                  bg={bg2}
                  isInvalid={isName}
                  errorBorderColor="crimson"
                  name={"name"}
                  value={user.name}
                  onChange={handleChange}
                />
                <FormHelperText color="red.500" hidden={!isName}>
                  Name is required.
                </FormHelperText>
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  focusBorderColor="blue.400"
                  bg={bg2}
                  isInvalid={isEmail}
                  errorBorderColor="crimson"
                  name={"email"}
                  value={user.email}
                  onChange={handleChange}
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
                    name={"password"}
                    value={user.password}
                    onChange={handleChange}
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

              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    focusBorderColor="blue.400"
                    bg={bg2}
                    isInvalid={isConfirmPassword}
                    errorBorderColor="crimson"
                    name={"confirmPassword"}
                    value={user.confirmPassword}
                    onChange={handleChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowConfirmPassword(
                          (showConfirmPassword) => !showConfirmPassword
                        )
                      }
                      p={0}
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible size={20} />
                      ) : (
                        <AiOutlineEye size={20} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText color="red.500" hidden={!isConfirmPassword}>
                  {user.confirmPassword === "" &&
                    "Confirm Password is required."}
                  {user.password !== user.confirmPassword &&
                    user.confirmPassword !== "" &&
                    "Passwords do not match."}
                </FormHelperText>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                w="full"
                _hover={{ bg: "blue.500" }}
                isLoading={isLoading}
              >
                Sign Up
              </Button>

              <Text textAlign="center" fontSize="sm">
                Already a user?{" "}
                <Link to="/login">
                  <Text
                    as="span"
                    color="blue.400"
                    fontWeight="medium"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Login
                  </Text>
                </Link>
              </Text>
            </Stack>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
