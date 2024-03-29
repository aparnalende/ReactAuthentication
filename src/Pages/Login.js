import React, { useState } from "react";
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
import { setUser } from "../Redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
const loginFormSchema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    // .usernameOrEmail("Please enter valid usernameOrEmail address")
    .required("usernameOrEmail address is required"),
  password: yup.string().required("Password is required"),
});
let userData = "";
const Login = (prop) => {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });
  const dispatch = useDispatch();

  const submitFormData = (data) => {
    Logger.info(data);
    axios
      .post("http://localhost:8080/api/auth/signin", data)
      .then((response) => {
        userData = response?.data?.user;
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(setUser(userData));
        navigate("/restoList");
      })
      .catch((error) => {
        console.log("error", error);
        reset({
          usernameOrEmail: "",
          password: "",
        });
        navigate("/");
      });
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const authUser = useSelector((state) => state.user.userObj);
  console.log("Auth User", authUser);
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
                <h1 className="page-title">LOG IN</h1>
                <form onSubmit={handleSubmit(submitFormData)}>
                  <div className="form-group">
                    <label htmlFor="usernameOrEmailid" className="login-label">
                      Username <span className="mandatory">*</span>
                    </label>
                    <TextField
                      className={`input-field ${
                        errors.usernameOrEmail && "input-error"
                      }`}
                      id="outlined-basic"
                      placeholder="Enter username "
                      variant="outlined"
                      autoComplete={"off"}
                      {...register("usernameOrEmail")}
                      //   helperText={errors.usernameOrEmail ? errors.usernameOrEmail.message : " "}
                    />
                    <p className={`password-error-1`}>
                      {errors?.usernameOrEmail ? (
                        errors.usernameOrEmail?.message
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
                        autoComplete={"off"}
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
                      Log In
                    </button>
                    <div className="forget-link">
                      <a
                        // href="/forgetPassword"
                        href="/signup"
                        onClick={() => navigateToForgetPassword()}
                        className="tag"
                      >
                        {/* Forget password ? */}
                        Don't have an account?
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

export default Login;
