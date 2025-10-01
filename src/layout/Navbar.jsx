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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLoggedIn = false;

  return (
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
            {isLoggedIn && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="ghost"
                  cursor="pointer"
                  minW={0}
                >
                  <Avatar
                    size="sm"
                    src="https://avatars.dicebear.com/api/male/username.svg"
                  />
                </MenuButton>
                <MenuList alignItems="center">
                  <Center mt={3} mb={2}>
                    <Avatar
                      size="2xl"
                      src="https://avatars.dicebear.com/api/male/username.svg"
                    />
                  </Center>
                  <Center mb={3}>
                    <Text fontWeight="semibold">Username</Text>
                  </Center>
                  <MenuDivider />
                  <MenuItem>Your Posts</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            )}

            {/* If not logged in → show Sign In / Sign Up */}
            {!isLoggedIn && (
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
  );
}
