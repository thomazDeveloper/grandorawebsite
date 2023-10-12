import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { nftMint, totalSupply } from '../utils/callHelpers'
import { useNftContract } from './useContract'

const useMint = () => {
  const { account } = useWallet()
  const NftContract = useNftContract()

  const handleMint = useCallback(
    async (price: number, nftURI: string, supply: number, artist: string, tokenType: boolean, collection: number) => {
      if (account) {

        console.log(price, nftURI, supply, artist, collection, tokenType, "collection=============")

        let _totalSupply = await totalSupply(NftContract);
        let token_id = Number(_totalSupply) + 1;

        const txHash = await nftMint(NftContract, price, nftURI, supply, artist, collection, tokenType, account);
        txHash.token_id = token_id;

        return txHash;
      } else {
        return {};
      }
    },
    [account, NftContract],
  )

  return { onMint: handleMint }
}

export default useMint