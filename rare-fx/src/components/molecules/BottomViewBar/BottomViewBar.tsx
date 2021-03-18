import React from 'react'
import Button from '../../atoms/Button'
import ButtonViewGrid from '../ButtonViewGrid/ButtonViewGrid'
import styles from './BottomViewBar.module.scss'

const BottomViewBar: React.FC = () => {
    return(
        <ButtonViewGrid>
            <div className={styles.alignRight}>
                <Button name={"VIEW"} />
            </div>
            <div className={styles.alignLeft}>
                <Button name={"ART DETAIL"} />
            </div>
        </ButtonViewGrid>
    )
}

export default BottomViewBar