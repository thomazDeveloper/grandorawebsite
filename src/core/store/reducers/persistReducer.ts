import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'grandora',
    storage,
    whitelist: ['nft']
};

const persist = (reducers: any) => persistReducer(persistConfig, reducers);

export default persist;
