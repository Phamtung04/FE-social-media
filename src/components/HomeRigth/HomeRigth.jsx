import React, {useEffect} from 'react';
import PopularUserCard from './PopularUserCard';
import {Card} from '@mui/material';
import NotificationBell from '../notification/notificationbell';
import {useDispatch, useSelector} from 'react-redux';
import {getAllUserAction} from "../../Redux/user/user.action";
import {getProfileByIdAction} from "../../Redux/Profile/profile.action";
import {useNavigate} from "react-router-dom";

const HomeRight = ({username}) => {
    const dispatch = useDispatch();
    const {user, auth, profile} = useSelector((state) => state);
    const navigate = useNavigate();

    const follow = (id) => {
        dispatch(getProfileByIdAction(id));
    }

    useEffect(() => {
        dispatch(getAllUserAction())
    }, [dispatch]);
    const userData = user.users?.content || [];
    console.log("userData", userData);

    return (
        <div className="pr-5">
            <div className="justify-items-end mb-4 mt-4">
                <NotificationBell username={username}/>
            </div>
            <Card className="p-5">
                <div className="flex justify-between py-5 items-center">
                    <p className="font-semibold opacity-70">Suggestion for you</p>
                    <p className="text-xs font-semibold opacity-95">View All</p>
                </div>
                <div className="space-y-5">
                    {userData.map((item, index) => {
                        const fullName = item.firstName + " " + item.lastName;
                        const idUser = "@" + item.firstName + "_" + item.lastName;
                        return (
                            auth.user?.id === item?.id ? null :
                                <PopularUserCard
                                    handleClick={() => (navigate(`/profile/${item.id}`))}
                                    key={index}
                                    linkImage={item.avatar}
                                    title={fullName}
                                    subheader={idUser}
                                    userId={item.id}
                                    currentUserId={auth.user.id}
                                    followers={item.follower || []}
                                    onFollow={() => follow(item.id)}
                                />
                        );
                    })}
                </div>
            </Card>
        </div>
    );
};

export default HomeRight;
