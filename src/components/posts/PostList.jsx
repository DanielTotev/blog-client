import React from "react";
import PostListItem from "./PostListItem";

export default function PostList({ posts }) {
  return (
    <div className="container mt-4">
      {posts.map((p) => (
        <PostListItem key={p.id} {...p} />
      ))}
    </div>
  );
}
