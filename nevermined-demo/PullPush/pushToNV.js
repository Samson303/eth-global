import { Nevermined } from '@nevermined-io/nevermined-sdk-js'
import { config } from './config.js'
import { Contract, ethers, providers } from 'ethers'
import mintBaseABI from "../abis/mint.json"
import { nftStoreContractAddress } from '../config'

async function pushToNV() {
    // Instantiate nevermined with a config
    const nevermined = await Nevermined.getInstance(config)

    // Get two accounts. This is only available when using the SEED_WORDS
    let publisher, consumer
    [publisher, consumer] = await nevermined.accounts.list()

    // Define the asset metadata
    // This are the required fields but we can add any additional fields we want
    // under additionalInformation
    const metadata = {
        main: {
            name: 'Awesome artwork',
            type: 'dataset',
            dateCreated: new Date().toISOString().split('.')[0] + 'Z',
            datePublished: new Date().toISOString().split('.')[0] + 'Z',
            author: 'Technoking',
            license: 'CC-BY',
            price: '100',
            files: [
                {
                    index: 0,
                    contentType: 'text/text',
                    url: 'https://github.com/nevermined-io/sdk-js/raw/master/README.md'
                }
            ]
        },
        additionalInformation: {}
    }

    // Publish the asset on nevermined
    const ddo = await nevermined.assets.create(metadata, publisher)
    console.log('Registered asset with DID:', ddo.id)

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

async function pullFromMB() {
    // Get two accounts. This is only available when using the SEED_WORDS
    let consumer
    [ consumer ] = await nevermined.accounts.list()

    let storeContract = new Contract(
        nftStoreContractAddress,
        mintBaseABI,
        new providers.Web3Provider(consumer.currentProvider, 'rinkeby'))

    const totalSupply = await storeContract.totalSupply()
    const totalSupplyAsInt = parseInt(totalSupply.toString())
}

