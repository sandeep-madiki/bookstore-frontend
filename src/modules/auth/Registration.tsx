import React, {useState} from 'react'
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Registration = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [pwErr, setPWErr] = useState(false);
    const [pwErrMsg, setPWErrMsg] = useState("");
    const LoginSchema = Yup.object().shape({
      firstName: Yup.string()
        .required("firstName is required"),
        lastName: Yup.string()
        .required("LastName is required"),
      password: Yup.string()
        .min(3, "Password must be 3 characters at minimum")
        .required("Password is required"),
    });

    const handleOnSubmit = (values: any) => {
        console.log(values)
    }
  return (
   <div className='w-md-50'>
     <Formik
          initialValues={{ firstName: "", lastName: '', password: "" }}
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
                <h1 className="login-text">Create Account</h1>
                <label htmlFor="firstName" className="label">
                  Firstname
                </label>
                <Field
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="input"
                  placeholder="Enter firstname"
                />
                <div className="text-danger err-msg">
                  <ErrorMessage name="firstName" />
                </div>

                <label htmlFor="lastName" className="label">
                  Lastname
                </label>
                <Field
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="input"
                  placeholder="Enter lastname"
                />
                <div className="text-danger err-msg">
                  <ErrorMessage name="lastName" />
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
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
   </div>
  )
}

export default Registration