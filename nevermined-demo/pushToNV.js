import {Nevermined} from '@nevermined-io/nevermined-sdk-js'
import {config} from './config.js'
import {Contract, ethers, providers} from 'ethers'
import fetch from 'node-fetch'
import {createRequire} from "module"

const require = createRequire(import.meta.url);
const mintBaseABI = require("./abis/mint.json")
import {nftStoreContractAddress, nftBaseUri} from './config.js'

async function run() {

    const nevermined = await Nevermined.getInstance(config)

    let publisher, consumer
    [publisher, consumer] = await nevermined.accounts.list()

    const nfts = await fetchMarketNfts()

    nfts.forEach((nft) => {
        pushToNVM(nft, publisher, nevermined)
    })

    // const ddo = await pushToNVM(nfts[0], publisher, nevermined)

    // await pullFromNVM(ddo, consumer, nevermined)

    return

}

async function fetchMarketNfts() {
    const ethersProvider = ethers.providers.getDefaultProvider('https://rinkeby.infura.io/v3/972aefdad3964774ba27207ffe5d0247')

    let contract = new Contract(
        nftStoreContractAddress,
        mintBaseABI,
        ethersProvider)

    const totalSupply = await contract.totalSupply()
    const totalSupplyAsInt = parseInt(totalSupply.toString())

    const nftIndices = [...Array(totalSupplyAsInt).keys()]

    return Promise.all(
        nftIndices.map(async (i) => {
            let tokenIndex = await contract.functions.tokenByIndex(i)
            let tokenURI = await contract.functions.tokenURI(tokenIndex.toString())
            const nftId = tokenURI[0].split(nftBaseUri)[1]

            let nft = await fetchNft(nftId)
            return nft
        }))

}

async function fetchNft(nftId) {
    try {
        const response = await fetch(nftBaseUri.concat(nftId))
        const nftData = (await response.json())
        return nftData
    } catch (e) {
        console.log(e)
    }
}

async function pushToNVM(nft, publisher, nevermined) {

    console.log('NFT: ', nft)

    // Define the asset metadata
    // This are the required fields but we can add any additional fields we want
    // under additionalInformation
    const metadata = {
        main: {
            name: nft.name,
            type: 'dataset',
            dateCreated: new Date().toISOString().split('.')[0] + 'Z',
            datePublished: new Date().toISOString().split('.')[0] + 'Z',
            author: nft.attributes.filter((element) => element.trait_type === 'artist')[0].value,
            license: 'CC-BY',
            price: nft.price,
            files: [
                {
                    index: 0,
                    contentType: 'text/text',
                    url: nft.image
                }
            ]
        },
        additionalInformation: {
            website: nft.attributes.filter((element) => element.trait_type === 'website')[0].value,
            mintbaseUrl: nft.attributes.filter((element) => element.trait_type === 'mintbase_url')[0].value,
            artistAddress: nft.attributes.filter((element) => element.trait_type === 'artist_address')[0].value,
        }
    }

    console.log('metadata: ', metadata)

    // Publish the asset on nevermined
    const ddo = await nevermined.assets.create(metadata, publisher)
    console.log('Registered asset with DID:', ddo.id)

    return ddo
}

async function pullFromNVM(ddo, consumer, nevermined) {
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

run().then(r => console.log(r)).catch(e => console.log(e))

