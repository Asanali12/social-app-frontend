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
    }, [])

    const friendsTest = [
        {
            id: 1,
            email : 'email@mail.com',
            fullname: 'Walter White',
            age: 45,
            city: 'Albuquerque',
            university: 'Albuquerque University',
            logo_url: 'https://primefaces.org/cdn/primereact/images/organization/walter.jpg'
        }
    ]
    
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