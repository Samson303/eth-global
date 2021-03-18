import React from 'react'
import styles from './RoundButton.module.scss'



const RoundButton: React.FC = ({children}) => {
    return(
        <button className={styles.button}>
            {children}
            {/* <span role="img" aria-label="sheep">🐑</span> */}
        </button>
    )
}

export default RoundButton