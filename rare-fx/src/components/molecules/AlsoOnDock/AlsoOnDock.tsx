import React, { useState } from 'react'
import Docker from 'react-dock'
import { useDocker } from '../../../context/DockProvider'
import Button from '../../atoms/Button'
import DockItem from './DockItem'
import styles from './AlsoOnDock.module.scss'
import FadedRoundButton from '../../atoms/FadedRoundButton'
import Emoji from '../../atoms/Emoji'
import DockButton from '../../atoms/DockButton'



interface IProps {
  cryptoVoxelUrl?: string
  rareEffectUrl?: string
  othersUrls?: string[]
}

const AlsoOnDock = ({ cryptoVoxelUrl, rareEffectUrl, othersUrls }: IProps) => {
  const { isActive, toggleActive } = useDocker()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    {!isOpen && <DockButton onClick={handleToggle}><Emoji emoji={"🔮"} label={"dislike"}/></DockButton>}
    {isOpen && 
      <div className={styles.sticky}>
        <div className={styles.cardWrapper}>
          <button onClick={handleToggle} className={styles.closeButton}>
            x
          </button>
          <div className={styles.cardGrid}>
            <div className={styles.card}>
              A Card
            </div>
            <div className={styles.card}>
              A Card
            </div>
            <div className={styles.card}>
              A Card
            </div>
            <div className={styles.card}>
              A Card
            </div>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default AlsoOnDock
