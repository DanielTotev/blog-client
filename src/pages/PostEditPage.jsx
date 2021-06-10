import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils/fetchUtils";
import { toast } from "react-toastify";
import RequestStates from "../components/common/RequestStates";
import PostForm from "../components/posts/PostForm";

export default function PostEditPage() {
  const { postId } = useParams();
  const url = `https://localhost:44353/api/posts/${postId}`;
  const { data, error } = useSWR(url);
  const history = useHistory();
  const onSubmit = (values) => {
    fetcher(url, {
      method: "PUT",
      body: JSON.stringify({
        ...data.body,
        ...values,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        toast.success("Post updated successfull!");
        history.push(`/post/details/${postId}`);
      })
      .catch(() => {
        toast.error("Some error occured");
      });
  };
  return (
    <RequestStates data={data} error={error}>
      <PostForm initialValues={data?.body} onSubmit={onSubmit} />
    </RequestStates>
  );
}
