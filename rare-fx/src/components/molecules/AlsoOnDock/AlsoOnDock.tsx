import React, {useState} from 'react'
import {useDocker} from '../../../context/DockProvider'
import styles from './AlsoOnDock.module.scss'
import Emoji from '../../atoms/Emoji'
import DockButton from '../../atoms/DockButton'

import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

interface IProps {
  cryptoVoxelUrl?: string
  rareEffectUrl?: string
  othersUrls?: string[]
}


const AlsoOnDock = ({cryptoVoxelUrl, rareEffectUrl, othersUrls}: IProps) => {
  const {isActive, toggleActive} = useDocker()

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <DockButton onClick={handleToggle}><Emoji emoji={"🔮"} label={"dislike"}/></DockButton>
      <SlideDown className={'my-dropdown-slidedown'}>
        {isOpen ?
          <div className={styles.slider}>
            <div className={styles.cardWrapper}>
              <button onClick={handleToggle} className={styles.closeButton}>
                x
              </button>
              <div className={styles.cardGrid}>
                <div className={styles.card}>
                  A Card
                </div>
                <div className={styles.card}>
                  A Card
                </div>
                <div className={styles.card}>
                  A Card
                </div>
                <div className={styles.card}>
                  A Card
                </div>
              </div>
            </div>
          </div>
          : null}
      </SlideDown>

    </>
  )
}

export default AlsoOnDock


// <>
// {!isOpen && <DockButton onClick={handleToggle}><Emoji emoji={"🔮"} label={"dislike"}/></DockButton>}
// {isOpen &&
// <div className={clsx(isOpen ? styles.slider : styles.closed)}>
//     <div className={styles.cardWrapper}>
//         <button onClick={handleToggle} className={styles.closeButton}>
//             x
//         </button>
//         <div className={styles.cardGrid}>
//             <div className={styles.card}>
//                 A Card
//             </div>
//             <div className={styles.card}>
//                 A Card
//             </div>
//             <div className={styles.card}>
//                 A Card
//             </div>
//             <div className={styles.card}>
//                 A Card
//             </div>
//         </div>
//     </div>
// </div>
// }
// </>
