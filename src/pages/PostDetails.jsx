import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import CommentList from "../components/comment/CommentList";
import CommentForm from "../components/comment/CommentForm";
import ActionButtons from "../components/common/ActionButtons";
import RequestStates from "../components/common/RequestStates";
import Post from "../components/posts/Post";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { fetcher } from "../utils/fetchUtils";

export default function PostDetails() {
  const { postId } = useParams();
  const history = useHistory();
  const { canPerformEditOrDelete } = useAuth();
  const API_URL = `https://localhost:44353/api/posts/${postId}`;
  const { data, error } = useSWR(API_URL);
  const revalidatePostData = () => mutate(API_URL);
  const deleteCallback = () => {
    history.push("/");
  };
  const onEditClick = () => {
    history.push(`/post/edit/${postId}`);
  };
  const addComment = ({ content }, { resetForm }) => {
    resetForm();
    fetcher("https://localhost:44353/api/comments", {
      method: "POST",
      body: JSON.stringify({ content, postId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        revalidatePostData();
        toast.success("Comment created successfull!");
      })
      .catch(() => {
        toast.error("Some error occured");
      });
  };
  return (
    <div className="container">
      <RequestStates data={data} error={error}>
        {canPerformEditOrDelete(data?.body?.postedBy) && (
          <ActionButtons
            apiUrl={API_URL}
            deleteCallback={deleteCallback}
            onEditClick={onEditClick}
          />
        )}
        <Post
          post={data?.body}
          revalidatePostData={revalidatePostData}
          postId={postId}
        />
        <CommentForm
          postId={postId}
          revalidatePostData={revalidatePostData}
          onSubmit={addComment}
        />
        <CommentList
          comments={data?.body?.comments}
          revalidatePostData={revalidatePostData}
        />
      </RequestStates>
    </div>
  );
}
