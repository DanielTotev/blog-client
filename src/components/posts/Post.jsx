import React from "react";
import { Card } from "react-bootstrap";
import LikesStatistics from "../common/LikesStatistics";
import Dates from "../common/Dates";

export default function Post({ post, revalidatePostData, postId }) {
  const { title, description, imageUrl, postedBy, createdOn, updatedOn } = post;
  return (
    <Card className="mb-4">
      <h2>{title}</h2>
      <LikesStatistics
        data={post}
        likeUrl={`https://localhost:44353/api/posts/${postId}`}
        revalidateData={revalidatePostData}
      />
      <div>Posted By {postedBy}</div>
      <Dates createdOn={createdOn} updatedOn={updatedOn} />
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
