import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";
import { SITE_KEY } from "../configs/Keys";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";
import { signUpSchema } from "../schemas";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const DELAY = 1500;

function Registration() {
  const [load, setLoad] = useState(false);
  const [goToOtp, setGoToOTp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthYear: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(25).required("Please enter your name"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Please enter your email"),
      birthYear: Yup.string().required("Please select your year of birth"),
      password: Yup.string()
        .min(8, "Your password must contain a minimum of 8 characters")
        .required("Password is required")
        .matches(/[0-9]/, "It must include numbers")
        .matches(/[A-Z]/, "It must include capital letter")
        .matches(/[a-z]/, "It must include small letter")
        .matches(/[!@#$%^&*(,.{}/?<>)]/, "It must include special character"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password")],
          "Confirm Password must be match with new password"
        )
        .required("Confirm Password is required"),
    }),
  });

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, DELAY);
  }, []);

  const asyncScriptOnLoad = () => {
    // Your async script onLoad implementation
  };

  const handleSubmit = () => {
    formik.handleSubmit();
    if (formik.isValid && formik.dirty) {
      setGoToOtp(true);
    }
  };
  if (goToOtp) {
    return <Navigate to="/otp" />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Wrapper>
        <Box className="container">
          <Box className="modal">
            <Box className="modal-container">
              <Box className="modal-left">
                <h1 className="modal-title">Register</h1>
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <label htmlFor="name" className="input-label">
                    Name <span className="required">*</span>
                  </label>
                  <Box className="input-block">
                    <input
                      type="text"
                      autoComplete="off"
                      name="name"
                      id="name"
                      placeholder="Name Surname"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                  {formik.touched.name && formik.errors.name && (
                    <p className="form-error">{formik.errors.name}</p>
                  )}
                  <label htmlFor="email" className="input-label">
                    Email
                    <span className="required">*</span>
                  </label>
                  <Box className="input-block">
                    <input
                      type="email"
                      autoComplete="off"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Box>
                  {formik.touched.email && formik.errors.email && (
                    <p className="form-error">{formik.errors.email}</p>
                  )}
                  <label htmlFor="birthYear" className="input-label">
                    Year of Birth
                    <span className="required">*</span>
                  </label>
                  <Box className="input-block">
                    <select
                      name="birthYear"
                      id="birthYear"
                      value={formik.values.birthYear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select Birth Year</option>
                      {[...Array(100)].map((_, index) => {
                        const year = new Date().getFullYear() - index;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </Box>
                  {formik.touched.birthYear && formik.errors.birthYear && (
                    <p className="form-error">{formik.errors.birthYear}</p>
                  )}
                  <label htmlFor="password" className="input-label">
                    New Password <span className="required">*</span>
                  </label>
                  <Box className="input-block">
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="New Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </span>
                  </Box>
                  {formik.touched.password && formik.errors.password && (
                    <p className="form-error">{formik.errors.password}</p>
                  )}
                  <label htmlFor="confirmPassword" className="input-label">
                    Confirm New Password
                    <span className="required">*</span>
                  </label>
                  <Box className="input-block">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="off"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm New Password"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span
                      className="toggle-password"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </span>
                  </Box>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="form-error">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                  <Box className="modal-buttons">
                    <button
                      className="input-button"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Continue
                    </button>
                  </Box>
                  {load && (
                    <ReCAPTCHA
                      style={{ display: "inline-block" }}
                      theme="dark"
                      size="invisible"
                      sitekey={SITE_KEY}
                      onChange={() => {}} // Placeholder onChange function
                      asyncScriptOnLoad={asyncScriptOnLoad}
                    />
                  )}
                </form>
                <p className="sign-up">
                  Already have an account? <a href="/contents">Login</a>
                </p>
              </Box>
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  /* Your styles */
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #efedee;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    width: 100%;
    background: rgba(51, 51, 51, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.4s;
  }

  .modal-container {
    display: flex;
    max-width: 60vw;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    transition-duration: 0.3s;
    background: #fff;
  }

  .modal-left {
    padding: 60px 30px 20px;
    background: #fff;
    flex: 1.5;
    transition-duration: 0.5s;
    opacity: 1;
  }

  .modal-title {
    margin: 0;
    font-weight: 400;
    color: #1e1e1d;
    text-align: center;
  }

  .form-error {
    font-size: 0.7rem;
    color: #b22b27;
  }

  .required {
    color: red;
    margin-left: 2px;
  }

  .input-block {
    display: flex;
    flex-direction: column;
    padding: 10px 10px 10px;
    border: 1.9px solid #8692ed;
    border-radius: 12px;
    margin-bottom: 20px;
    transition: 0.3s;
    width: 100%;
    position: relative;
  }

  .input-block input {
    outline: 0;
    border: 0;
    padding: 4px 0 0;
    font-size: 14px;
  }

  .input-block select {
    outline: 0;
    border: 0;
    padding: 4px 0 0;
    font-size: 14px;
    cursor: pointer;
  }

  .toggle-password {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .toggle-password svg {
    width: 20px;
    height: 20px;
    color: #ccc;
  }

  .input-button {
    padding: 1.2rem 6.2rem;
    outline: none;
    text-transform: uppercase;
    border: 0;
    color: #fff;
    border-radius: 12px;
    background: #8692ed;
    transition: 0.3s;
    cursor: pointer;
    font-family: "Nunito", sans-serif;// Placeholder onChange function

  .input-button:hover {
    background: #55311c;
  }

  .sign-up {
    margin: 30px 0 0;
    font-size: 14px;
    text-align: center;
  }

  .sign-up a {
    color: #8692ed;
  }

  @media (max-width: 768px) {
    .modal-container {
      max-width: 90vw;
    }
  }
`;

const rootElement = document.getElementById("root");
ReactDOM.render(<Registration />, rootElement);

export default Registration;
