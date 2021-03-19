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

import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { useNvm } from '../../../context/NvmProvider'
import { useSlider } from '../../../context/SliderProvider'

interface IProps {
  cryptoVoxelUrl?: string
  rareEffectUrl?: string
  othersUrls?: string[]
}

const AlsoOnDock = ({ cryptoVoxelUrl, rareEffectUrl, othersUrls }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { currentIndex } = useSlider()
  const { DDOs } = useNvm()
  const [nftData, setNftData] = useState({
    nftName: '',
    nftAuthor: '',
  })
  const currentDDO = DDOs[currentIndex]

  useEffect(() => {
    if (currentDDO)
      setNftData({
        nftName: currentDDO.service[0].attributes.main.name,
        nftAuthor: currentDDO.service[0].attributes.main.author,
      })
  }, [currentIndex, DDOs])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <DockButton onClick={handleToggle}>
        <Emoji emoji={'🔮'} label={'dislike'} />
      </DockButton>
      <SlideDown className={'my-dropdown-slidedown'}>
        {isOpen ? (
          <div className={styles.slider}>
            <div className={styles.cardWrapper}>
              <button onClick={handleToggle} className={styles.closeButton}>
                x
              </button>
              <h3 className={styles.artistName}>
                {nftData.nftName} by {nftData.nftAuthor}
              </h3>
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
                <AlsoOnCard
                  serviceUrl={openSeaUrl}
                  serviceImageUrl={openSeaImage}
                  serviceName={'OpenSea'}
                />
              </div>
            </div>
          </div>
        ) : null}
      </SlideDown>
    </>
  )
}

export default AlsoOnDock
