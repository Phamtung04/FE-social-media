import React, {useEffect} from 'react'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {TextField} from "@mui/material";
import {data, Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {resetPasswordAction} from "../../Redux/Auth/auth.action";

const PasswordCode = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const initialValues = {
        password: "",
        confirmPassword: ""
    };
    const validationSchema = Yup.object({
        password: Yup.string().required("Mật khẩu không được để trống"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Mật khẩu không khớp").required("Mật khẩu không được để trống"),
    });

    const handleSubmit = (value) => {
        const email = localStorage.getItem("email");
        const response = {email, ...value}
        const passcode = {
            data: response
        };
        console.log(passcode.data)
        dispatch(resetPasswordAction(passcode.data))
    };

    useEffect(() => {
        if (auth.changePasswordSuccess) {
            navigate("/");
            localStorage.removeItem("email");
        }
    }, [auth.changePasswordSuccess, navigate]);


    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="space-y-5">
                    <div>
                        <Field
                            as={TextField}
                            name="password"
                            placeholder="Nhập password"
                            type="password"
                            variant="outlined"
                            fullWidth
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500"
                        />
                    </div>
                    <div>
                        <Field
                            as={TextField}
                            name="confirmPassword"
                            placeholder="Nhập confirmPassword"
                            type="password"
                            variant="outlined"
                            fullWidth
                        />
                        <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-red-500"
                        />
                    </div>
                    <p className="justify-end flex">Remember your password? <Link className="text-blue-500" to={'/'}>Login
                        here</Link></p>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                    >
                        Reset Password
                    </button>
                </Form>
            </Formik>

        </>
    )
}

export default PasswordCode