import React from 'react'
import styles from './Arrows.module.scss'

interface IProps {
  onClick: () => void
  direction: string
}

const ArrowComponent = ({ onClick, direction }: IProps) => {
  return (
    <div className={styles.arrows} onClick={onClick}>
      slide {direction}
    </div>
  )
}

export default ArrowComponent
