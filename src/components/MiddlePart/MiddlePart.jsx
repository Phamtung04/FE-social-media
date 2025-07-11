import {Avatar, Card, IconButton} from "@mui/material";
import React, {useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import StoryCircle from "./StoryCircle";
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from "../Post/PostCard";
import CreatePostModal from "../CreatePost/CreatePostModal";
import {useDispatch, useSelector} from "react-redux";
import {getAllPostAction} from "../../Redux/Post/post.action";


const MiddlePart = () => {

    const story = [
        {
            linkImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
            name: "@tonny.n"
        },
        {
            linkImage: "data:image/jpeg;base64,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",
            name: "@an.nv"
        },
        {
            linkImage: "data:image/jpeg;base64,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",
            name: "@ngo.nd"
        },
        {
            linkImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzIWHB-JOPB3aE7dwVKZLKdpV7WlH5mUM8bUt_0Taz3Hay6Hkqe3MFrlM&s",
            name: "@hong.nt"
        },
        {
            linkImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoQvRxBdtsBfxxSVx5uCxJ2O-FqcxBLRPUCUvOefVzzj3qSG8hhT7Kuto&s",
            name: "@hai.nv"
        },
    ]

    const dispatch = useDispatch();
    const {post, auth} = useSelector((store) => store);
    const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
    const handleCloseCreatePostModal = () => setOpenCreatePostModal(false);
    const handleOpenCreatePostModal = () => {
        setOpenCreatePostModal(true);
    };
    useEffect(() => {
        dispatch(getAllPostAction());
    }, [post.newComment, post.like]);
    return (
        <div className="px-20">
            <section className="flex items-center p-5 rounded-b-md">
                <div className="flex flex-col items-center mr-4 cursor-pointer">
                    <Avatar
                        sx={{width: "5rem", height: "5rem"}}
                        // src={auth.user.avatar}
                    >
                        <AddIcon sx={{fontSize: "3rem"}}/>
                    </Avatar>
                    <p>New</p>
                </div>
                {story.map((item) => <StoryCircle linkImg={item.linkImage} name={item.name}/>)}
            </section>
            <Card className="p-5 mt-5">
                <div className="flex justify-between">
                    <Avatar src={auth.user.avatar}/>
                    <input readOnly
                           onClick={handleOpenCreatePostModal}
                           className="outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border"
                           type="text"/>
                </div>
                <div className="flex justify-center space-x-9 mt-5">
                    <div className="flex items-center">
                        <IconButton color="primary" onClick={handleOpenCreatePostModal}>
                            <ImageIcon/>
                        </IconButton>
                        <span>media</span>
                    </div>

                    <div className="flex items-center">
                        <IconButton color="primary" onClick={handleOpenCreatePostModal}>
                            <VideocamIcon/>
                        </IconButton>
                        <span>Video</span>
                    </div>

                    <div className="flex items-center">
                        <IconButton color="primary" onClick={handleOpenCreatePostModal}>
                            <ArticleIcon/>
                        </IconButton>
                        <span>Write Article</span>
                    </div>
                </div>
            </Card>

            <div className="mt-5 space-y-5">
                {post.posts
                    .slice() // tạo bản sao để không mutate mảng gốc
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sắp xếp giảm dần theo thời gian
                    .map((item) => (
                        <PostCard key={item.id} item={item}/>
                    ))}

            </div>
            <div>
                <CreatePostModal
                    handleClose={handleCloseCreatePostModal}
                    open={openCreatePostModal}
                />
            </div>
        </div>
    );
};

export default MiddlePart;
