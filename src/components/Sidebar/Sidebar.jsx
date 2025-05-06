import React from "react";
import { navigationMenu } from "./SidebarNavigation";
import { Avatar, Button, Card, Divider, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getProfileAction, logoutAction} from "../../Redux/Auth/auth.action";

const Sidebar = () => {
  const auth = useSelector(store => store.auth?.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const formatId = (str) =>
    str
      .normalize("NFD") // Chuẩn hóa Unicode
      .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
      .replace(/[^\w\s]/g, "") // Xóa dấu câu
      .replace(/\s+/g, "") // Xóa khoảng trắng



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNavigate = (item) => {
    switch(item.title){
    case "Home":
      navigate(`/`);
      break;
    case "Profile":
      navigate(`/profile/${auth?.id}`);
      break;
    case "Reels":
      navigate(`/reels`);
      break;
    case "Create Reels":
      navigate(`/create-reels`);
      break;
    case "Message":
      navigate(`/message`);
      break;
    default:
      break;
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutAction()); // Xóa token
    navigate("/"); // Chuyển hướng đến trang đăng nhập
  };

  const handleProfile = () => {
    navigate(`/profile/${auth?.id}`);
  };


  return (
    <Card className="card h-screen flex flex-col justify-between py-5">
      <div className="space-y-8 pl-5">
        <div className="">
          <span className="logo font-bold text-xl"> Meida Social</span>
        </div>
        <div className="space-y-8 ">
          {navigationMenu.map((item, index) => (
            <div key={index} onClick={() => handleNavigate(item)} className="cursor-pointer flex space-x-3 items-center">
              {item.icon}

              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Divider />
        <div className="pl-5 flex items-center justify-between pt-5">
          <div className="flex items-center space-x-3">
            <Avatar src={auth?.avatar}/>
            <div>
              <p className="font-bold">{auth?.firstName + " " + auth?.lastName}</p>
              <p className="opacity-70">
                @{formatId(auth?.firstName?.toLowerCase() ?? '') + "_" + formatId(auth?.lastName?.toLowerCase() ?? '')}
              </p>
            </div>
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem> 
          </Menu>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
