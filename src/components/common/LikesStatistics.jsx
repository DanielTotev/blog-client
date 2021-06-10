import React from "react";
import { fetcher } from "./../../utils/fetchUtils";
import { toast } from "react-toastify";
import "./LikeStatistics.css";

const LikesStatistics = ({ data, likeUrl, revalidateData }) => {
  const like = () => {
    fetcher(likeUrl, {
      method: "PUT",
      body: JSON.stringify({ ...data, likes: data.likes + 1 }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        revalidateData();
        toast.success("Like added successfull!");
      })
      .catch(() => {
        toast.error("Some error occured");
      });
  };
  const dislike = () => {
    fetcher(likeUrl, {
      method: "PUT",
      body: JSON.stringify({ ...data, dislikes: data.dislikes + 1 }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        revalidateData();
        toast.success("Dislike added successfull!");
      })
      .catch(() => {
        toast.error("Some error occured");
      });
  };
  return (
    <div className="LikeStatistics">
      <span>{data.likes}</span>{" "}
      <i className="fas fa-thumbs-up" onClick={like}></i>{" "}
      <span>{data.dislikes}</span>{" "}
      <i className="fas fa-thumbs-down" onClick={dislike}></i>
    </div>
  );
};

export default LikesStatistics;
