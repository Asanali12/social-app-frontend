import { useForm, Controller } from "react-hook-form"
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import React, { useState } from 'react'
import { TokenState } from '../../store/store';
import { useSelector, useDispatch } from 'react-redux'
import api from '../../api/api'
import { updateTokens } from '../../store/tokens';

import styles from './login.module.css'

interface NewUserData {
    'email' : string,
    'password' : string
}

export const Login = () => {
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const dispatch = useDispatch();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            'email': '',
            'password': ''
        }
    });

    const onSubmit = (data: NewUserData) => {
        api.post('/auth/login/', data).then(response => {
            setShowErrorMessage(false)
            dispatch(updateTokens({
                accessToken: response.data.access,
                refreshToken: response.data.refresh
            }))
            console.log(response);
        }).catch((error) => {
            console.log(error)
            setShowErrorMessage(true)
        });
    }
    
    return (
        <div>
            <form id="login" onSubmit={handleSubmit(onSubmit)} className={styles['register-form']}>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <InputText {...field} placeholder="Электронная почта"/>}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Password {...field} feedback={false} placeholder="Пароль"/>}
                />
                <Button label="Вход" form='login' type="submit"/>
                {showErrorMessage && (<Message severity="error" text="Ошибка!"/>)}
            </form>
        </div>
    )
}