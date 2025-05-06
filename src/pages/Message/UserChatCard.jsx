import { Avatar, Card, CardHeader, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from 'react';
import { useSelector } from 'react-redux';
const formatId = (str) =>
  str
    .normalize("NFD") // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
    .replace(/[^\w\s]/g, "") // Xóa dấu câu
    .replace(/\s+/g, "") // Xóa khoảng trắng
    .toLowerCase(); // Chuyển thành chữ thường


const UserChatCard = ({chat}) => {
  const { message, auth } = useSelector((store) => store);
  console.log("chat",chat)
  return (
    <div>
        <Card>
            <CardHeader  avatar={<Avatar sx={{width:"3.5rem", height:"3.5rem", fontSize:"1.5rem",bgcolor:"#191c29", color:"rgb(88,199,250"}}
             src={auth.user.id === chat.users[0].id?chat.users[1].avatar
              :chat.users[0].avatar}
             />}
            title={auth.user.id === chat.users[0].id?chat.users[1].firstName+" "+chat.users[1].lastName
              :chat.users[0].firstName+" "+chat.users[0].lastName}
            action={
                <IconButton>
                    <MoreHorizIcon/>
                </IconButton>
            }
            subheader={""}
            />

        </Card>
      
      
    </div>
  )
}

export default UserChatCard
