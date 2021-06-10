import React from "react";
import useSWR from "swr";
import RequestStates from "../components/common/RequestStates";
import PostList from "../components/posts/PostList";

export default function Home() {
  const { data, error } = useSWR("https://localhost:44353/api/posts");
  return (
    <RequestStates data={data} error={error}>
      <PostList posts={data?.body} />
    </RequestStates>
  );
}
