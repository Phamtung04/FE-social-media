import { Avatar } from '@mui/material'
import React from 'react'

const StoryCircle = ({linkImg, name}) => {
  return (
    <div>
      <div className="flex flex-col items-center mr-4 cursor-pointer">
        <Avatar
          sx={{ width: "5rem", height: "5rem" }}
          src={linkImg}
        >
        </Avatar>
        <p>{name}</p>
      </div>
    </div>
  )
}

export default StoryCircle