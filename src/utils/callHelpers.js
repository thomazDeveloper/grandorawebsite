import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import Contracts from '../config/constants/constants'

export const getDecimals = (pid) => {
  if (pid === 27) return 8
  return 18
}

export const balanceOf = (Contract, account) => {
  return Contract.methods
    .balanceOf(account)
    .call()
}

export const totalSupply = (Contract) => {
  return Contract.methods
    .totalSupply()
    .call()
}

export const allowance = async (lpContract, account) => {
  return lpContract.methods
    .allowance(account, Contracts.NFT.address)
    .call({ from: account })
}

export const isApprovedForAll = async (Contract, operator, account) => {
  return Contract.methods
    .isApprovedForAll(account, operator)
    .call({ from: account })
};

export const ApprovalForAll = async (lpContract, operator, account) => {
  return lpContract.methods
    .setApprovalForAll(operator, true)
    .send({ from: account })
}

export const approve = async (lpContract, account) => {
  return lpContract.methods
    .approve(Contracts.NFT.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const allTokens = async (nftContract) => {
  return nftContract.methods
    .allTokens()
    .call()
}

export const allTokensByUser = async (nftContract, account) => {
  return nftContract.methods
    .tokensOfUser(account)
    .call()
}

export const getNonOwners = async (nftContract, account) => {
  return nftContract.methods
    .nonOwnerNFTs()
    .call({ from: account })
}

export const getOwnNfts = (nftContract, account) => {
  return nftContract.methods
    .NFTOfOwner(account)
    .call({ from: account })
}

export const getNFT = async (nftContract, tokenId, account) => {
  return nftContract.methods
    .getNFT(Number(tokenId))
    .call({ from: account })
}


export const nftMint = async (nftContract, price, nftURI, supply, artist, collection, tokenType, account) => {
  return nftContract.methods
    .create(artist, supply, nftURI, new BigNumber(price).times(new BigNumber(10).pow(18)).toString(), collection, tokenType)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx, "over here, =========================")
      return tx.transactionHash
    })
}

export const buyNFT = async (nftContract, tokenId, supply, account) => {
  return nftContract.methods
    .buy(tokenId, supply)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const burnNFT = async (nftContract, tokenId, supply, account) => {
  return nftContract.methods
    .burn(tokenId, supply)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const claimable = async (poolContract, account) => {
  return poolContract.methods
    .claimable(account)
    .call()
}

export const getStakedBalance = async (poolContract, account) => {
  return poolContract.methods
    .userTokenBalanceOf(account)
    .call()
};

export const stakedTokens = async (poolContract, account) => {
  return poolContract.methods
    .stakedTokens(account)
    .call()
};

export const purchasedTokens = async (nftContract, account) => {
  return nftContract.methods
    .tokensOfUser(account)
    .call()
};

export const stake = async (nftContract, tokenId, account) => {
  return nftContract.methods
    .stake(tokenId)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const stakeAll = async (nftContract, account) => {
  return nftContract.methods
    .stakeAll()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const claim = async (nftContract, account) => {
  return nftContract.methods
    .claim()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (nftContract, tokenId, account) => {
  return nftContract.methods
    .unstake(tokenId)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstakeAll = async (nftContract, account) => {
  return nftContract.methods
    .unstakeAll()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const getUserInfo = async (contract, account) => {
  return contract.methods
    .userInfo(account)
    .call()
}

export const getAirNftURI = async (AirContract, tokenId, account) => {
  return AirContract.methods
    .tokenURI(tokenId)
    .call({ from: account })
}

export const tokensOfUser = async (nftContract, account) => {
  return nftContract.methods
    .tokensOfUser(account)
    .call()
};

export const getArtists = async (nftContract) => {
  return nftContract.methods
    .getArtists()
    .call()
};
