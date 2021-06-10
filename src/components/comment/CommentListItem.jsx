import React from "react";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ActionButtons from "../common/ActionButtons";
import Dates from "../common/Dates";
import LikesStatistics from "../common/LikesStatistics";

export default function CommentListItem({ comment, revalidateData }) {
  const apiUrl = `https://localhost:44353/api/comments/${comment.id}`;
  const history = useHistory();
  const onEditClick = () => history.push(`/comment/edit/${comment.id}`);
  const { canPerformEditOrDelete } = useAuth();
  return (
    <ListGroup.Item>
      <div>{comment.content}</div>
      <LikesStatistics
        data={comment}
        likeUrl={apiUrl}
        revalidateData={revalidateData}
      />
      <div>Posted By {comment.createdBy}</div>
      {canPerformEditOrDelete(comment.createdBy) && (
        <ActionButtons
          apiUrl={apiUrl}
          deleteCallback={revalidateData}
          onEditClick={onEditClick}
        />
      )}
      <Dates updatedOn={comment.updatedOn} createdOn={comment.createdOn} />
    </ListGroup.Item>
  );
}
