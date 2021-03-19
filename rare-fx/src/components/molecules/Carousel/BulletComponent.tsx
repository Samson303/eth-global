import React from 'react'
import styles from './Bullet.module.scss'

interface IProps {
  onClick: () => void
  isActive: boolean
}
const BulletComponent = ({ onClick, isActive }: IProps) => (
  <li
    className={styles.bullet}
    style={{
      opacity: isActive ? '0.5' : '0.1',
    }}
    onClick={onClick}
  />
)

export default BulletComponent
