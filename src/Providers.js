import React from 'react'
import bsc, { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import getRpcUrl from './utils/getRpcUrl'
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
// import { Provider } from 'react-redux'
// import store from 'state'

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const Providers = ({ children }) => {
  const rpcUrl = getRpcUrl()

  return (
    //<Provider store={store}>
    <UseWalletProvider
      chainId={parseInt(97)}
      // chainId={parseInt(56)}
      connectors={{
        walletconnect: { rpcUrl },
        bsc,
      }}
    >
      <Web3ReactProvider getLibrary={getLibrary}>
        {children}
      </Web3ReactProvider>
    </UseWalletProvider>
    // </Provider>
  )
}
export default Providers
