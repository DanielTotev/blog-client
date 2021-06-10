import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { fetcher } from "../../utils/fetchUtils";

export default function ActionButtons({ apiUrl, deleteCallback, onEditClick }) {
  const onDeleteClick = () => {
    fetcher(apiUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        deleteCallback();
        toast.success("Deleted successfully!");
      })
      .catch(() => toast.error("Some error occured"));
  };
  return (
    <Row className="mb-4">
      <Col md={{ span: 2, offset: 10 }}>
        <Button variant="primary" onClick={onEditClick}>
          Edit
        </Button>{" "}
        <Button variant="danger" onClick={onDeleteClick}>
          Delete
        </Button>
      </Col>
    </Row>
  );
}
