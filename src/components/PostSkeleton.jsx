import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Flex,
} from "@chakra-ui/react";

const PostSkeleton = () => {
  return (
    <Card
      w={{ base: "100%", sm: "400px", md: "550px" }}
      minH="400px"
      borderRadius="xl"
      boxShadow="md"
      bg="white"
      overflow="hidden"
    >
      {/* image */}
      <Skeleton height="200px" w="100%" />

      <CardBody>
      {/* title */}
        <Skeleton height="20px" mb={3} w="70%" />
        {/* discriptooon */}
        <SkeletonText noOfLines={3} spacing="3" skeletonHeight="3" />
      </CardBody>

      <CardFooter
        borderTop="1px solid"
        borderColor="gray.200"
        justify="space-between"
        align="center"
        mt="auto"
      >
        {/* Author photo*/}
        <Flex align="center" gap={3}>
          <SkeletonCircle size="8" />
          <Skeleton height="14px" w="100px" />
        </Flex>

        {/* buttons*/}
        <Flex gap={2}>
          <Skeleton height="24px" w="24px" borderRadius="md" />
          <Skeleton height="24px" w="24px" borderRadius="md" />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default PostSkeleton;
