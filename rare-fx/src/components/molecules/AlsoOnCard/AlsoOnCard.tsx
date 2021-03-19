import { url } from 'node:inspector'
import React from 'react'
import styles from './AlsoOnCard.module.scss'


interface ICardProps {
    imgUrl: string;
    artworkTitle: string; 
}

const AlsoOnCard: React.FC<ICardProps> = ({imgUrl, artworkTitle}) => {
    return(
        <div className={styles.cardWrapper}>
            <div className={styles.image} style={{ backgroundImage: `url(${imgUrl})`}}></div>
            <div className={styles.text}>
                View {artworkTitle} on CV
            </div>
            <div className={styles.moreInfo}>
                More Info?
            </div>
        </div>
    )
}


export default AlsoOnCard