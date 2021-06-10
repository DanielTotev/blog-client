import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useSWR from "swr";
import { toast } from "react-toastify";
import { fetcher } from "../utils/fetchUtils";
import CommentForm from "../components/comment/CommentForm";
import RequestStates from "../components/common/RequestStates";

export default function CommentEdit() {
  const { commentId } = useParams();
  const url = `https://localhost:44353/api/comments/${commentId}`;
  const { data, error } = useSWR(url);
  const history = useHistory();
  const onSubmit = ({ content }) => {
    fetcher(url, {
      method: "PUT",
      body: JSON.stringify({
        ...data.body,
        content: content,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        toast.success("Comment updated successfull!");
        history.goBack();
      })
      .catch(() => {
        toast.error("Some error occured");
      });
  };
  return (
    <RequestStates data={data} error={error}>
      <div className="container">
        <h1>Comment Edit</h1>
        <CommentForm content={data?.body?.content} isEdit onSubmit={onSubmit} />
      </div>
    </RequestStates>
  );
}
