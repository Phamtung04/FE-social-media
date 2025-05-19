import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import React, {useState,useEffect} from "react";
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
import SockJS from "sockjs-client";
import {Client} from '@stomp/stompjs';

dayjs.extend(relativeTime);

const formatId = (str) =>
    str
        .normalize("NFD") // Chuẩn hóa Unicode
        .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
        .replace(/[^\w\s]/g, "") // Xóa dấu câu
        .replace(/\s+/g, "") // Xóa khoảng trắng
        .toLowerCase();


const PostCard = ({item}) => {
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const handleShowComment = () => setShowComments(!showComments);
    const dispatch = useDispatch();
    const handleCreateComment = (content) => {
       const reqData = { postId: item.id, data: { content }};
  try {
    const res =  dispatch(createCommentAction(reqData));
    if(res && res.payload) {
      setComments(prev => [res.payload, ...prev]);
    }
  } catch (error) {
    console.log("Failed to create comment", error);
  }
    };
    useEffect(() => {
  setComments(item.comments || []);
}, [item.comments]);
    const {auth} = useSelector((store) => store);
    const handleLikePost = () => {
        dispatch(getLikePostAction(item.id))
        
    }
     useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      console.log("Connected to WebSocket server");
      
      stompClient.subscribe(`/posts/${item.id}/comments`, (message) => {
        const comment = JSON.parse(message.body);
        console.log("comment received:", comment); 
        // Thêm thông báo mới vào đầu danh sách
        setComments(prev => [comment, ...prev]);
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker error:", frame.headers, frame.body);
    };

    stompClient.activate();

   
    return () => {
      stompClient.deactivate();
    };
  }, [item.id]);

    return (
        <Card className=''>
            <CardHeader
                avatar={
                    <Avatar src={item.user.avatar} sx={{bgcolor: red[500]}} aria-label="recipe"/>
                }
                action={
                    <IconButton aria-label="settings">
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
                    sx={{ height: 300 }}
                />
            ) : ''}
            <CardActions className="flex justify-between" disableSpacing>
                <div>
                    <IconButton onClick={handleLikePost}>
                        {isLikedByReqUser(auth.user.id, item) ? <FavoriteIcon color="error"/> : <FavoriteBorderIcon/>}
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
                        if (e.key == "Enter") {
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
                    {comments.map((comment, index) =>
            <div key={index} className="flex items-center space-x-2">
              <div className="flex  justify-center my-3 items-center  border-[#3b4054]">
                <Avatar src={comment.user.avatar} sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }} />
                <span className="mx-3 ">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{comment.user.firstName + " " + comment.user.lastName}</div>

                  <p className="mt-1 ml-3 text-sm">{comment.content}</p>
                </span >
              </div>

            </div>)
          }
                </div>
            </section>}
        </Card>
    );
};

export default PostCard;
