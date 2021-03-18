import React from 'react'
import Slider from '@farbenmeer/react-spring-slider'
import Slide from './Slide'
import Arrows from './Arrows'
import Bullet from './BulletComponent'

interface IProps {
  imagesUrls: string[]
}

const Carousel = ({ imagesUrls }: IProps) => {
  const slides = imagesUrls.map((imageUrl) => <Slide imageUrl={imageUrl} />)
  const onSlideChange = (index: number) => console.log(`changed to slide ${index}`)

  return (
    <Slider
      hasBullets
      onSlideChange={onSlideChange}
      hasArrows={true}
      BulletComponent={Bullet}
      ArrowComponent={Arrows}
      auto={10000}
    >
      {slides}
    </Slider>
  )
}

export default Carousel
