import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .max(150, "Title can't be longer than 150 characters")
    .required("Title is required"),
  description: Yup.string()
    .max(3000, "Description can't be longer than 3000 characters")
    .required("Description is required"),
  imageUrl: Yup.string().max(
    3000,
    "Image Url can't be longer than 3000 characters"
  ),
});

export default function PostForm({
  onSubmit,
  initialValues = { title: "", description: "", imageUrl: "" },
}) {
  return (
    <Row>
      <Col md={{ span: 4, offset: 4 }}>
        <Formik
          initialValues={initialValues}
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
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Title :</Form.Label>
                <Form.Control
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.title && errors.title ? "error" : null}
                />
                {touched.title && errors.title ? (
                  <div className="error-message">{errors.title}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Description :</Form.Label>
                <Form.Control
                  name="description"
                  value={values.description}
                  as="textarea"
                  rows={12}
                  className={
                    touched.description && errors.description ? "error" : null
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.description && errors.description ? (
                  <div className="error-message">{errors.description}</div>
                ) : null}
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Image Url :</Form.Label>
                <Form.Control
                  name="imageUrl"
                  value={values.imageUrl}
                  className={
                    touched.imageUrl && errors.imageUrl ? "error" : null
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.imageUrl && errors.imageUrl ? (
                  <div className="error-message">{errors.imageUrl}</div>
                ) : null}
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mt-4"
                disabled={Object.keys(errors).length > 0}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
}
