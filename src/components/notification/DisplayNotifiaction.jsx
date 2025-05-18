import {Avatar, Button, CardHeader} from "@mui/material";
import React from "react";
import dayjs from "dayjs";

const DisplayNotification = ({linkImage, title, subheader, time}) => {
    return (
        <div>
            <CardHeader
                avatar={
                    <Avatar alt="Remy Sharp" src={linkImage}/>
                }
                title={title}

                action={
                    <time>{time}</time>
                }
                subheader={subheader}
            />
        </div>
    );
};

export default DisplayNotification;
