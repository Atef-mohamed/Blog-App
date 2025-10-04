import PostCard from "../components/PostCard";
import { Box, Flex } from "@chakra-ui/react";
import { useGetPostsQuery } from "../app/features/postsSlice/PostApiSlice";
import PostSkeleton from "../components/PostSkeleton";
import AddPost from "../components/AddPost";
import CookieService from "../services/cookies";

const HomePage = () => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const isLoggedIn = CookieService.get("jwt");
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
  const sortedPosts = [...posts].sort((a, b) => b.id - a.id);
  return (
    <>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyItems="center"
        gap={6}
        marginTop={10}
      >
        {sortedPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </Flex>
      {isLoggedIn && <AddPost />}

    </>
  );
};

export default HomePage;
