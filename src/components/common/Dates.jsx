import React from "react";
import { Row, Col } from "react-bootstrap";
import moment from "moment";

export default function Dates({ createdOn, updatedOn }) {
  return (
    <Row>
      {createdOn && (
        <Col md={2}>Created on {moment(createdOn).format("dd/mm/yyy")}</Col>
      )}
      {updatedOn && (
        <Col md={{ span: 2, offset: 8 }}>
          Updated on {moment(updatedOn).format("dd/mm/yyyy")}
        </Col>
      )}
    </Row>
  );
}
