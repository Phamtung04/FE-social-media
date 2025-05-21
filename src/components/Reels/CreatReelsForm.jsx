import React, {useState} from 'react'
import {Avatar, Backdrop, Box, Button, CardMedia, CircularProgress, IconButton} from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import {useDispatch, useSelector} from "react-redux";
import {uploadToCloudinary} from "../../utils/uploadToCloudinary";
import {useFormik} from "formik";
import {createReel} from "../../Redux/reels/reels.action";

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


const CreateReelsFrom = () => {
    const dispatch = useDispatch();
    const {auth} = useSelector((store) => store);

    // State local để lưu trữ dữ liệu tạm thời
    const [tempCaption, setTempCaption] = useState("");
    const [selectedVideo, setSelectedVideo] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleSelectVideo = async (event) => {
        setIsLoading(true);
        const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
        setSelectedVideo(videoUrl);
        setIsLoading(false);
    };

    const formik = useFormik({
        initialValues: {
            title: "",
            urlVideo: "",
        },
        onSubmit: (values, {resetForm}) => {
            // Cập nhật giá trị từ state local vào formik trước khi submit
            const reelsData = {
                title: tempCaption,
                urlVideo: selectedVideo || "",
            };

            dispatch(createReel(reelsData));
            resetForm();

            // Reset state local
            setTempCaption("");
            setSelectedVideo(undefined);
        }
    });

    // Hàm xử lý khi submit form
    const handleSubmitForm = (e) => {
        e.preventDefault();
        formik.handleSubmit();
    };
    return (
        <div>
            <Box sx={style}>
                <form onSubmit={handleSubmitForm}>
                    <div>
                        <div className='flex space-x-4 items-center'>
                            <Avatar src={auth?.user?.avatar} alt="" className='w-10 h-10'/>
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
                                       accept='video/*'
                                       onChange={handleSelectVideo}
                                       style={{display: "none"}}
                                       id='video-input'
                                />
                                <label htmlFor="video-input">
                                    <IconButton color='primary' component="span">
                                        <VideoCallIcon/>
                                    </IconButton>
                                </label>
                                <span>Video</span>
                            </div>
                        </div>
                        {selectedVideo && <div>
                            <CardMedia
                                component="video"
                                src={selectedVideo}
                                controls
                                autoPlay
                                loop
                                muted
                                className="object-cover max-w-[550px] h-full mt-5"
                            />
                        </div>}

                        <div className='flex w-full justify-end'>
                            <Button variant='contained' type='submit' sx={{borderRadius: "1.5rem"}}>Reels</Button>
                        </div>
                    </div>
                </form>
                <Backdrop
                    sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
                    open={isLoading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </Box>
        </div>
    )
}

export default CreateReelsFrom