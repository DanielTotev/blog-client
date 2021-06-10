import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { fetcher } from "../utils/fetchUtils";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .max(50, "Username can't be longer than 50 characters")
    .required("Username is required"),
  password: Yup.string().required("Password required"),
});

export default function Register() {
  const history = useHistory();
  const { saveAuthData } = useAuth();
  return (
    <div className="container">
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Formik
            initialValues={{
              username: "",
              password: "",
              repeatPassword: "",
              email: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              fetcher("https://localhost:44353/api/auth/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((data) => {
                  toast.success("Login successfull!");
                  saveAuthData(data.body);
                  history.push("/");
                })
                .catch(() => {
                  toast.error("Credentials don't match");
                });
            }}
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
                  <Form.Label>Username :</Form.Label>
                  <Form.Control
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      touched.username && errors.username ? "error" : null
                    }
                  />
                  {touched.username && errors.username ? (
                    <div className="error-message">{errors.username}</div>
                  ) : null}
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Password :</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    value={values.password}
                    className={
                      touched.password && errors.password ? "error" : null
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password ? (
                    <div className="error-message">{errors.password}</div>
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
    </div>
  );
}
