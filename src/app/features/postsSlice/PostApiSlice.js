import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApiSlice = createApi({
  reducerPath: "Posts",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    // Get All Posts
    getPosts: builder.query({
      query: () => ({
        url: "/posts?_expand=user",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((post) => ({ type: "Posts", id: post.id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    // Delete Post
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    // Update Post
    updatePost: builder.mutation({
      query: ({ id, postData }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body: postData,
      }),

      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        // Optimistic update
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData("getPosts", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    // Add Post
    addPost: builder.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "POST",
        body: postData,
      }),

      async onQueryStarted(postData, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            draft.unshift({
              ...postData,
              id: Date.now(),
            });
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },

      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useAddPostMutation,
} = postApiSlice;
