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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import CookieService from "../services/cookies";
import { useDeletePostMutation } from "../app/features/postsSlice/PostApiSlice";
import CustomAlertDailog from "../shared/CustomAlertDailog";
import { useEffect } from "react";

const PostCard = ({ id, title, image, description, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const loggedUser = CookieService.get("user");
  const isOwner = loggedUser && loggedUser.id === user?.id;
  const [destroyPost, { isLoading: isDestroy ,isSuccess }] =
    useDeletePostMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast({
        title: "Deleted Successfully",
        description: `Blog with id, ${id} deleted!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }, [isSuccess]);

  const handleDelete = async () => {
    try {
      await destroyPost(id).unwrap();
    } catch (err) {
      toast({
        title: "Deleted Failed",
        description: err?.data || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <>
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
        <Image
          src={image}
          alt={title}
          objectFit="cover"
          maxH="250px"
          w="100%"
        />

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
            <Avatar name={user?.name} size="sm" />
            <Box>
              <Text fontSize="sm" fontWeight="bold">
                {user?.name || "Unknown Auther"}
              </Text>
            </Box>
          </Flex>

          {isOwner && (
            <Flex gap={2}>
              <IconButton
                aria-label="Edit Post"
                icon={<FiEdit />}
                size="md"
                colorScheme={"blue"}
                variant="ghost"
              />
              <IconButton
                onClick={() => onOpen()}
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
      <CustomAlertDailog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        title="Are You Sure?"
        description="You want to delete this post!"
        okTxt="Delete"
        isLoading={isDestroy}
        onOkHandler={handleDelete}
      />
    </>
  );
};

export default PostCard;
