import React from 'react'
import Carousel from '../molecules/Carousel/Carousel'
import styles from './Gridplaceholder.module.scss'

const GridPlaceHolder: React.FC = () => {
  const images = [
    'https://picsum.photos/400/600',
    'https://picsum.photos/400/600',
    'https://picsum.photos/400/600',
  ]
  return (
    <div className={styles.placeholder}>
      <div className={styles.verticalCenter}></div>
      <Carousel imagesUrls={images} />
    </div>
  )
}

export default GridPlaceHolder
