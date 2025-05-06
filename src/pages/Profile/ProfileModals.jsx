import * as React from 'react';
import { Box, Button, Avatar, IconButton, TextField, Modal, Backdrop, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { updateProfileAction } from '../../Redux/Auth/auth.action';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  outline: 'none',
  overflowY: 'auto', // Cho phép cuộn nội dung
  borderRadius: 3,
};

export default function ProfileModals({ open, handleClose, user }) {
  const dispatch = useDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const handleSelectAvatar = async (event) => {
      setIsLoading(true);
      const imgUrl = await uploadToCloudinary(event.target.files[0], "image");
      setSelectedAvatar(imgUrl);
      setIsLoading(false);
      formik.setFieldValue("avatar", imgUrl)
    };
  const [selectedBackGround, setSelectedBackGround] = useState();
  const handleSelectBackGround = async (event) => {
    setIsLoading(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0], "image");
    setSelectedBackGround(imgUrl);
    setIsLoading(false);
    formik.setFieldValue("backGround", imgUrl)
  };


  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      ngaySinh: user?.ngaySinh || '',
      avatar: user?.avatar || '',
      backGround: user?.backGround || '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('Updated values', values);
      dispatch(updateProfileAction({ data: values }));
    },
  });

 

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              <p>Edit Profile</p>
            </div>
            <Button type="submit">Save</Button>
          </div>

          {/* Phần background */}
          <div className="relative h-[15rem]">
            <img
              className="w-full h-full rounded-t-md cursor-pointer"
              src={formik.values.backGround}
              alt="Cover"
              onClick={() => document.getElementById('background').click()}
            />
            <input
              id="background"
              type="file"
              accept='image/*'
              onChange={handleSelectBackGround}
              style={{ display: "none" }}
              />
              <label htmlFor="background"/>
          </div>

          {/* Phần Avatar */}
          <div className="pl-5 relative">
            <Avatar
              className="transform -translate-y-24 cursor-pointer"
              sx={{ width: '10rem', height: '10rem' }}
              src={
                formik.values.avatar 
              }
              onClick={() => document.getElementById('avatar').click()}
            />
            <input
              type="file"
              id="avatar"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleSelectAvatar}
             
              />
              <label htmlFor="avatar"/>
          </div>

          {/* Các trường thông tin */}
          <div className="space-y-3">
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              id="ngaySinh"
              name="ngaySinh"
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formik.values.ngaySinh}
              onChange={formik.handleChange}
            />
          </div>
        </form>
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={isLoading}
            onClick={handleClose}>
            <CircularProgress color="inherit" />
          </Backdrop>
      </Box>
    </Modal>
  );
}
