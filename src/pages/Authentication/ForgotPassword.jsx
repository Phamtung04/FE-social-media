import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {forgotPasswordAction} from "../../Redux/Auth/auth.action";
import { TextField } from "@mui/material";
import React, {useEffect} from "react";

const initialValues = { email: "" };

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Không đúng định dạng email")
        .required("Email không được để trống"),
});

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);

    const handleSubmit = (value) => {
        const forgotData = {
            data: value
        };
        localStorage.setItem("email", value.email);
        dispatch(forgotPasswordAction(forgotData));
    };
    useEffect(() => {
        if (auth.forgotPasswordSuccess) {
            navigate("/password-code");
        }
    }, [auth.forgotPasswordSuccess, navigate]);

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
                            name="email"
                            placeholder="Nhập email"
                            type="email"
                            variant="outlined"
                            fullWidth
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500"
                        />
                    </div>
                    <p className="justify-end flex">Remember your password? <Link className="text-blue-500" to={'/'}>Login here</Link> </p>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                    >
                        Reset Password
                    </button>
                </Form>
            </Formik>

        </>
    );
};

export default ForgotPassword;
