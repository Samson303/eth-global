import React from 'react'
import Button from '../../atoms/Button'
import ButtonActionGrid from '../ButtonActionGrid'
import styles from './BottomViewBar.module.scss'

const ViewBar: React.FC = () => {
    return(
        <ButtonActionGrid>
            <div className={styles.alignRight}>
                <Button name={"VIEW"} />
            </div>
            <div className={styles.alignLeft}>
                <Button name={"ART DETAIL"} />
            </div>
        </ButtonActionGrid>
    )
}

export default ViewBar