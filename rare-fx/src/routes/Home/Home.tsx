import React from 'react'
import GridPlaceHolder from '../../components/atoms/GridPlaceHolder'
import Page from '../../components/atoms/Page'
import BottomViewBar from '../../components/molecules/BottomViewBar/BottomViewBar'
import styles from './Home.module.scss'
import LikeBar from '../../components/molecules/LikeBar/LikeBar'
import TopBar from '../../components/molecules/TopBar/TopBar'
import SwipeBar from '../../components/molecules/SwipeBar/SwipeBar'
import { SliderProvider } from '../../context/SliderProvider'
import AlsoOnDock from '../../components/molecules/AlsoOnDock/AlsoOnDock'

const Home: React.FC = () => {
  return (
    <SliderProvider>
        <Page>
          <div className={styles.wrapper}>
            <TopBar />
            <LikeBar />
          </div>
          <GridPlaceHolder />
          <div className={styles.bottomWrapper}>
            <SwipeBar />
            <BottomViewBar />
          </div>
          <AlsoOnDock />
        </Page>
    </SliderProvider>
  )
}

export default Home
