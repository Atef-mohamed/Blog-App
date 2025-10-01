import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "AuthApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    userRegister: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: { name: data.name, email: data.email, password: data.password },
      }),
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation } = userApiSlice;
