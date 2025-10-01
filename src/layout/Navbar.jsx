import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  HStack,
  IconButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import CookieService from "../services/cookies";
import { FiBell, FiChevronDown } from "react-icons/fi";
import CustomAlertDailog from "../shared/CustomAlertDailog";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.900");
  const bg2 = useColorModeValue("gray.200", "gray.700");

  const user = CookieService.get("user");

  const onOkHandler = () => {
    CookieService.remove("jwt", { path: "/" });
    CookieService.remove("user", { path: "/" });
    window.location.reload();
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={{ base: 4, md: 8 }}
        boxShadow="sm"
        position="sticky"
        top="0"
        zIndex="10"
      >
        <Flex
          h={16}
          alignItems="center"
          justifyContent="space-between"
          maxW="1200px"
          mx="auto"
        >
          {/* Logo */}
          <Text
            as={Link}
            to="/"
            fontSize="xl"
            fontWeight="bold"
            color={useColorModeValue("blue.500", "blue.300")}
          >
            Blog-App
          </Text>

          <Flex alignItems="center">
            <Stack direction="row" spacing={5} align="center">
              {/* mode toggle */}
              <Button
                onClick={toggleColorMode}
                variant="ghost"
                size="sm"
                aria-label="Toggle color mode"
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {/* If logged in → show avatar menu */}
              {user && (
                <HStack spacing={{ base: "0", md: "6" }}>
                  <Flex alignItems={"center"}>
                    <Menu>
                      <MenuButton
                        py={2}
                        transition="all 0.3s"
                        _focus={{ boxShadow: "none" }}
                      >
                        <HStack>
                          <Avatar
                            size={"sm"}
                            src={
                              "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                            }
                          />
                          <VStack
                            display={{ base: "none", md: "flex" }}
                            alignItems="flex-start"
                            spacing="1px"
                            ml="2"
                          >
                            <Text fontSize="sm">
                              {user?.name || "UserName"}
                            </Text>
                            {/* <Text fontSize="xs" color="gray.600">
                          Admin
                        </Text> */}
                          </VStack>
                          <Box display={{ base: "none", md: "flex" }}>
                            <FiChevronDown />
                          </Box>
                        </HStack>
                      </MenuButton>
                      <MenuList bg={bg} borderColor={bg2}>
                        <MenuItem as={Link} to="/myposts">
                          My Posts
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                          onClick={() => {
                            onOpen();
                          }}
                        >
                          Logout
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </HStack>
              )}

              {/* If not logged in → show Sign In / Sign Up */}
              {!user && (
                <Stack direction="row" spacing={4}>
                  <Button
                    as={Link}
                    to="/login"
                    variant="ghost"
                    fontWeight={500}
                    size="sm"
                  >
                    Sign In
                  </Button>
                  <Button
                    as={Link}
                    to="/signup"
                    colorScheme="blue"
                    fontWeight="semibold"
                    size="sm"
                    px={5}
                  >
                    Sign Up
                  </Button>
                </Stack>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <CustomAlertDailog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title={"Are You Sure?"}
        description={"You will be logged out from the application!"}
        cancelTxt={"Cancel"}
        okTxt={"Ok"}
        onOkHandler={onOkHandler}
      />
    </>
  );
}
