import React from 'react'
import styles from './Gridplaceholder.module.scss'

const GridPlaceHolder: React.FC = () => {
    return(
        <div className={styles.placeholder}>
            <div className={styles.verticalCenter}> Grid Placeholder</div>
        </div>
    )
}

export default GridPlaceHolder