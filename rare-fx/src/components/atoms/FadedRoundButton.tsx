import React from 'react'
import styles from './FadedRoundButton.module.scss'


const FadedRoundButton: React.FC = ({children}) => {
    return(
        <button className={styles.button}>
            {children}
        </button>
    )
}

export default FadedRoundButton