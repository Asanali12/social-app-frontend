import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'

import styles from './friend-item.module.css'

interface FriendItemProps {
    userId: number,
    profilePicUrl: string,
    userName: string
}

export const FriendItem = ({userId, profilePicUrl, userName, ...props }: FriendItemProps) => {

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const deleteFriend = () => {
        const data = {
            user_id: userId
        }
        api.post('/friends/delete/', data).then(response => {
            setShowSuccessMessage(false)
            console.log(response);
        }).catch((error) => {
            console.log(error)
            setShowSuccessMessage(true)
        });
    }
    
    return (
        <div className={styles.item} {...props}>
            <div className={styles['avatar-block']}>
                <Avatar image={profilePicUrl} size="xlarge"/>
                <Link to={'/user/' + String(userId)}>{userName}</Link>
            </div>
            {
                !showSuccessMessage &&
                <Button label="Удалить" severity='danger' text onClick={deleteFriend}/>
            }
            {
                showSuccessMessage &&
                <Message severity="success" text="ok" />
            }
        </div>
    )
}