import { Avatar, Box, Button, Card, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../components/Post/PostCard";
import UserReelCard from "../../components/Reels/UserReelCard";
import { useDispatch, useSelector } from "react-redux";
import ProfileModals from "./ProfileModals";
import { followUserAction, getProfileByIdAction } from "../../Redux/Profile/profile.ation";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  { value: "repost", name: "Repost" },
];

const formatId = (str) => {
  if (!str) return ""; // Tránh lỗi undefined
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "")
    .toLowerCase();
};

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);


  const { auth, profile } = useSelector((store) => store);

  useEffect(() => {
    if (id) {
      dispatch(getProfileByIdAction(id));
    }
  }, [id, dispatch]);
  const isOwnProfile = Number(auth.user?.id) === Number(profile.user?.id);



  const handleOpenProfileModals = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState("post");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {

    if (profile.user?.following?.includes(auth.user?.id)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [profile.user, auth.user]);

  const handleFollowToggle = () => {

    dispatch(followUserAction(profile.user?.id));
  };
  if (!profile.user) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  return (
    <Card className="my-10 w-[70%] mr-16">
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img
            className="w-full h-full rounded-t-md"
            src={profile.user?.backGround || "/default-background.jpg"} // Dùng ảnh mặc định nếu không có
            alt=""
          />
        </div>
        <div className="flex px-5 justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            sx={{ width: "10rem", height: "10rem" }}
            src={profile.user?.avatar || "/default-avatar.jpg"} // Dùng ảnh mặc định nếu không có
          />
          {isOwnProfile ? (
            <Button onClick={handleOpenProfileModals} sx={{ borderRadius: "20px" }} variant="outlined">
              Edit Profile
            </Button>
          ) : (
            <Button onClick={handleFollowToggle} sx={{ borderRadius: "20px" }} variant={isFollowing ? "contained" : "outlined"}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        <div className="p-5">
          <div>
            <h1 className="py-1 font-bold text-xl">
              {profile.user?.firstName + " " + profile.user?.lastName}
            </h1>
            <p>@{formatId(profile.user?.firstName) + "_" + formatId(profile.user?.lastName)}</p>
          </div>
          <div className="flex gap-5 items-center py-3">
            <span>41 posts</span>
            <span>follower {profile.user?.follower?.length || 0} </span>
            <span>following {profile.user?.following?.length || 0} </span>
          </div>
          <div>{profile.user?.bio || "No bio available"}</div>
        </div>
        <section>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
              {tabs.map((item) => (
                <Tab key={item.value} value={item.value} label={item.name} wrapped />
              ))}
            </Tabs>
          </Box>

          <div className="flex justify-center">
            {value === "post" ? (
              <div className="space-y-5 w-[70%] my-10">
                {profile.user?.posts?.map((item, index) => (
                  <div key={index} className="border border-slate-100 rounded-md">
                    <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : value === "reels" ? (
              <div className="flex justify-center flex-wrap gap-2 my-10">
                {profile.user?.reels?.map((_, index) => (
                  <UserReelCard key={index} />
                ))}
              </div>
            ) : value === "saved" ? (
              <div className="space-y-5 w-[70%] my-10">
                {profile.user?.savedPosts?.map((item, index) => (
                  <div key={index} className="border border-slate-100 rounded-md">
                    <PostCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div>Repost</div>
            )}
          </div>
        </section>
      </div>
      <section>
        <ProfileModals open={open} handleClose={handleClose} user={profile.user} />
      </section>
    </Card>
  );
};

export default Profile;
