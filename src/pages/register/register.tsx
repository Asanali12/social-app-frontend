import { useForm, Controller } from "react-hook-form"
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import React, { useState } from 'react'
import api from '../../api/api'

import styles from './register.module.css'

interface NewUserData {
    'fullname' : string,
    'email' : string,
    'password' : string
}

export const Register = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const { control, handleSubmit } = useForm({
        defaultValues: {
            'fullname': '',
            'email': '',
            'password': ''
        }
    });

    const onSubmit = (data: NewUserData) => {
        console.log(data.password)
        api.post('/auth/register/', data).then(response => {
            setShowSuccessMessage(true)
            setShowErrorMessage(false)
            console.log(response);
        }).catch((error) => {
            console.log(error)
            setShowSuccessMessage(false)
            setShowErrorMessage(true)
        });
    }
    
    return (
        <div>
            <form id="register" onSubmit={handleSubmit(onSubmit)} className={styles['register-form']}>
                <Controller
                    name="fullname"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <InputText {...field} placeholder="Имя"/>}
                />
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
                <Button label="Регистрация" form='register' type="submit"/>
                {showSuccessMessage && (<Message severity="success" text="Успешно зарегистрированы!"/>)}
                {showErrorMessage && (<Message severity="error" text="Ошибка!"/>)}
            </form>
        </div>
    )
}