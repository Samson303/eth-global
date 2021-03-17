import React from 'react'
import styles from './Button.module.scss'


const Page: React.FC = ({children}) => {
    return(
        <div className={styles.page}>
            {children}
        </div>
    )
}

export default Page