import { Card } from 'primereact/card';
import { Image } from 'primereact/image';

import styles from './post.module.css'

interface PostProps {
    picUrl?: string,
    text: string,
    userName: string
}

export const Post = ({userName, text, picUrl, ...props }: PostProps) => {
    
    return (
        <Card title={userName} className={styles.post} {...props}>
            {
                picUrl &&
                <Image src={picUrl} alt="Image" />
            }
            {text}
        </Card>
    )
}