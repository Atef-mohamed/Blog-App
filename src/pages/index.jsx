import PostCard from "../components/PostCard";
import { SimpleGrid } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/react";
import { useGetPostsQuery } from "../app/features/postsSlice/PostApiSlice";
import PostSkeleton from "../components/PostSkeleton";
import AddPostButton from "../components/AddPostButton";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const navigate = useNavigate();
  // console.log(posts);
  
  if (isLoading)
    return (
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyItems="center"
        gap={6}
        marginTop={10}
      >
        {Array.from({ length: 10 }, (_, idx) => (
          <PostSkeleton key={idx} />
        ))}
      </Flex>
    );

  return (
    <>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyItems="center"
        gap={6}
        marginTop={10}
      >
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </Flex>
      <AddPostButton onClick={() => navigate("/add-post")} />
    </>
  );
};

export default HomePage;
