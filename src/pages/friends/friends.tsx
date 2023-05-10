// eslint-disable-next-line react-hooks/exhaustive-deps


import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { TokenState } from '../../store/store';
import { useSelector } from 'react-redux'
import { FriendItem } from '../../components/friend-item/friend-item'
import api from '../../api/api'

import styles from './friends.module.css'

type Friend = {
    id: number,
    email : string,
    fullname: string,
    age: number,
    city: string,
    university: string,
    logo_url: string
}
/* eslint-disable @typescript-eslint/no-unused-vars */
export const Friends = () => {

    const [friends, setFriends] = useState([] as Array<Friend>)

    const token = useSelector((state : {tokenReducers: TokenState}) => state.tokenReducers['accessToken'])

    const navigate = useNavigate()

    useEffect(() => {
        if (token.length === 0) {
            navigate('/login')
        }
        console.log(token)
        api.defaults.headers.common['Authorization'] = 'Bearer '+token
        console.log(api.defaults.headers)
        api.get('friends/list/').then((response) => {
            setFriends(response.data)
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }, [navigate, token])
    
    return (
        <div className={styles.list}>
            {
                friends.map((friend) => {
                    return (
                        <FriendItem userId={friend.id} profilePicUrl={friend.logo_url} userName={friend.fullname}/>
                    )
                })
            }
        </div>
    )
}