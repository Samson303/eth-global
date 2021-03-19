import React, { useState } from 'react'
import Slider from '@farbenmeer/react-spring-slider'
import Slide from './Slide'
import Arrows from './Arrows'
import Bullet from './BulletComponent'
import SwipeBar from '../SwipeBar/SwipeBar'
import Button from '../../atoms/Button'
import { useSlider } from '../../../context/SliderProvider'
import { DDO } from '@nevermined-io/nevermined-sdk-js'

interface IProps {
  ddos: DDO[]
}

const Carousel = ({ ddos }: IProps) => {
  const slides = ddos.map((ddo) => <Slide ddo={ddo} />)
  const { currentIndex } = useSlider()
  const currentDDO = ddos[currentIndex]
  console.log(currentDDO)
  return (
    <>
      <Slider auto={10000} activeIndex={currentIndex}>
        {slides}
      </Slider>
    </>
  )
}

export default Carousel
