import { DDO } from '@nevermined-io/nevermined-sdk-js'
import React from 'react'
import styles from './Slide.module.scss'

interface IProps {
  ddo: DDO
}

const Slide = ({ ddo }: IProps) => {
  const imageUrl = ddo.service[0].attributes.additionalInformation.image

  return (
    <div>
      <img src={imageUrl} alt="" className={styles.slide} />
    </div>
  )
}

export default Slide
