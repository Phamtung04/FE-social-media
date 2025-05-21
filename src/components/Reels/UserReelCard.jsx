import React from 'react'

const UserReelCard = ({urls}) => {
  return (
    <div className='mt-10 h-[194] px-2'>
        <video controls className='w-full h-full' src={urls}/>
    </div>
  )
}

export default UserReelCard