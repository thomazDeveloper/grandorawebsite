import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allTokens, allTokensByUser, burnNFT, purchasedTokens } from '../utils/callHelpers'
import { useNftContract } from './useContract'
import axios from 'axios'
import { SERVER_URL } from 'config/config';

const useAllNFT = () => {
    const { account } = useWallet()
    const NftContract = useNftContract()

    const getAllNFTs = useCallback(
        async () => {

            const tokenuris = await allTokens(NftContract);

            //console.log(tokenuris, "tokenuris")

            let userPurchasedTokens = [];
            if (account) {
                userPurchasedTokens = await purchasedTokens(NftContract, account);
            }

            let tokeninfos: Array<Object> = [];
            for (let i = 0; i < tokenuris.length; i++) {
                try {
                    const res = await fetch(tokenuris[i].tokenURI);
                    const json = await res.json();
                    if (Number(tokenuris[i].balance) > 0) {
                        tokeninfos.push({
                            ...json,
                            id: tokenuris[i].tokenId,
                            owner: userPurchasedTokens.find((e: any) => e.tokenId === tokenuris[i].tokenId) ? account : tokenuris[i].artist,
                            supply: tokenuris[i].balance,
                            tokenType: tokenuris[i].tokenType
                        });
                    }
                } catch (error) {
                    console.log(error)
                }
            }

           // console.log(tokeninfos, "tokeninfos")

            return tokeninfos;

        },
        [account, NftContract],
    )

    const getNFTsByUser = useCallback(
        async () => {

            const tokenuris = await allTokensByUser(NftContract, account);

            let tokeninfos: Array<Object> = [];
            for (let i = 0; i < tokenuris.length; i++) {
                try {
                    const res = await fetch(tokenuris[i].tokenURI);
                    const json = await res.json();

                    tokeninfos.push({
                        ...json,
                        id: tokenuris[i].tokenId,
                        owner: tokenuris[i].artist,
                        supply: tokenuris[i].balance,
                        tokenType: tokenuris[i].tokenType
                    });
                } catch (error) {
                    console.log(error)
                }
            }

            return tokeninfos;

        },
        [account, NftContract],
    )

    const onBurnNFT = useCallback(async (tokenId: string, quantity: number) => {

        if (account) {
            try {
                const txHash = await burnNFT(NftContract, tokenId, quantity, account)
                return txHash;
            } catch (error) {
                console.log(error);
                return {};
            }
        }
        else {
            return {};
        }

    }, [account, NftContract])

    const getLatestNFTHistory = useCallback(async () => {
        try {
            let txs = await axios.get(`${SERVER_URL}api/getLatestHistory`);
            return txs;
        } catch (error) {
            console.log(error);
            return [];
        }
    }, [])

    return { getAllNFTs, getNFTsByUser, onBurnNFT, getLatestNFTHistory }
}

export default useAllNFT
