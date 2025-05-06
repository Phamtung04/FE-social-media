import { Grid } from "@mui/material";
import React, { useEffect } from "react";

import { Route, Routes, useLocation } from "react-router-dom";
import CreatReelsForm from "../../components/Reels/CreatReelsForm";
import Profile from "../Profile/Profile";
import Reels from "../../components/Reels/Reels";
import MiddlePart from "../../components/MiddlePart/MiddlePart";
import HomeRigth from "../../components/HomeRigth/HomeRigth";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../Redux/Auth/auth.action";
import { Store } from "@mui/icons-material";

const HomePage = () => {
  // const dispatch = useDispatch();
  const location = useLocation();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.user);

 

  return (
     <div className="px-20">
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3} >
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>

        <Grid
          lg={location.pathname === "/" ? 6 : 9}
          item
          className="px-5 flex justify-center"
          xs={12}
        >
          <Routes>
            <Route path="/" element={<MiddlePart />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/create-reels" element={<CreatReelsForm />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Grid>

        {location.pathname === "/" && <Grid item lg={3} className="relative">
          <div className="sticky top-0 w-full">
            <HomeRigth username={auth?.username} />
          </div>
        </Grid>}
      </Grid>
    </div>

  );
};

export default HomePage;
