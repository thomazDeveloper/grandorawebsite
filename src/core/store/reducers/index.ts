import { combineReducers } from 'redux';

import nftReducer from './nft';
import authReducer from './auth';

const reducer = combineReducers({
    nft: nftReducer,
    auth: authReducer
});

export default reducer;