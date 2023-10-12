import { createSlice } from '@reduxjs/toolkit';
import { NFTItemProps, CartList } from 'core/interfaces/pages';

interface NFTProps {
    nfts: CartList[],
    nftItem: NFTItemProps
}

const initialState: NFTProps = {
    nfts: [],
    nftItem: {}
}

const nft = createSlice({
    name: 'nft',
    initialState,
    reducers: {
        stoerAllNfts(state, action) {
            state.nfts = action.payload;
        },
        storeNftItem(state, action) {
            state.nftItem = action.payload;
        },
        initialize(state) {
            state.nftItem = {};
            state.nfts = [];
        }
    }
});

export const { stoerAllNfts, storeNftItem, initialize } = nft.actions;

export default nft.reducer;

