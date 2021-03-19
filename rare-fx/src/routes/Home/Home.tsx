import React, {useEffect, useState} from 'react'
import GridPlaceHolder from '../../components/atoms/GridPlaceHolder'
import Page from '../../components/atoms/Page'
import BottomViewBar from '../../components/molecules/BottomViewBar/BottomViewBar'
import styles from './Home.module.scss'
import LikeBar from '../../components/molecules/LikeBar/LikeBar'
import TopBar from '../../components/molecules/TopBar/TopBar'
import SwipeBar from '../../components/molecules/SwipeBar/SwipeBar'
import { SliderProvider } from '../../context/SliderProvider'
import AlsoOnDock from '../../components/molecules/AlsoOnDock/AlsoOnDock'

import NvmProvider from '../../context/NvmProvider'
import ProgressBar from "@ramonak/react-progress-bar";

import ProgressTimer from 'react-progress-timer';

const Home: React.FC = () => {

  const [ count, setCount ] = useState<number>(100)

  useEffect(() => {
    setInterval(() => {
      setCount(count - 1)
    }, 1000)
  },[])

  return (
    <NvmProvider>
      <SliderProvider>
        <Page>
          <div className={styles.wrapper}>
            <TopBar />
            <LikeBar />
          </div>
          <GridPlaceHolder />
          <div className={styles.bottomWrapper}>

            <div className={styles.progressBar}>

              <ProgressBar completed={50}/>

            </div>

            <SwipeBar />
            <BottomViewBar />
          </div>
          <AlsoOnDock />
        </Page>
      </SliderProvider>
    </NvmProvider>
  )
}

export default Home
