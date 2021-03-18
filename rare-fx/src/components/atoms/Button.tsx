import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
    name: string 
}

const Button: React.FC<ButtonProps> = ({name}) => {
    return(
        <button className={styles.button}>
            {name}
        </button>
    )
}

export default Button