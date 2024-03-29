import React from "react";
import Slider from "../components/Slider";
import { TextField } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OutlinedInput } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";
import { Logger } from "../Logger/Logger";
import ForgetPassword from "./ForgetPassword";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const loginFormSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  fname: yup.string().required("First name is required"),
  lname: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Email address is required"),
  password: yup.string().required("Password is required"),
});

const SignUp = (prop) => {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const submitFormData = (data) => {
    Logger.info(data);
    Logger.info("called...");
    console.log("..................", data);
    axios
      .post("http://localhost:8080/api/auth/signup", data)
      .then((response) => console.log("response", response))
      .catch((error) => console.log("error", error));
    navigate("/");
  };

  const handleClickShowPassword = () => {};
  const handleMouseDownPassword = () => {};
  const navigateToForgetPassword = () => {
    {
      <ForgetPassword />;
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });
  return (
    <>
      <div className="page-wrapper">
        <div className="container">
          <div className="login-section">
            <div className="left-blk">
              <Slider />
            </div>
            <div className="right-blk">
              <div className="login-blk">
                <div className="logo"></div>
                <h1 className="page-title">Sign Up</h1>
                <form onSubmit={handleSubmit(submitFormData)}>
                  <div className="signup-namediv ">
                    {/* signup-namediv */}
                    <div className="name-div">
                      <label htmlFor="fname" className="login-label">
                        First Name <span className="mandatory">*</span>
                      </label>
                      <TextField
                        className={`input-field ${
                          errors.fname && "input-error"
                        }`}
                        id="outlined-basic"
                        placeholder="Enter first name"
                        variant="outlined"
                        autoComplete={"off"}
                        {...register("fname")}
                        //   helperText={errors.fname ? errors.fname.message : " "}
                      />
                      <p className={`password-error-1`}>
                        {errors?.fname ? (
                          errors.fname?.message
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p>
                    </div>

                    <div className="name-div">
                      <label htmlFor="lname" className="login-label">
                        Last Name <span className="mandatory">*</span>
                      </label>
                      <TextField
                        className={`input-field ${
                          errors.lname && "input-error"
                        }`}
                        id="outlined-basic"
                        placeholder="Enter last name"
                        variant="outlined"
                        autoComplete={"off"}
                        {...register("lname")}
                        //   helperText={errors.lname ? errors.lname.message : " "}
                      />
                      <p className={`password-error-1`}>
                        {errors?.lname ? (
                          errors.lname?.message
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="username" className="login-label">
                      Username <span className="mandatory">*</span>
                    </label>
                    <TextField
                      className={`input-field ${
                        errors.username && "input-error"
                      }`}
                      id="outlined-basic"
                      placeholder="Enter username id"
                      variant="outlined"
                      autoComplete={"off"}
                      {...register("username")}
                      //   helperText={errors.username ? errors.username.message : " "}
                    />
                    <p className={`password-error-1`}>
                      {errors?.username ? (
                        errors.username?.message
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailid" className="login-label">
                      Email Id <span className="mandatory">*</span>
                    </label>
                    <TextField
                      className={`input-field ${errors.email && "input-error"}`}
                      id="outlined-basic"
                      placeholder="Enter email id"
                      variant="outlined"
                      autoComplete={"off"}
                      {...register("email")}
                      //   helperText={errors.email ? errors.email.message : " "}
                    />
                    <p className={`password-error-1`}>
                      {errors?.email ? (
                        errors.email?.message
                      ) : (
                        <span>&nbsp;</span>
                      )}
                    </p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="login-label">
                      Password <span className="mandatory">*</span>
                    </label>
                    <div className="password-field">
                      <OutlinedInput
                        //   fullWidth
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className={`input-field ${
                          errors.password && "input-error"
                        }`}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              className="eye-btn"
                            >
                              {/* {!values.showPassword ? (
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/images/non-visibleicon.svg"
                                }
                                alt=""
                                class="img-fluid"
                              />
                            ) : (
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/images/visibleicon.svg"
                                }
                                alt=""
                                class="img-fluid"
                              />
                            )} */}
                            </IconButton>
                          </InputAdornment>
                        }
                        {...register("password")}
                      />
                      <p className={`password-error-1`}>
                        {errors?.password ? (
                          errors.password?.message
                        ) : (
                          <span>&nbsp;</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="submit-button-grp">
                    <button type="submit" className="smt-btn">
                      Sign Up
                    </button>
                    <div className="forget-link">
                      <a
                        href="/"
                        onClick={() => navigateToForgetPassword()}
                        className="tag"
                      >
                        Already have an account?
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
