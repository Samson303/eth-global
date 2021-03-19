import React, { useEffect, useState } from 'react'
import { useDocker } from '../../../context/DockProvider'
import styles from './AlsoOnDock.module.scss'
import Emoji from '../../atoms/Emoji'
import DockButton from '../../atoms/DockButton'
import AlsoOnCard from '../AlsoOnCard/AlsoOnCard'
import {
  cryptoVoxelsImage,
  cryptoVoxelsUrl,
  openSeaImage,
  openSeaUrl,
  rareEffectImage,
  rareEffectUrl,
} from '../../atoms/ImageUrls'
import { useSlider } from '../../../context/SliderProvider'
import { useNvm } from '../../../context/NvmProvider'

const AlsoOnDock = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { currentIndex } = useSlider()
  const { DDOs } = useNvm()
  const [nftData, setNftData] = useState({
    nftName: '',
    nftAuthor: '',
  })
  const currentDDO = DDOs[currentIndex]

  console.log(currentDDO)
  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (currentDDO)
      setNftData({
        nftName: currentDDO.service[0].attributes.main.name,
        nftAuthor: currentDDO.service[0].attributes.main.author,
      })
  }, [currentIndex, DDOs])

  return (
    <>
      {!isOpen && (
        <DockButton onClick={handleToggle}>
          <Emoji emoji={'🔮'} label={'dislike'} />
        </DockButton>
      )}
      {isOpen && (
        <div className={styles.sticky}>
          <div className={styles.cardWrapper}>
            {/* <div className={styles.artistName}>
              <h3>
                {nftData.nftName} by {nftData.nftAuthor}
              </h3>
            </div> */}
            <button onClick={handleToggle} className={styles.closeButton}>
              x
            </button>
            <div className={styles.cardGrid}>
              <AlsoOnCard
                serviceUrl={rareEffectUrl}
                serviceImageUrl={rareEffectImage}
                serviceName={'RareEffectV2'}
              />
              <AlsoOnCard
                serviceUrl={cryptoVoxelsUrl}
                serviceImageUrl={cryptoVoxelsImage}
                serviceName={'VR'}
              />
              <AlsoOnCard
                serviceUrl={openSeaUrl}
                serviceImageUrl={openSeaImage}
                serviceName={'OpenSea'}
              />
              <AlsoOnCard />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AlsoOnDock
