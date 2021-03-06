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

    // console.log(nfts[0])

    nfts.forEach((nft) => {
        pushToNVM(nft, publisher, nevermined)
    })

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

    const checkAttribute = (nft, attribute) => {
        console.log(nft.attributes)
        let attributeValue = (nft.attributes.filter((element) => element.trait_type === attribute).length > 0) ? nft.attributes.filter((element) => element.trait_type === attribute)[0].value : ''
        return attributeValue
    }

    const metadata = {
        main: {
            name: nft.name,
            type: 'dataset',
            dateCreated: new Date().toISOString().split('.')[0] + 'Z',
            datePublished: new Date().toISOString().split('.')[0] + 'Z',
            author: checkAttribute(nft, 'artist'),
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
            image: nft.image,
            website: checkAttribute(nft, 'website'),
            mintbaseUrl: checkAttribute(nft, 'mintbase_url'),
            artistAddress: checkAttribute(nft, 'artist_address'),
            description: nft.description,
            price: nft.ethPrice,
            mintedAt: nft.mintedOn
        }
    }

    // console.log('metadata: ', metadata)

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

