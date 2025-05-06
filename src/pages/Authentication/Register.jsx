import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerUserAction } from "../../Redux/Auth/auth.action";

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  gioiTinh: "",
  ngaySinh: "",

};
const validationSchema = {
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
};
const Register = () => {
  const [gioiTinh, setGioiTinh] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (value) => {
    value.gioiTinh = gioiTinh
    console.log("handle submit", value);

    dispatch(registerUserAction({ data: value }))
    navigate("/");
  };


  const handleChange = (event) => {
    setGioiTinh(event.target.value);

  };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        // validationSchema={validationSchema}
        initialValues={initialValues}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="firstName"
                placeholder="First Name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="firstName"
                component={"div"}
                className="text-red-500"
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="lastName"
                placeholder="Last Name"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="lastName"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="username"
                placeholder="username"
                type="text"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="username"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500"
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="ngaySinh"
                label="Ngày sinh"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: new Date().toISOString().split("T")[0], // Ngày tối đa là hôm nay
                }}
              />
              <ErrorMessage
                name="ngaySinh"
                component={"div"}
                className="text-red-500"
              />
            </div>

            <div>
              <RadioGroup
                onChange={handleChange}
                row
                aria-label="gioiTinh"
                name="gioiTinh"
              >
                <FormControlLabel
                  value="Nam"
                  control={<Radio />}
                  label="Nam"
                />
                <FormControlLabel
                  value="Nu"
                  control={<Radio />}
                  label="Nu"
                />
                <ErrorMessage
                  name="gioiTinh"
                  component={"div"}
                  className="text-red-500"
                />
              </RadioGroup>
            </div>
          </div>
          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </Form>
      </Formik>
      <div className="flex gap-2 items-center justify-center pt-5">
        <p>if you have already account?</p>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </>
  );
};

export default Register;
