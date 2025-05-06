import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import NotificationIcon from './notification';

const NotificationBell = ({ username }) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
    });

    stompClient.onConnect = () => {
      console.log("Connected to WebSocket server");
      // Đăng ký nhận thông báo của user theo endpoint: /user/{username}/notification
      stompClient.subscribe(`/user/${username}/notification`, (message) => {
        const notification = JSON.parse(message.body);
        console.log("Notification received:", notification);
        // Thêm thông báo mới vào đầu danh sách
        setNotifications(prev => [notification, ...prev]);
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker error:", frame.headers, frame.body);
    };

    stompClient.activate();

    // Cleanup khi component unmount
    return () => {
      stompClient.deactivate();
    };
  }, [username]);

  // Toggle hiển thị dropdown khi nhấn vào icon
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Đóng dropdown khi click bên ngoài
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

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
        <NotificationIcon notificationCount={notifications.length} />
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-50">
          {notifications.length === 0 ? (
            <div className="p-4 text-gray-500">Không có thông báo nào</div>
          ) : (
            notifications.map((notif, index) => (
              <div key={index} className="p-4 border-b border-gray-200">
                {notif.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
