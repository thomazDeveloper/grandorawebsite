import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allowance, approve, buyNFT } from '../utils/callHelpers'
import { useNftContract, useBepContract, useErcContract } from './useContract'
import { BatchBuyProps } from 'core/interfaces/pages';

const useBuyNFT = () => {
    const { account } = useWallet()
    const bepContract = useBepContract()
    const ercContract = useErcContract()
    const nftContract = useNftContract()

    const _handleBuy = useCallback(async (tokenId: string, price: string, quantity: number, tokenType: boolean) => {
        if (account) {
            try {
                let _tokenIds: string[] = [tokenId];
                let _quantity: number[] = [quantity];
                let allowed: any;

                console.log(_tokenIds, _quantity, "_quantity")

                if (tokenType) {
                    allowed = await allowance(bepContract, account);
                    if (Number(new BigNumber(allowed).toString()) < Number(new BigNumber(price).times(new BigNumber(10).pow(18)).toString())) {
                        await approve(bepContract, account)
                    }
                } else {
                    allowed = await allowance(ercContract, account);
                    if (Number(new BigNumber(allowed).toString()) < Number(new BigNumber(price).times(new BigNumber(10).pow(18)).toString())) {
                        await approve(ercContract, account)
                    }
                }

                console.log(allowed, "allowed")

                const txHash = await buyNFT(nftContract, _tokenIds, _quantity, account)
                return txHash;

            } catch (error) {
                console.log(error);
                return {};
            }
        } else {
            return {};
        }
    }, [account, bepContract, nftContract])

    const batchBuy = useCallback(async (products: BatchBuyProps[]) => {
        if (account) {
            try {
                console.log(products, "products");
                let _tokenIds: string[] = [];
                let _quantity: number[] = [];
                let allowed: number;

                let bepToken = 0;
                let ercToken = 0;

                for (let i = 0; i < products.length; i++) {
                    const prod = products[i];
                    if (prod.tokenType) {
                        bepToken += (prod.price * prod.quantity);
                    } else {
                        ercToken += (prod.price * prod.quantity);
                    }
                    _tokenIds.push(prod.tokenId);
                    _quantity.push(prod.quantity);
                }

                if (bepToken > 0) {
                    allowed = await allowance(bepContract, account);
                    if (Number(new BigNumber(allowed).toString()) < Number(new BigNumber(bepToken).times(new BigNumber(10).pow(18)).toString())) {
                        await approve(bepContract, account)
                    }
                }

                if (ercToken > 0) {
                    allowed = await allowance(ercContract, account);
                    if (Number(new BigNumber(allowed).toString()) < Number(new BigNumber(ercToken).times(new BigNumber(10).pow(18)).toString())) {
                        await approve(ercContract, account)
                    }
                }

                console.log(_tokenIds, _quantity)
                const txHash = await buyNFT(nftContract, _tokenIds, _quantity, account)
                return txHash;
            } catch (error) {
                console.log(error);
                return {};
            }

        } else {
            return {};
        }

    }, [account, bepContract, nftContract])

    return { singleBuy: _handleBuy, batchBuy }
}

export default useBuyNFT