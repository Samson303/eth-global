import React, { useEffect, useState } from 'react'
import { useDocker } from '../../../context/DockProvider'
import styles from './AlsoOnDock.module.scss'
import Emoji from '../../atoms/Emoji'
import DockButton from '../../atoms/DockButton'
import AlsoOnCard from '../AlsoOnCard/AlsoOnCard'
import {
  cryptoVoxelsImage,
  cryptoVoxelsGenericUrl,
  openSeaImage,
  openSeaUrl,
  rareEffectImage,
  rareEffectGenericUrl,
} from '../../atoms/ImageUrls'

import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { useNvm } from '../../../context/NvmProvider'
import { useSlider } from '../../../context/SliderProvider'
import { nftLocationData, NftLocationData } from '../../../data/NftLocationData'

const AlsoOnDock = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { currentIndex } = useSlider()
  const { DDOs } = useNvm()
  const [nftData, setNftData] = useState({
    nftName: '',
    nftAuthor: '',
    cryptoVoxelsUrl: 'https://www.cryptovoxels.com/play?coords=N@335W,136N',
    rareEffectUrl: '',
  })
  const currentDDO = DDOs[currentIndex]

  const getNftCvLink = (nftname: string) => {
    const result = nftLocationData.filter((data) => data.nftName === nftname)
    if (result.length === 0) {
      return cryptoVoxelsGenericUrl
    }
    const link = result[0]['cvLocation']
    if (link) return link
    return cryptoVoxelsGenericUrl
  }

  const getNftRareEffectLink = (nftname: string) => {
    const result = nftLocationData.filter((data) => data.nftName === nftname)
    if (result.length === 0) {
      return rareEffectGenericUrl
    }
    const link = result[0]['rareEffectLink']
    if (link) return link
    return rareEffectGenericUrl
  }

  useEffect(() => {
    if (currentDDO) {
      const nftName = currentDDO.service[0].attributes.main.name
      const nftAuthor = currentDDO.service[0].attributes.main.author
      let cvLocation = getNftCvLink(nftName)
      let rareEffectLink = getNftRareEffectLink(nftName)

      setNftData({
        nftName: nftName,
        nftAuthor: nftAuthor,
        cryptoVoxelsUrl: cvLocation,
        rareEffectUrl: rareEffectLink,
      })
    }
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
                  serviceUrl={nftData.rareEffectUrl}
                  serviceImageUrl={rareEffectImage}
                  serviceName={'RareEffectV2'}
                />
                <AlsoOnCard
                  serviceUrl={nftData.cryptoVoxelsUrl}
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
