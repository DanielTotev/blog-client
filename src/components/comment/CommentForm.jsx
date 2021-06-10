import React from "react";
import { Row, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  content: Yup.string()
    .max(3000, "Content can't be longer than 3000 characters")
    .required("Content is required"),
});
export default function CommentForm({ onSubmit, content = "", isEdit }) {
  return (
    <Row>
      <Formik
        initialValues={{ content }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group controlId="formPhone">
              <Form.Label>Content :</Form.Label>
              <Form.Control
                name="content"
                value={values.content}
                as="textarea"
                rows={12}
                className={touched.content && errors.content ? "error" : null}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.content && errors.content ? (
                <div className="error-message">{errors.content}</div>
              ) : null}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-4"
              disabled={Object.keys(errors).length > 0}
            >
              {isEdit ? "Edit Comment" : "Add comment"}
            </Button>
          </Form>
        )}
      </Formik>
    </Row>
  );
}
