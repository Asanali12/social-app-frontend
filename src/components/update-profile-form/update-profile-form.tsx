import { useForm, Controller } from "react-hook-form"
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

import React, { ChangeEvent, useState } from 'react'
import api from '../../api/api'

import styles from './update-profile-form.module.css'

interface NewUserData {
    'fullname'?: string,
    'email'?: string,
    "age"?: number,
    "city"?: string,
    "university"?: string,
    "logo"?: string
}

export const UpdateProfileForm = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const [file, setFile] = useState<File>()

    const { control, handleSubmit } = useForm({
        defaultValues: {
            'fullname': '',
            'email': '',
            "city": '',
            "university": '',
            "logo": ''
        }
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    const onSubmit = (data: NewUserData) => {
        const formData = new FormData()
        api.defaults.headers.common['Content-Type'] = 'multipart/form-data'
        for (const [key, value] of Object.entries(data)) {
            if (key !== 'logo'){
                formData.append(key, value);
            }
        }
        console.log(file)
        if (file){
            console.log('here')
            formData.append('logo', file)
        }
        api.post('/profile/edit/', formData).then(response => {
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
            <form id="update" onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
                <Controller
                    name="fullname"
                    control={control}
                    render={({ field }) => <InputText {...field} placeholder="Имя"/>}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <InputText {...field} placeholder="Электронная почта"/>}
                />
                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => <InputText {...field} placeholder="Город"/>}
                />
                <Controller
                    name="university"
                    control={control}
                    render={({ field }) => <InputText {...field} placeholder="ВУЗ"/>}
                />
                <Controller
                    name="logo"
                    control={control}
                    render={({ field }) => <input type="file" onChange={handleFileChange}/>}
                />
                <Button label="Сохранить" form='update' type="submit"/>
                {showSuccessMessage && (<Message severity="success" text="Успешно обновлены данные!"/>)}
                {showErrorMessage && (<Message severity="error" text="Ошибка!"/>)}
            </form>
        </div>
    )
}