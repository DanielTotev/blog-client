import React from "react";
import { Spinner } from "react-bootstrap";
import NetworkError from "./NetworkError";

export default function RequestStates({ data, error, children }) {
  if (error) {
    return <NetworkError />;
  }

  if (!data) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return children;
}
