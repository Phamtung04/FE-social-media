import {Avatar, Button, CardHeader} from "@mui/material";
import React, {useEffect, useState} from "react";

const PopularUserCard = ({
                             linkImage,
                             title,
                             subheader,
                             userId,
                             currentUserId,
                             handleClick,
                             followers = [],
                             onFollow = () => {
                             },
                         }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    console.log("followers", isFollowing);

    useEffect(() => {
        setIsFollowing(followers.includes(currentUserId));
    }, [followers, currentUserId]);

    const handleFollowClick = () => {
        setIsFollowing(!isFollowing); // toggle
        onFollow(userId);
    };

    return (
        <div className="flex justify-between items-center">
            <CardHeader
                avatar={<Avatar alt="Remy Sharp" src={linkImage}/>}
                title={title}
                subheader={subheader}
                onClick={handleClick}
            />
            <Button size="small" onClick={handleFollowClick}>
                {isFollowing ? "" : "Follow"}
            </Button>
        </div>


    );
};

export default PopularUserCard;
