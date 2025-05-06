
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Backdrop, CircularProgress, Grid, IconButton } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SearchUser from '../../components/SearchUser/SearchUser';
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { createMessageAction, getAllChats } from '../../Redux/Message/message.action';
import { uploadToCloudinary } from '../../utils/uploadToCloudinary';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import {API_BASE_URL} from "../../config/api";
import {useNavigate} from "react-router-dom";

const Message = () => {
  const dispatch = useDispatch();
  const { message: reduxMessage, auth } = useSelector((store) => store);

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  // Thiết lập kết nối WebSocket
  useEffect(() => {
    // const sock = new SockJS("http://localhost:8080/ws");
    const sock = new SockJS(`${API_BASE_URL}/ws` );
    const stomp = Stomp.over(sock);
    setStompClient(stomp);
    stomp.connect({}, onConnect, onErr);
  }, []);

  const onConnect = () => {
    console.log("Connected to websocket");
  };

  const onErr = (error) => {
    console.error("WebSocket connection error:", error);
  };

  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  useEffect(() => {
    let subscription;
    if (stompClient && auth.user && currentChat) {
      subscription = stompClient.subscribe(`/user/${currentChat.id}/private`, onMessageReceive);
    }
    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [stompClient, auth.user, currentChat]);

 
  const onMessageReceive = (newMessage) => {
    
    const reciveMessage = JSON.parse(newMessage.body);
    console.log("Message received from websocket:", reciveMessage);
    setMessages((prevMessages) => [...prevMessages, reciveMessage]);
   
  };

  
  const sendMessageToServer = (newMessage) => {
    if (stompClient && newMessage) {
      stompClient.send(
        `/app/chat/${currentChat?.id}`,
        {},
        JSON.stringify(newMessage)
      );
    }
  };

  const handleCreateMessage = (value) => {
    const messageData = {
      chatId: currentChat?.id,
      content: value,
      image: selectedImage,
    };
    dispatch(createMessageAction({ message: messageData, sendMessageToServer }));
    setInputValue("");
    setSelectedImage("");
  };

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
  };

  const handleBackChat = (chat) => {
    navigate('/')
  };

 

  return (
    <div>
      <Grid container className='h-screen overflow-y-hidden'>
        <Grid className='px-5' item xs={3}>
          <div className='h-full flex justify-between space-x-2'>
            <div className='w-full'>
              <div className='flex space-x-4 items-center py-5'>
                <WestIcon onClick={handleBackChat} />
                <h1 className='text-xl font-bold'>Home</h1>
              </div>
              <div className='h-[83vh]'>
                <SearchUser />
                <div className='h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar'>
                  {reduxMessage.chat && reduxMessage.chat.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages || []);
                      }}
                    >
                      <UserChatCard chat={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className='h-full' item xs={9}>
          {currentChat ? (
            <div>
              <div className='flex justify-between items-center border-l p-5'>
                <div className='flex items-center space-x-3'>
                  <Avatar
                    sx={{ width: "3.5rem", height: "3.5rem", fontSize: "1.5rem" }}
                    src={
                      auth.user.id === currentChat.users[0].id
                        ? currentChat.users[1].avatar
                        : currentChat.users[0].avatar
                    }
                  />
                  <p>
                    {auth.user.id === currentChat.users[0].id
                      ? `${currentChat.users[1].firstName} ${currentChat.users[1].lastName}`
                      : `${currentChat.users[0].firstName} ${currentChat.users[0].lastName}`}
                  </p>
                </div>
                <div className='flex space-x-3'>
                  <IconButton>
                    <AddIcCallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <div className='overflow-y-scroll h-[75vh] px-2 space-y-5 py-5'>
                {messages.map((item, index) => (
                  <ChatMessage key={index} item={item} />
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className='sticky bottom-0 border-l bg-white'>
                <div className='py-5 flex items-center justify-center space-x-5'>
                  {selectedImage && (
                    <img
                      className="w-[5rem] h-[5rem] object-cover px-2"
                      src={selectedImage}
                      alt="selected"
                    />
                  )}
                  <input
                    className='bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5'
                    placeholder='Type message....'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value);
                      }
                    }}
                    type="text"
                  />
                  <div>
                    <input
                      type="file"
                      accept='image/*'
                      onChange={handleSelectImage}
                      className='hidden'
                      id='image-input'
                    />
                    <label htmlFor="image-input">
                      <AddPhotoAlternateIcon />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='h-full space-y-5 flex flex-col justify-center items-center'>
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className='text-xl font-semibold'>No chat selected</p>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
