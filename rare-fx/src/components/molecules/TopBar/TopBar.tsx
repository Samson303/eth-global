import React from 'react'
import Button from '../../atoms/Button'
import Emoji from '../../atoms/Emoji'
import RoundButton from '../../atoms/RoundButton'
import styles from './TopBar.module.scss'

const TopBar: React.FC = () => {
    return(
        <div className={styles.topGrid}>
            <div className={styles.alignLeft}>
                <RoundButton>
                    <Emoji emoji={"📢"} label={"dislike"}/>
                </RoundButton>
            </div>
            <div className={styles.alignRight}>
                <Button name={'CREATE'}/>
            </div>
            <div className={styles.alignLeft}>
                <Button name={'COLLECT'}/>
            </div>
            <div className={styles.alignRight}>
                <RoundButton>
                    <Emoji emoji={"👨🏻"} label={"like"}/> 
                </RoundButton>
            </div>
        </div>
    )
}

export default TopBar 