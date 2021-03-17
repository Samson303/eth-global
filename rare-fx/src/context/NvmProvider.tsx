import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import { Nevermined } from '@nevermined-io/nevermined-sdk-js'
import { config } from '../../config'

interface NvmProviderValue {

}

const NvmContext = createContext({} as NvmProviderValue)

function NvmProvider({ children }: {children: ReactNode}): ReactElement {

  const [nvm, setNvm] = useState<any>()
  const [consumer, setConsumer] = useState<any>()

  useEffect(() => {
    setupNvm()
  }, [])

  useEffect(() => {
    setupConsumer()
  }, [])

  const setupNvm = async () => {
    const nevermined: any = await Nevermined.getInstance(config)
    setNvm(nevermined)
  }

  const setupConsumer = async () => {
    let cons
    [cons] = await nvm.accounts.list()
    setConsumer(cons)
  }

  const getNfts = async () => {

  }

  async function pullFromNVM(ddo: any, consumer: any, nevermined: any) {
    // Request some tokens from the faucet so that the consumer
    // can purchase the asset
    await consumer.requestTokens(100)

    // Order the access service associated with the asset
    const service = ddo.findServiceByType('access')
    const agreementId = await nevermined.assets.order(ddo.id, service.index, consumer)
    console.log("Order asset with service agreement id:", agreementId)
    // Now that we ordered the asset we can consume it
    const path = await nevermined.assets.consume(
      agreementId,
      ddo.id,
      service.index,
      consumer,
      './downloads'
    )
    console.log("File(s) downloaded to:", path)
  }

  return (
    <NvmContext.Provider
      value={
        {
        } as NvmProviderValue
      }
    >
      {children}
    </NvmContext.Provider>
  )
}

const useNvm = (): NvmProviderValue => useContext(NvmContext)
export { NvmProvider, useNvm, NvmContext }
export default NvmProvider


