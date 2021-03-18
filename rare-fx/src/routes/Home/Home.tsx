import React from 'react'
import Button from '../../components/atoms/Button'
import GridPlaceHolder from '../../components/atoms/GridPlaceHolder'
import Page from '../../components/atoms/Page'
import ButtonActionGrid from '../../components/molecules/ButtonActionGrid'
import ViewBar from '../../components/molecules/BottomViewBar/BottomViewBar'
import styles from './Home.module.scss'
import LikeBar from '../../components/molecules/LikeBar/LikeBar'


const Home: React.FC = () => { 
    return (
        <Page>
            <ViewBar />
            <LikeBar /> 
            <GridPlaceHolder />
            <ViewBar /> 
        </Page>
    )
}   


export default Home 