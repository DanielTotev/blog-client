import React from "react";
import PostForm from "../components/posts/PostForm";
import { fetcher } from "../utils/fetchUtils";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function AddPost() {
  const history = useHistory();
  return (
    <PostForm
      onSubmit={(values) => {
        fetcher("https://localhost:44353/api/posts", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then(() => {
            toast.success("Post created successfull!");
            history.push("/");
          })
          .catch(() => {
            toast.error("Some error occured");
          });
      }}
    />
  );
}
