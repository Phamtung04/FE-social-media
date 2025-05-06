import { Avatar, Card, CardHeader } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/auth.action';
import { createChatAction } from '../../Redux/Message/message.action';
const formatId = (str) =>
  str
    .normalize("NFD") // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
    .replace(/[^\w\s]/g, "") // Xóa dấu câu
    .replace(/\s+/g, "") // Xóa khoảng trắng
    .toLowerCase(); // Chuyển thành chữ thường


const SearchUser = () => {
    const [username,setUsername]=useState("");
    const dispatch = useDispatch();
    const {message,auth} = useSelector(store=>store);

    const handleSearchUser=(e)=>{
        setUsername(e.target.value);
        dispatch(searchUser(username));
        console.log("search user",auth.searchUser);
    };
    const handleClick =(id)=>{
     dispatch(createChatAction({idUser:id})) 
    }
  return ( 
    <div>
      <div className='py-5 relative'>
        <input className='bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full'
         type="text"  placeholder='search user....' onChange={handleSearchUser}/> 
          {
            username && auth.searchUser.map((item)=>
            <Card className='absolute w-full z-10 top-[4.5rem] cursor-pointer'>
            <CardHeader onClick={()=>{
                handleClick(item.id);
              
                setUsername("");
            }}
            avatar={<Avatar src={item.avatar}/>}
            
            title={item.firstName+" "+item.lastName}
            subheader={"@"+formatId(item.firstName)+"_"+formatId(item.lastName)}
            />
        </Card>)
        }
         </div>
       
    </div>
  )
}

export default SearchUser
