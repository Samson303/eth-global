import { nftBaseUri, nftStoreContractAddress } from '../config'
import { useFirebase } from './FirebaseProvider'
import { Contract, ethers, providers } from 'ethers'
import mintBaseABI from '../abis/mint.json'
import { User } from './index'

export interface MintbaseNft {
  amountToMint: number
  attributes: any[]
  category: string
  contractAddress: string
  description: string
  ethPrice: string
  external_url: string
  fiatPrice: string
  forSale: boolean
  image: string
  minted: string
  mintedOn: string
  minter: string
  name: string
  price: number
  type: string
  visibility: string
  youtube_url: string
}

export interface Nft {
  nftArtist: string
  nftId: string
  nftData: MintbaseNft
  nftType: string
  nftMarketAddress?: string
  mintbaseUrl?: string
}

interface NftAttribute {
  trait_type: string
  value: any
  display_type?: any
}

interface NftProviderValue {
  fetchNft: (nftId: string) => Promise<Nft>
  getNft: (nftId: string) => Promise<Nft>
  error?: string
  nfts: Nft[]
}

interface Web3 {
  currentProvider: ethers.providers.ExternalProvider
}

const NftContext = createContext({} as NftProviderValue)

function NftProvider({ children }: { children: ReactNode }): ReactElement {

  useEffect(() => {
    if (!web3 || !wallet) return
    try {
      let loadedContract = new Contract(
        nftStoreContractAddress,
        mintBaseABI,
        new providers.Web3Provider((web3 as Web3).currentProvider, 'rinkeby'),
      )
      loadedContract = loadedContract.connect(wallet as ethers.Wallet)
      setContract(loadedContract)
    } catch (e) {
      setError(e.message)
      console.log('ERROR', e)
    }
  }, [web3, wallet])

  useEffect(() => {
    if (!contract) return
    fetchMarketNfts().then((nfts: Nft[]) => setNfts(nfts))
  }, [contract, setContract])

  const fetchMarketNfts = async () => {
    console.log('fetching ids')
    const totalSupply = await contract.totalSupply()
    const totalSupplyAsInt = parseInt(totalSupply.toString())

    const nftIndices = [...Array(totalSupplyAsInt).keys()]
    return Promise.all(
      nftIndices.map(async (i) => {
        let tokenIndex: ethers.BigNumber = await contract.functions.tokenByIndex(i)
        let tokenURI: string[] = await contract.functions.tokenURI(tokenIndex.toString())
        console.log(tokenURI)
        const nftId = tokenURI[0].split(nftBaseUri)[1]
        let nft: Nft = await fetchNft(nftId)
        console.log(nft)
        return nft
      }),
    )
  }

  const fetchNft = async (nftId: string): Promise<Nft> => {
    const response = await fetch(nftBaseUri.concat(nftId))
    const nftData = (await response.json()) as MintbaseNft

    let nftArtist: string = undefined
    let nftType: string = undefined
    let nftMarketAddress: string = undefined
    let mintbaseUrl: string = undefined

    //retrieving attributes
    if (nftData.attributes) {
      try {
        nftArtist = nftData.attributes.filter(
          (attribute: NftAttribute) =>
            ['artist', 'artist_name'].indexOf(attribute.trait_type) >= 0,
        )[0].value
      } catch (e) {
        nftArtist = 'artist_name'
        console.log(e)
      }
      try {
        nftType = nftData.attributes.filter(
          (attribute: NftAttribute) => ['nft_type', 'type'].indexOf(attribute.trait_type) >= 0,
        )[0].value
      } catch (e) {
        nftType = 'artwork'
        console.log(e)
      }
      try {
        mintbaseUrl = nftData.attributes.filter(
          (attribute: NftAttribute) => attribute.trait_type === 'mintbase_url',
        )[0].value
      } catch (e) {
        mintbaseUrl = 'mintbase_url'
      }
      try {
        console.log('fetching market for nft')
        nftMarketAddress = await getMarketAddressForNFT(nftId)
      } catch (e) {
        console.log(e)
      }

      const fetchedNft = {
        nftId: nftId,
        nftData: nftData,
        nftArtist: nftArtist,
        nftType: nftType,
        nftMarketAddress: nftMarketAddress,
        mintbaseUrl: mintbaseUrl,
      }

      return fetchedNft
    }
  }

  const getNft = async (nftId: string) => {
    if (!nfts) return
    let nft: Nft
    const nftFetched = nfts.filter((nft) => nft.nftId === nftId)
    if (nftFetched.length) {
      console.log('🦋 got it!', nftId)
      nft = nftFetched[0]
    } else {
      console.log('💋 got to it!', nftId)
      nft = await fetchNft(nftId)
    }

    return nft
  }

  return (
    <NftContext.Provider
      value={
        {
          fetchNft,
          nfts,
          getNft,
        } as NftProviderValue
      }
    >
      {children}
    </NftContext.Provider>
  )
}

// Helper hook to access the provider values
const useNft = (): NftProviderValue => useContext(NftContext)
export { NftProvider, useNft, NftContext }
export default NftProvider
