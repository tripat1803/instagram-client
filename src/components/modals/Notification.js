import { authAxios } from '@/utils/api';
import React, { useEffect, useState } from 'react'

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [loader, setLoader] = useState(false);
    const fetchNotifications = () => {
        setLoader(true);
        authAxios.get("/api/notification").then((res) => {
            setNotifications(res.data);
            setLoader(false);
        }).catch((err) => {
            console.log(err);
            setLoader(false);
        })
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    console.log(notifications);

    return (
        <div className='py-4 px-6 w-full h-full bg-white'>
            <h1 className='text-2xl font-bold'>Notifications</h1>
            <div>
                {loader && <p>Loading...</p>}
                {(!loader && notifications.length !== 0) ? notifications.map((notification, index) => (
                    <div key={index} className='flex justify-between items-center my-4'>
                        <div>
                            <h1 className='text-lg font-bold'>{notification.title}</h1>
                            <p>{notification.message}</p>
                        </div>
                        <div>
                            {/* <p>{notification.createdAt}</p> */}
                        </div>
                        <div>
                            <button>Accept</button>
                            <button>Delete</button>
                        </div>
                    </div>
                )) : <p>No notifications</p>}
            </div>
        </div>
    )
}
