import React from 'react';

const NotificationIcon = ({ notificationCount }) => {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405C18.403 14.613 18 13.11 18 11.5V9c0-3.038-1.635-5.64-4.5-6.32V2a1.5 1.5 0 00-3 0v.68C7.635 3.36 6 5.962 6 9v2.5c0 1.61-.403 3.113-1.595 4.095L3 17h5m7 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
          {notificationCount}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
