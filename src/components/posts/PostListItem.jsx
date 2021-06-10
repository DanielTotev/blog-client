import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

export default function PostListItem({ title, summary, id }) {
  return (
    <Card style={{ width: "36rem" }} className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{summary}</Card.Text>
        <Link to={`post/details/${id}`}>Details</Link>
      </Card.Body>
    </Card>
  );
}
