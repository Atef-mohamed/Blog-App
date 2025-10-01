import { IconButton } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";

const AddPostButton = ({ onClick }) => {
  return (
    <IconButton
      aria-label="Add Post"
      icon={<FiPlus size={24} />}
      colorScheme="blue"
      borderRadius="full"
      size="lg"
      position="fixed"
      bottom="20px"
      right="20px"
      boxShadow="xl"
      zIndex={1000}
      onClick={onClick}
      _hover={{ transform: "scale(1.1)" }}
    />
  );
};

export default AddPostButton;
