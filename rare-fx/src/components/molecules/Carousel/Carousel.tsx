import React, { useState } from 'react'
import Slider from '@farbenmeer/react-spring-slider'
import Slide from './Slide'
import Arrows from './Arrows'
import Bullet from './BulletComponent'
import SwipeBar from '../SwipeBar/SwipeBar'
import Button from '../../atoms/Button'
import { useSlider } from '../../../context/SliderProvider'

interface IProps {
  imagesUrls: string[]
}

const Carousel = ({ imagesUrls }: IProps) => {
  const slides = imagesUrls.map((imageUrl) => <Slide imageUrl={imageUrl} />)
  const onSlideChange = (index: number) => console.log(`changed to slide ${index}`)
  const { currentIndex, next, prev } = useSlider()

  return (
    <>
      <Slider
        hasBullets
        onSlideChange={onSlideChange}
        BulletComponent={Bullet}
        auto={10000}
        activeIndex={currentIndex}
      >
        {slides}
      </Slider>
    </>
  )
}

export default Carousel
