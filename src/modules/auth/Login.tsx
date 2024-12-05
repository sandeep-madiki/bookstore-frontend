import React, { useState } from "react";
import "./auth.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [pwErr, setPWErr] = useState(false);
  const [pwErrMsg, setPWErrMsg] = useState("");
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
      const response: any = await axios.post(
        "http://localhost:4545/api/auth/login",
        data
      );
      if (response.http_code === 401) {
        console.log("first", response.http_code);
      }

      const loginData = {
        user: response.data.user.email,
        token: response.data.token,
      };
      dispatch(login(loginData));
      return response.data;
    } catch (error) {
      if (error.response.data.http_code === 401) {
        setPWErr(true);
        setPWErrMsg(error.response.data.status_message);
      }
      // Handle any errors that occur during the request
      console.error("Error logging in:", error);
      throw error;
    }
  };

  return (
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
          <div className="" style={{ position: "relative" }}>
            <Field
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="input w-full px-4 py-2 border rounded-lg pr-10"
              placeholder="Enter password"
            />
            <span
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-60%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(false)} />
              ) : (
                <FaEye onClick={() => setShowPassword(true)} />
              )}
            </span>
          </div>

          <div className="text-danger err-msg">
            <ErrorMessage name="password" />
          </div>

          <button className="button w-100" type="submit">
            Sign In
          </button>

          {pwErr && <div className="text-danger m-0">{pwErrMsg}</div>}

          <p style={{ color: "#fff" }}>
            Don't have an account?{" "}
            <Link
              to="/auth/registration"
              className="text-primary"
              style={{ cursor: "pointer" }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </Form>
    )}
  </Formik>
  );
}

export default Login;
