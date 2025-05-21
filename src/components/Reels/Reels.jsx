import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CardMedia} from '@mui/material';
import {getAllReelsAction} from '../../Redux/reels/reels.action';

const Reels = () => {
    const dispatch = useDispatch();
    const {reels} = useSelector((state) => state.reels);

    useEffect(() => {
        dispatch(getAllReelsAction());
    }, [dispatch]);

    console.log("reels", reels);

    return (
        <div
            className="h-screen overflow-y-scroll snap-y snap-mandatory max-w-[800px] no-scrollbar"
            style={{scrollBehavior: 'smooth'}}
        >
            {reels && reels.length > 0 ? (
                reels.map((itemVideo, index) => (
                    itemVideo.urlVideo && (
                        <div
                            key={index}
                            className="h-screen w-[600px] items-center justify-center snap-start relative"
                        >
                            <CardMedia
                                component="video"
                                src={itemVideo.urlVideo}
                                controls
                                autoPlay
                                loop
                                muted
                                className="object-cover max-w-[550px] h-full mt-5"
                            />
                            <div
                                className="absolute bottom-5 left-10 text-white text-lg bg-black/50 px-4 py-2 rounded-lg max-w-[500px]">
                                {itemVideo.title || 'Mô tả video ở đây...'}
                            </div>
                        </div>
                    )
                ))
            ) : (
                <p className="text-white text-center mt-5">Đang tải video...</p>
            )}

        </div>
    );
};

export default Reels;
