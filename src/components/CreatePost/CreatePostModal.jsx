// import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material';
// import { Formik, useFormik } from 'formik';
// import React, { useState } from 'react';
// import ImageIcon from '@mui/icons-material/Image';
// import VideoCallIcon from '@mui/icons-material/VideoCall';
// import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
// import {useDispatch, useSelector} from 'react-redux';
// import { createCommentAction, createPostAction } from '../../Redux/Post/post.action';
//
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 500,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: ".6rem",
//   outline: "none",
//
// };
//
// const CreatePostModal = ({ handleClose, open }) => {
//
//   const dispatch = useDispatch();
//   const { post,auth } = useSelector((store) => store);
//   const [selectedImage, setSelectedImage] = useState();
//   const [selectedVideo, setSelectedVideo] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const handleSelectImage = async (event) => {
//     setIsLoading(true);
//     const imgUrl = await uploadToCloudinary(event.target.files[0], "image");
//     setSelectedImage(imgUrl);
//     setIsLoading(false);
//     formik.setFieldValue("image", imgUrl)
//   };
//   const handleSelectVideo = async (event) => {
//     setIsLoading(true);
//     const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
//     setSelectedVideo(videoUrl);
//     setIsLoading(false);
//     formik.setFieldValue("video", videoUrl)
//   };
//   const formik = useFormik({
//     initialValues: {
//       caption: "",
//       image: "",
//       video: "",
//     },
//     onSubmit: (values, { resetForm }) => {
//       dispatch(createPostAction(values));
//       resetForm();
//       handleClose();
//       console.log("formik values: ", values);
//
//     }
//   });
//   console.log(auth?.user?.avatar);
//
//   return (
//     <div>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <form onSubmit={formik.handleSubmit}>
//             <div>
//               <div className='flex space-x-4 items-center'>
//
//                 <Avatar src={auth?.user?.avatar} alt="" className='w-10 h-10' />
//                 <div>
//                   <p className='font-bold text-lg'></p>
//                   <p className='text-sm'></p>
//                 </div>
//               </div>
//               <textarea className='outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm '
//                 placeholder='write cation...'
//                 name="caption"
//                 id=""
//                 value={formik.values.caption}
//                 onChange={formik.handleChange}
//                 rows={4}></textarea>
//               <div className='space-x-5 flex items-center mt-5'>
//                 <div>
//                   <input type="file"
//                     accept='image/*'
//                     onChange={handleSelectImage}
//                     style={{ display: "none" }}
//                     id='image-input'
//                   />
//                   <label htmlFor="image-input">
//                     <IconButton color='primary' component="span">
//                       <ImageIcon />
//                     </IconButton>
//                   </label>
//                   <span>Image</span>
//                 </div>
//                 <div>
//                   <input type="file"
//                     accept='video/*'
//                     onChange={handleSelectVideo}
//                     style={{ display: "none" }}
//                     id='video-input'
//                   />
//                   <label htmlFor="video-input">
//                     <IconButton color='primary'>
//                       <VideoCallIcon />
//                     </IconButton>
//                   </label>
//                   <span>Video</span>
//                 </div>
//               </div>
//               {selectedImage && <div>
//                 <img className='h-[10rem]' src={selectedImage} alt="" />
//               </div>}
//
//               <div className=' flex w-full justify-end'>
//                 <Button variant='contained' type='submit' sx={{ borderRadius: "1.5rem" }}>Post</Button>
//               </div>
//             </div>
//           </form>
//           <Backdrop
//             sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
//             open={isLoading}
//             onClick={handleClose}>
//             <CircularProgress color="inherit" />
//           </Backdrop>
//         </Box>
//       </Modal>
//     </div>
//   )
// }
//
// export default CreatePostModal




import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal, Typography } from '@mui/material';
import { Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, createPostAction } from '../../Redux/Post/post.action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: ".6rem",
  outline: "none",
};

const CreatePostModal = ({ handleClose, open }) => {
  const dispatch = useDispatch();
  const { post, auth } = useSelector((store) => store);

  // State local để lưu trữ dữ liệu tạm thời
  const [tempCaption, setTempCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0], "image");
    setSelectedImage(imgUrl);
    setIsLoading(false);
  };

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
    setSelectedVideo(videoUrl);
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: "",
    },
    onSubmit: (values, { resetForm }) => {
      // Cập nhật giá trị từ state local vào formik trước khi submit
      const postData = {
        caption: tempCaption,
        image: selectedImage || "",
        video: selectedVideo || "",
      };

      dispatch(createPostAction(postData));
      resetForm();

      // Reset state local
      setTempCaption("");
      setSelectedImage(undefined);
      setSelectedVideo(undefined);

      handleClose();
    }
  });

  // Hàm xử lý khi submit form
  const handleSubmitForm = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  // const handleCreatePost = async () => {
  //   // Logic tạo post
  //   await dispatch(createPostAction(postData));
  //   props.refreshPosts(prev => prev + 1); // Tăng refreshPosts để trigger useEffect
  //   props.handleClose();
  // }

  return (
      <div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form onSubmit={handleSubmitForm}>
              <div>
                <div className='flex space-x-4 items-center'>
                  <Avatar src={auth?.user?.avatar} alt="" className='w-10 h-10' />
                  <div>
                    <p className='font-bold text-lg'></p>
                    <p className='text-sm'></p>
                  </div>
                </div>
                <textarea
                    className='outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm'
                    placeholder='write cation...'
                    name="caption"
                    id=""
                    value={tempCaption}
                    onChange={(e) => setTempCaption(e.target.value)}
                    rows={4}
                ></textarea>
                <div className='space-x-5 flex items-center mt-5'>
                  <div>
                    <input type="file"
                           accept='image/*'
                           onChange={handleSelectImage}
                           style={{ display: "none" }}
                           id='image-input'
                    />
                    <label htmlFor="image-input">
                      <IconButton color='primary' component="span">
                        <ImageIcon />
                      </IconButton>
                    </label>
                    <span>Image</span>
                  </div>
                  <div>
                    <input type="file"
                           accept='video/*'
                           onChange={handleSelectVideo}
                           style={{ display: "none" }}
                           id='video-input'
                    />
                    <label htmlFor="video-input">
                      <IconButton color='primary'>
                        <VideoCallIcon />
                      </IconButton>
                    </label>
                    <span>Video</span>
                  </div>
                </div>
                {selectedImage && <div>
                  <img className='h-[10rem]' src={selectedImage} alt="" />
                </div>}

                <div className='flex w-full justify-end'>
                  <Button variant='contained' type='submit' sx={{ borderRadius: "1.5rem" }}>Post</Button>
                </div>
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
      </div>
  )
}

export default CreatePostModal
