export const nft_store = (params: any) => {
    return (dispatch: any) =>
        dispatch({
            type: 'ALLNFTS',
            payload: params,
        });
};
