import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface SliderProviderValue {
  currentIndex: number
  next: () => void
  prev: () => void
}

const SliderContext = createContext({} as SliderProviderValue)

function SliderProvider({ children }: { children: ReactNode }): ReactElement {
  const [currentIndex, setIndex] = useState(0)

  const numberOfIndexes = (numberOfItems: number) => {
    return numberOfItems - 1
  }
  const next = (numberOfItems: number) => {
    const numberOfIndex = numberOfIndexes(numberOfItems)
    const newIndex = currentIndex === numberOfIndex ? 0 : currentIndex + 1
    setIndex(newIndex)
  }

  const prev = (numberOfItems: number) => {
    const numberOfIndex = numberOfIndexes(numberOfItems)
    const newIndex = currentIndex === 0 ? numberOfIndex : currentIndex - 1
    setIndex(newIndex)
  }

  return (
    <SliderContext.Provider
      value={
        {
          currentIndex,
          next,
          prev,
        } as SliderProviderValue
      }
    >
      {children}
    </SliderContext.Provider>
  )
}

const useSlider = (): SliderProviderValue => useContext(SliderContext)
export { SliderProvider, useSlider, SliderContext }
