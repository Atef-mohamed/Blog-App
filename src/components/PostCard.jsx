import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const PostCard = ({ title, image, description }) => {
  const author = "Atef Mohamed";
  const isLoggedIn = true;

  return (
    <Card
      w={{ base: "100%", sm: "400px", md: "550px" }}
      minH="400px"
      borderRadius="xl"
      boxShadow="md"
      bg={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("gray.800", "gray.100")}
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ boxShadow: "lg" }}
    >
      <Image src={image} alt={title} objectFit="cover" maxH="250px" w="100%" />

      <CardBody>
        <Heading
          size="md"
          mb={2}
          noOfLines={1}
          color={useColorModeValue("gray.800", "blue.300")}
        >
          {title}
        </Heading>
        <Text
          noOfLines={3}
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.300")}
        >
          {description}
        </Text>
      </CardBody>

      <CardFooter
        borderTop="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        justify="space-between"
        align="center"
        mt="auto"
      >
        <Flex align="center" gap={3}>
          <Avatar name={author} size="sm" />
          <Box>
            <Text fontSize="sm" fontWeight="bold">
              {author}
            </Text>
          </Box>
        </Flex>

        {isLoggedIn && (
          <Flex gap={2}>
            <IconButton
              aria-label="Edit Post"
              icon={<FiEdit />}
              size="md"
              colorScheme={"blue"}
              variant="ghost"
            />
            <IconButton
              aria-label="Delete Post"
              icon={<FiTrash2 />}
              size="md"
              colorScheme={"red"}
              variant="ghost"
            />
          </Flex>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
