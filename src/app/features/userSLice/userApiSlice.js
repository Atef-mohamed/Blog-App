import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "AuthApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-back-production-f88f.up.railway.app",
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: { name: data.name, email: data.email, password: data.password },
      }),
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation } = userApiSlice;
