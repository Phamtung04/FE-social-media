import {Button, TextField} from "@mui/material";
import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useDispatch} from 'react-redux'
import {loginUserAction} from "../../Redux/Auth/auth.action";

const initialValues = {username: "", password: ""};
const validationSchema = Yup.object({
    username: Yup.string().trim().required("Tên đăng nhập không được để trống"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});
const Login = () => {
    // const [formValue, setFormValue] = useState();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (value) => {
        const loginData = {
            data: value
        }
        dispatch(loginUserAction(loginData))
    };


    return (
        <>
            <Formik
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={initialValues}
            >
                <Form className="space-y-5">
                    <div className="space-y-5">
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
                    </div>
                    <Link to="/forgot-pw" className="justify-end flex">Forgot password</Link>
                    <Button
                        sx={{padding: ".8rem 0rem"}}
                        fullWidth
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                </Form>
            </Formik>
            <div className="flex gap-2 items-center justify-center pt-5">
                <p>if you don't have account?</p>
                <button onClick={() => navigate("/register")}>Register</button>
            </div>
        </>
    );
};

export default Login;
