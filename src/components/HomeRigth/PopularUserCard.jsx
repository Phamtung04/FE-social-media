import { Avatar, Button, CardHeader, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const PopularUserCard = ({linkImage, title, subheader}) => {
  return (
    <div>
      <CardHeader
        avatar={
            <Avatar alt="Remy Sharp" src={linkImage} />
        }
        action={
          <Button size="small">
            Follow
          </Button>
        }
        title={title}
        subheader={subheader}
      />
    </div>
  );
};

export default PopularUserCard;
