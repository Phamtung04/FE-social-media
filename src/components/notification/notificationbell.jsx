import React, {useEffect, useRef, useState} from 'react';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import NotificationIcon from './notification';
import {API_BASE_URL} from "../../config/api";
import {useDispatch, useSelector} from "react-redux";
import {getNotificationAction, putNotificationAction} from "../../Redux/notification/noti.action";
import DisplayNotification from "./DisplayNotifiaction";
import dayjs from "dayjs";

const NotificationBell = ({username}) => {
    const [notifications, setNotifications] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [readNotificationIds, setReadNotificationIds] = useState([]);

    const [unreadCount, setUnreadCount] = useState(0);

    const noti = useSelector((state) => state.notify.notifications) || [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNotificationAction());
    }, [dispatch]);

    useEffect(() => {
        const stompClient = new Client({
            webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws`),
            reconnectDelay: 5000,
        });

        stompClient.onConnect = () => {
            console.log("Connected to WebSocket");
            stompClient.subscribe(`/user/${username}/notifications`, (message) => {
                const notification = JSON.parse(message.body);
                console.log("New notification:", notification);

                setNotifications(prev => [notification, ...prev]);
                setUnreadCount(prev => prev + 1);
            });
        };

        stompClient.onStompError = (frame) => {
            console.error("STOMP error:", frame.headers, frame.body);
        };

        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, [username]);


    const toggleDropdown = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);

        if (!isOpen) {
            setUnreadCount(0);
        }
    };

    console.log("notification", notifications)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isReadNotification = (notificationId) => {
        return readNotificationIds.includes(notificationId);
    };

    const handleNotificationClick = (notificationId) => {
        if (!isReadNotification(notificationId)) {
            setReadNotificationIds(prev => [...prev, notificationId]);
            dispatch(putNotificationAction(notificationId));
        }
    };
    const allNotifications = [...notifications, ...noti]
        .filter(item => {
            const notification = item.notification || item;
            return !!notification.notification; // loại bỏ nếu không có nội dung
        })
        .map(item => {
            const notification = item.notification || item;
            const sender = notification.sender || {};

            return {
                id: item.id,
                isRead: item.isRead,
                receivedAt: item.receivedAt || item.createdAt || new Date().toISOString(),
                notification: {
                    notification: notification.notification,
                    sender: {
                        firstName: sender.firstName || "",
                        lastName: sender.lastName || "",
                        avatar: sender.avatar || ""
                    }
                }
            };
        });


    const display = () => {
        if (!isOpen) return null;

        return (
            <div
                className="absolute right-0 mt-2 w-[350px] h-[400px] overflow-y-auto bg-white shadow-lg rounded-md z-50">
                {allNotifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">Không có thông báo</div>
                ) : (
                    <>
                        {allNotifications
                            .slice()
                            .sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt))
                            .map((item) => {
                                const notificationId = item.id;
                                const isRead = isReadNotification(notificationId);
                                const isImportant = !item.isRead;
                                const fullName =
                                    item.notification?.sender?.firstName +
                                    " " +
                                    item.notification?.sender?.lastName;

                                return (
                                    <div
                                        key={`notif-${notificationId}`}
                                        className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${
                                            isImportant && !isRead ? "bg-gray-300" : "bg-white"
                                        }`}
                                        onClick={() => handleNotificationClick(item.id)}
                                    >
                                        <DisplayNotification
                                            time={dayjs(item.receivedAt).fromNow()}
                                            linkImage={item.notification?.sender?.avatar}
                                            subheader={item.notification?.notification}
                                            title={fullName}
                                        />
                                    </div>
                                );
                            })}

                    </>
                )}
            </div>
        );
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="cursor-pointer" onClick={toggleDropdown}>
                <NotificationIcon notificationCount={unreadCount}/>
            </div>
            {isOpen && display()}
        </div>
    );
};

export default NotificationBell;
