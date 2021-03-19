import React, { useState } from 'react'
import Docker from 'react-dock'
import { useDocker } from '../../../context/DockProvider'
import Button from '../../atoms/Button'
import DockItem from './DockItem'

interface IProps {
  cryptoVoxelUrl?: string
  rareEffectUrl?: string
  othersUrls?: string[]
}

const AlsoOnDock = ({ cryptoVoxelUrl, rareEffectUrl, othersUrls }: IProps) => {
  const { isActive, toggleActive } = useDocker()

  return (
    <Docker position="bottom" fluid={true} isVisible={isActive}>
      <Button name="X" onClick={toggleActive} />
      <DockItem />
      <DockItem />
      <DockItem />
    </Docker>
  )
}

export default AlsoOnDock
