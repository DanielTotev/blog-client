import React from "react";
import { ListGroup } from "react-bootstrap";
import CommentListItem from "./CommentListItem";

export default function CommentList({ comments, revalidatePostData }) {
  return (
    <ListGroup>
      {comments.map((c) => (
        <CommentListItem
          comment={c}
          key={c.id}
          revalidateData={revalidatePostData}
        />
      ))}
    </ListGroup>
  );
}
