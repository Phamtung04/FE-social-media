import { Card, Grid } from "@mui/material";
import React from "react";
import Login from "./Login"
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import PasswordCode from "./PasswordCode";
import ChangePassword from "./ChangePassword";

const Authentication = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={7} className="h-screen overflow-hidden">
          <img
            className="h-full w-full"
            src="https://cdn2.fptshop.com.vn/unsafe/640x0/filters:quality(100)/2022_4_14_637855277699664384_mang-xa-hoi-la-gi.jpg"
            alt="Background"
          />
        </Grid>

        <Grid item xs={5}>
          <div className="px-20 flex flex-col justify-center h-full">
            <Card className="card p-8">
              <div className="flex flex-col items-center mb-5 space-y-1">
                <h1 className="logo text-center">Media Social</h1>
                <p className="text-center text-sm w-[70&]">Connecting Lives, sharing stories: your social world, your way</p>
              </div>

              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-pw" element={<ForgotPassword />} />
                <Route path="/register" element={<Register />} />
                <Route path="/password-code" element={<PasswordCode />} />
                <Route path="/change-pw" element={<ChangePassword />} />
              </Routes>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Authentication;
