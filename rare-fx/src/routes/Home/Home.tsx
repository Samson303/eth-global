import React from 'react'
import Button from '../../components/atoms/Button'
import GridPlaceHolder from '../../components/atoms/GridPlaceHolder'
import Page from '../../components/atoms/Page'
import ButtonActionGrid from '../../components/molecules/ButtonActionGrid'
import BottomViewBar from '../../components/molecules/BottomViewBar/BottomViewBar'
import styles from './Home.module.scss'
import LikeBar from '../../components/molecules/LikeBar/LikeBar'
import TopBar from '../../components/molecules/TopBar/TopBar'


const Home: React.FC = () => { 
    return (
        <Page>
            <div className={styles.wrapper}>
                <TopBar /> 
                <LikeBar /> 
            </div>
            <GridPlaceHolder />
            <LikeBar /> 
            <BottomViewBar /> 
        </Page>
    )
}   


export default Home 