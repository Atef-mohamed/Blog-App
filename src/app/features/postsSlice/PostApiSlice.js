import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApiSlice = createApi({
  reducerPath: "posts",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/posts",
      }),
    }),
  }),
});

export const {useGetPostsQuery} = postApiSlice;
