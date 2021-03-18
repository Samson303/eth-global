import React from 'react'
import Button from '../../components/atoms/Button'
import GridPlaceHolder from '../../components/atoms/GridPlaceHolder'
import Page from '../../components/atoms/Page'
import ButtonActionGrid from '../../components/molecules/ButtonActionGrid'
import styles from './Home.module.scss'


const Home: React.FC = () => { 
    return (
        <Page>
            <ButtonActionGrid >
                <div className={styles.alignRight}>
                    <Button name={"View"}/>
                </div>
                <div className={styles.alignLeft}>
                    <Button name={"artDetail"}/>
                </div> 
            </ButtonActionGrid> 
            <GridPlaceHolder />
            <ButtonActionGrid >
                <div className={styles.alignRight}>
                    <Button name={"View"}/>
                </div>
                <div className={styles.alignLeft}>
                    <Button name={"artDetail"}/>
                </div> 
            </ButtonActionGrid>  
        </Page>
    )
}   


export default Home 