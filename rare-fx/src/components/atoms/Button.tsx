import React from 'react'
import styles from './Button.module.scss'

const Button: React.FC = () => {
    return(
        <button className={styles.button}>
            cool button
        </button>
    )
}

export default Button