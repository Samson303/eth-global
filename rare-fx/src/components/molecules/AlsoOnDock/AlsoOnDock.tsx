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
import MetaCard from '../MetaCard/MetaCard'

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

  const{ isActive } = useDocker()

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* <DockButton onClick={handleToggle}>
        <Emoji emoji={'🔮'} label={'dislike'} />
      </DockButton> */}
      <SlideDown className={'my-dropdown-slidedown'}>
        {isActive ? (
          <div className={styles.slider}>
            <div className={styles.cardWrapper}>
              <div className={styles.cardGrid}>
                <MetaCard 
                  artworkName={nftData.nftName}
                  artist={nftData.nftAuthor}
                  description={"description"}
                  mintDate={"293847293"}
                  price={"1002"}
                />
                <div className={styles.alsoOnGrid}>
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
          </div>
        ) : null}
      </SlideDown>
    </>
  )
}

export default AlsoOnDock
