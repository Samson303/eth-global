import React from 'react'
import Emoji from '../../atoms/Emoji'
import RoundButton from '../../atoms/RoundButton'
import ButtonActionGrid from '../ButtonActionGrid'
import styles from './SwipeBar.module.scss'

const SwipeBar: React.FC = () => {
    return(
        <ButtonActionGrid>
            <div className={styles.alignRight}>
                <RoundButton>
                    <Emoji emoji={"👈"} label={"dislike"}/>
                </RoundButton>
            </div>
            <div className={styles.alignLeft}>
                <RoundButton>
                    <Emoji emoji={"👉"} label={"like"}/>      
                </RoundButton>
            </div>
        </ButtonActionGrid>
    )
}

export default SwipeBar
