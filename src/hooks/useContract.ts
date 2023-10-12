import { useEffect, useState } from 'react'
import useWeb3 from './useWeb3'
import contracts from '../config/constants/constants'

const useContract = (abi: any, address: any, contractOptions?: any) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useNftContract = () => {
  return useContract(contracts.NFT.abi, contracts.NFT.address)
}

export const useStakeContract = () => {
  return useContract(contracts.stake.abi, contracts.stake.address)
}

export const useBepContract = () => {
  return useContract(contracts.bep.abi, contracts.bep.address)
}

export const useErcContract = () => {
  return useContract(contracts.erc.abi, contracts.erc.address)
}

export default useContract;