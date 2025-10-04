import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import CookieService from "../services/cookies";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../app/features/postsSlice/PostApiSlice";
import CustomAlertDailog from "../shared/CustomAlertDailog";
import { useEffect, useState } from "react";
import CustomModal from "../shared/Modal";
import { uploadImageToImgBB } from "../services/uploadImageToImageBB";

const PostCard = ({ id, title, image, description, user }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loggedUser = CookieService.get("user");
  const isOwner = loggedUser && loggedUser.id === user?.id;

  const [postToEdit, setPostToEdit] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [destroyPost, { isLoading: isDestroy, isSuccess }] =
    useDeletePostMutation();

  const [updatePost, { isLoading: isUpdate }] = useUpdatePostMutation();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast({
        title: "Deleted Successfully",
        description: `{Post ${id} deleted!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }, [isSuccess]);

  const handlePostToEdit = (e) => {
    const { name, value } = e.target;
    setPostToEdit({ ...postToEdit, [name]: value });
  };
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
  const handlePostImage = (e) => {
    setPostImage(e.target.files[0]);
  };

  const handleSubmitPostToEdit = async () => {
    try {
      setIsUploading(true);
      let imageUrl = postToEdit.image;
      if (postImage) {
        imageUrl = await uploadImageToImgBB(postImage);
      }

      const updatedData = {
        title: postToEdit.title,
        description: postToEdit.description,
        userId: loggedUser?.id,
        image: imageUrl,
      };

      await updatePost({
        id: postToEdit?.id,
        postData: updatedData,
      }).unwrap();

      toast({
        title: "Updated Successfully",
        description: `Post "${postToEdit.title}" has been updated!`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      onModalClose();
    } catch (err) {
      toast({
        title: "Update Failed",
        description: err?.data || "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsUploading(false);
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
                onClick={() =>
                  onModalOpen() &
                  setPostToEdit({ id, title, image, description })
                }
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

      <CustomModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        title={"Update Post"}
        txtOk={"Update"}
        isLoading={isUpdate || isUploading}
        onOkClick={handleSubmitPostToEdit}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Post Title"
            name="title"
            value={postToEdit?.title}
            onChange={handlePostToEdit}
          />
        </FormControl>
        <FormControl my="3">
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="enter your description"
            name="description"
            value={postToEdit?.description}
            onChange={handlePostToEdit}
          />
        </FormControl>
        <FormControl my="3">
          <FormLabel>Image</FormLabel>
          <Input
            onChange={handlePostImage}
            id="image"
            type="file"
            h={"full"}
            p={2}
            accept="image/png, image/gif, image/jpeg, image/jpg"
          />
        </FormControl>
      </CustomModal>
    </>
  );
};

export default PostCard;
