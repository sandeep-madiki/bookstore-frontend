import React from "react";
import "./auth.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

function AuthMain() {
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .email("Invalid email address format")
      .required("Username is required"),
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
  });

  const encodePassword = (password) => {
    let encodedPassword = password;
    for (let i = 0; i < 3; i++) {
      encodedPassword = btoa(encodedPassword); // btoa() encodes the string to Base64
    }
    return encodedPassword;
  };

  const handleOnSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      // Encode the password in Base64 format three times
      const encodedPassword = encodePassword(values.password);

      // Prepare the data to send in the POST request
      const data = {
        username: values.username,
        password: encodedPassword,
      };

      // Make the POST request to the API
      const response = await axios.post(
        "http://localhost:4545/api/auth/login",
        data
      );

      // Handle the response from the API
      console.log("Login successful:", response.data);
      return response.data;
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error logging in:", error);
      throw error;
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row auth-main-con">
      <div className="login-con w-100 w-md-50 d-flex flex-column justify-content-center align-items-center">
        {/* <div className="w-50 p-4 py-5">
          <h3 className="fw-semibold">Sign In</h3> */}
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          enableReinitialize={true}
          onSubmit={handleOnSubmit}
        >
          {({ values }) => (
            <Form
              className="w-100"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
             <div className="form-con">
             <h1 className="login-text">LOG IN</h1>
              <label htmlFor="" className="label">
                Username
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                className="input"
                placeholder="Enter username"
              />
              <div className="text-danger err-msg">
                <ErrorMessage name="username" />
              </div>

              <label htmlFor="" className="label">
                password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                className="input"
                placeholder="Enter password"
              />
              <div className="text-danger err-msg">
                <ErrorMessage name="password" />
              </div>

              <button className="button w-100" type="submit">
                Sign In
              </button>

              <p style={{color: '#fff'}}>
                Don't have an account?{" "}
                <span className="text-primary" style={{cursor: 'pointer'}}>Sign Up</span>
              </p>
             </div>
            </Form>
          )}
        </Formik>
        {/* <p>
            Don't have an account? <span className="text-primary">Sign Up</span>
          </p>
        </div> */}
      </div>
      {/* <div className="login-con"> */}
      <div className="w-100 w-md-50">
       
      </div>
      {/* </div> */}
    </div>
  );
}

export default AuthMain;
