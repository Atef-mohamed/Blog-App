import React, { useState } from "react";
import AddPostButton from "./AddPostButton";
import CustomModal from "../shared/Modal";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAddPostMutation } from "../app/features/postsSlice/PostApiSlice";
import CookieService from "../services/cookies";
import { uploadImageToImgBB } from "../services/uploadImageToImageBB";

const AddPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const loggedUser = CookieService.get("user");
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [isTitle, setIsTitle] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const [postImage, setPostImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };
  const handlePostImage = (e) => {
    setPostImage(e.target.files[0]);
  };

  const [addPost, { isLoading: isAdd }] = useAddPostMutation();

  const handleSubmit = async () => {
    if (!postData.title && !postData.description && !postImage) {
      setIsTitle(true);
      setIsDescription(true);
      setIsImage(true);
      return;
    }
    if (!postData.title) {
      setIsTitle(true);
      return;
    }
    setIsTitle(false);
    if (!postData.description) {
      setIsDescription(true);
      return;
    }
    setIsDescription(false);
    if (!postImage) {
      setIsImage(true);
      return;
    }
    setIsImage(false);

    try {
      // upload image to imgbb
      setIsUploading(true);
      const imageUrl = await uploadImageToImgBB(postImage);

      const newPost = {
        title: postData.title,
        description: postData.description,
        image: imageUrl,
        userId: loggedUser?.id,
      };

      await addPost(newPost).unwrap();

      toast({
        title: "Post Created",
        description: "Your post has been published!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      // reset form
      setPostData({ title: "", description: "", image: null });
      setPostImage(null);
      onClose();
    } catch (err) {
      toast({
        title: "Failed to Create Post",
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
      <AddPostButton onClick={() => onOpen()} />
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={"Add Post"}
        txtOk={"Add Post"}
        isLoading={isAdd || isUploading}
        onOkClick={handleSubmit}
      >
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Post Title"
            name="title"
            isInvalid={isTitle}
            errorBorderColor="crimson"
            onChange={handleChange}
            value={postData?.title}
          />
          <FormHelperText color="red.500" hidden={!isTitle}>
            Title is required.
          </FormHelperText>
        </FormControl>
        <FormControl my="3">
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder="enter your description"
            name="description"
            isInvalid={isDescription}
            errorBorderColor="crimson"
            onChange={handleChange}
            value={postData?.description}
          />
          <FormHelperText color="red.500" hidden={!isDescription}>
            description is required.
          </FormHelperText>
        </FormControl>
        <FormControl my="3">
          <FormLabel>Image</FormLabel>
          <Input
            isInvalid={isImage}
            errorBorderColor="crimson"
            onChange={handlePostImage}
            name="image"
            id="image"
            type="file"
            h={"full"}
            p={2}
            accept="image/png, image/gif, image/jpeg, image/jpg"
          />
          <FormHelperText color="red.500" hidden={!isImage}>
            image is required.
          </FormHelperText>
        </FormControl>
      </CustomModal>
    </>
  );
};

export default AddPost;
