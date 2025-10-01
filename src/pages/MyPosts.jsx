import React from "react";
import { Navigate } from "react-router-dom";

const MyPosts = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <div>my posts</div>;
};

export default MyPosts;
