import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import { TokenState } from '../../store/store';
import { useSelector } from 'react-redux'
import api from '../../api/api'
import { UpdateProfileForm } from '../../components/update-profile-form/update-profile-form';
import { Post } from '../../components/post/post';

import styles from './profile.module.css'

/* eslint-disable @typescript-eslint/no-unused-vars */

type ProfileInfo = {
    "id": number,
    "email": string,
    "fullname": string,
    "age": number,
    "city": string,
    "university": string,
    "logo_url": string
}

interface ProfileProps {
    isMe?: boolean
}

type RequestStatus = 'NONE' | 'PENDING' | 'DECLINED' | 'APPROVED'

type FriendsRequestsResponse = {
    "id": number,
        "user": {
            "id": number,
            "email": string,
            "fullname": string,
            "age": number,
            "city": string,
            "university": string,
            "logo_url": string
        }
}

type PostSchema = {
    "id": number,
    "body": string,
    "image_url": string,
    "likes": number,
    "is_liked": boolean
}

export const Profile = ({isMe=true}: ProfileProps) => {

    const [profile, setProfile] = useState({} as ProfileInfo)
    const [posts, setPosts] = useState([] as Array<PostSchema>)
    const [requestId, setRequestId] = useState(-1)
    const [requestStatus, setRequestStatus] =  useState('NONE' as RequestStatus)
    const [postText, setPostText] = useState('')

    const [visible, setVisible] = useState(false);

    const params = useParams()

    const token = useSelector((state : {tokenReducers: TokenState}) => state.tokenReducers['accessToken'])

    const navigate = useNavigate()

    const acceptRequest = () => {
        api.defaults.headers.common['Authorization'] = 'Bearer '+token
        api.post('friends/approveRequest/?request_id=' + String(requestId)).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    const sendRequest = () => {
        api.defaults.headers.common['Authorization'] = 'Bearer '+token
        api.post('friends/sendRequest/?to_user_id=' + params.id).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    const createPost = () => {
        api.post('posts/create/', {
            body: postText
        }).then((response) => {
            console.log(response)
        }).catch( (error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (token.length === 0) {
            navigate('/login')
        }
        api.defaults.headers.common['Authorization'] = 'Bearer '+token
        let url
        if (isMe) {
            url = 'profile/info/'
        } else {
            url = 'profile/info?user_id='+String(params.id)
            api.get('friends/incomeRequest?status=PENDING').then((response) => {
                console.log('pre lmao', params.id)
                console.log('arr lmao', response.data)
                
                const pendingReq = response.data.find((request: FriendsRequestsResponse) => request['user']['id'] === Number(params.id))
                if (pendingReq !== undefined) {
                    setRequestId(pendingReq.id)
                    setRequestStatus('PENDING')
                }
            }).catch((error) => {
                console.log(error)
            })

            api.get('friends/list').then((response) => {
                if (response.data.filter((friend: ProfileInfo) => {return String(friend.id) === params.id}).length > 0 ) {
                    setRequestStatus('APPROVED')
                }
            }).catch((error) => {
                console.log(error)
            })
        }
        api.get(url).then((response) => {
            setProfile(response.data)
            const userId = response.data.id
            console.log(response)
            api.get('/posts/userPosts/?user_id=' + userId).then((response) => {
                console.log(response)
                setPosts(response.data)
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            console.log(error)
        })
    }, [params.id])
    
    return (
        <div className={styles['profile-page']}>
            <div className={styles['profile-block']}>
                <Avatar image={profile.logo_url} size="xlarge"/>
                <h3>{profile.fullname}</h3>
            </div>
            {
                isMe && (
                    <>
                        <Button label="Редактировать" icon="pi pi-external-link" onClick={() => setVisible(true)} />
                        <Dialog header="Редактировать профиль" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                            <UpdateProfileForm />
                        </Dialog>
                    </>
                )
            }
            {requestStatus === 'PENDING' && <Button label='Принять заявку' severity='success' onClick={acceptRequest}/>}
            {requestStatus === 'NONE' && params.id !== undefined && <Button label='Добавить в друзья' severity='info' onClick={sendRequest}/>}
            <Card className={styles['info-card']}>
                <div>Возраст: 35(placeholder)</div>
                <Divider />
                <div>Город: {profile.city}</div>
                <Divider />
                <div>ВУЗ: {profile.university}</div>
            </Card>
            {
                isMe &&
                (
                    <>
                        <InputTextarea value={postText} onChange={(e) => setPostText(e.target.value)} rows={5} cols={30} />
                        <Button label='Отправить' onClick={createPost}/>
                    </>
                )
            }
            {
                posts.slice(0).reverse().map((post: PostSchema) => {
                    return <Post text={post.body} userName={profile.fullname}/>
                })
            }
        </div>
    )
}