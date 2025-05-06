import React, {useEffect} from 'react'
import {ErrorMessage, Field, Form, Formik} from "formik";
import {TextField} from "@mui/material";
import {data, Link, useNavigate} from "react-router-dom";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {verifyPasswordCodeAction} from "../../Redux/Auth/auth.action";

const PasswordCode = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const initialValues = {
        otp: "",
    };
    const validationSchema = Yup.object({
        otp: Yup.string()
            .required("Mã xác thực không được để trống"),
    })
    const handleSubmit = (value) => {
        const email = localStorage.getItem("email");
        const response = {email, ...value}
        const passcode = {
            data: response
        };
        console.log(passcode.data)
        // console.log(value)
        dispatch(verifyPasswordCodeAction(passcode.data))
    };

    useEffect(() => {
        if (auth.passwordCodeSuccess) {
            navigate("/change-pw");
        }
    }, [auth.passwordCodeSuccess, navigate]);

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
                            name="otp"
                            placeholder="Nhập code"
                            type="text"
                            variant="outlined"
                            fullWidth
                        />
                        <ErrorMessage
                            name="otp"
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