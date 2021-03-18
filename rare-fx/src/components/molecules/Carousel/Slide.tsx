import React from 'react'
import styles from './Slide.module.scss'

interface IProps {
  imageUrl: string
}

const Slide = ({ imageUrl }: IProps) => {
  return (
    <div>
      <img src={imageUrl} alt="" className={styles.slide} />
    </div>
  )
}

export default Slide
