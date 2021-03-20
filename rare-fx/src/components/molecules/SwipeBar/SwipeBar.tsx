import React from 'react'
import { useSlider } from '../../../context/SliderProvider'
import Emoji from '../../atoms/Emoji'
import RoundButton from '../../atoms/RoundButton'
import ButtonActionGrid from '../ButtonActionGrid'
import styles from './SwipeBar.module.scss'

const SwipeBar: React.FC = () => {
  const { prev, next } = useSlider()

  return (
    <div className={styles.grid}>
      <div className={styles.alignRight}>
        <RoundButton onClick={prev}>
          <Emoji emoji={'👈'} label={'dislike'} />
        </RoundButton>
      </div>
      <div className={styles.alignLeft}>
        <RoundButton onClick={next}>
          <Emoji emoji={'👉'} label={'like'} />
        </RoundButton>
      </div>
      {/* <div className={styles.madeByWrapper}>
        <div className={styles.madeBy}>
          Made with love by 🤖 || 👩‍🎨
        </div>
      </div> */}
    </div>

  )
}

export default SwipeBar
