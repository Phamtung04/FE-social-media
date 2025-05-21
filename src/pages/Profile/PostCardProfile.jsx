import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton, Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import React, {useState} from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {red} from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {useDispatch, useSelector} from "react-redux";
import {createCommentAction, getLikePostAction} from "../../Redux/Post/post.action";
import {isLikedByReqUser} from "../../utils/isLikeByReqUser";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {Link} from "react-router-dom";


dayjs.extend(relativeTime);

const PostCardProfile = ({item, deletePostProfine}) => {
    const [showComments, setShowComments] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleShowComment = () => setShowComments(!showComments);
    const dispatch = useDispatch();
    const handleCreateComment = (content) => {
        const reqData = {
            postId: item.id,
            data: {
                content
            }
        }
        dispatch(createCommentAction(reqData))
    };
    const {auth} = useSelector((store) => store);
    const handleLikePost = () => {
        dispatch(getLikePostAction(item.id))
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const ITEM_HEIGHT = 55;

    return (
        <div>
            <Card className=''>
                <CardHeader
                    avatar={
                        <Avatar src={item.user.avatar} sx={{bgcolor: red[500]}} aria-label="recipe"/>
                    }
                    action={
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={<Link
                        to={`/profile/${item.user.id}`}
                        style={{textDecoration: "none", color: "inherit"}}
                    >
                        {item.user.firstName + " " + item.user.lastName}
                    </Link>}
                    subheader={` ${dayjs(item.createdAt).fromNow()}`}

                />

                <CardContent>
                    <Typography variant="body2" sx={{}}>
                        {item.caption}
                    </Typography>
                </CardContent>

                {item.image ? (
                    <CardMedia
                        component="img"
                        height="194"
                        image={item.image}
                        alt="Paella dish"
                    />
                ) : ''}
                {item.video ? (
                    <CardMedia
                        component="video"
                        src={item.video}
                        controls
                        autoPlay={false}
                        muted
                        sx={{height: 300}}
                    />
                ) : ''}
                <CardActions className="flex justify-between" disableSpacing>
                    <div>
                        <IconButton onClick={handleLikePost}>
                            {isLikedByReqUser(auth.user.id, item) ? <FavoriteIcon color="error"/> :
                                <FavoriteBorderIcon/>}
                        </IconButton>

                        <IconButton onClick={handleShowComment}>
                            {<ChatBubbleIcon color="primary"/>}
                        </IconButton>

                        <IconButton>
                            {<ShareIcon/>}
                        </IconButton>
                    </div>

                    <div>
                        <IconButton>
                            {true ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
                        </IconButton>

                    </div>
                </CardActions>
                {showComments && <section>
                    <div className='flex items-center space-x-5 mx-3 my-5'>
                        <Avatar src={auth.user.avatar}/>
                        <input onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleCreateComment(e.target.value);
                                e.target.value = "";
                            }
                        }}
                               className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2'
                               type="text"
                               placeholder="bình luận"
                        />
                    </div>
                    <Divider/>
                    <div className="mx-2 space-y-1 my-0 text-xs">
                        {item.comments.map((comment) =>
                            <div className="flex items-center space-x-2">
                                <div className="flex  justify-center my-3 items-center  border-[#3b4054]">
                                    <Avatar src={comment.user.avatar}
                                            sx={{height: "2rem", width: "2rem", fontSize: ".8rem"}}/>
                                    <span className="mx-3 ">
                  <div
                      className="text-sm font-semibold text-gray-900 dark:text-white">{comment.user.firstName + " " + comment.user.lastName}</div>

                  <p className="mt-1 ml-3 text-sm">{comment.content}</p>
                </span>
                                </div>

                            </div>)
                        }
                    </div>
                </section>}
            </Card>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '35ch',
                    },
                }}
            >
                <MenuItem onClick={handleClose}>
                    <p onClick={deletePostProfine}>Delete</p>
                </MenuItem>
            </Menu>

        </div>
    );
};

export default PostCardProfile;
