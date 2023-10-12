import { useContext ,useEffect} from 'react';
import SearchContext from '../../context/SearchToken';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import Swap from '../../components/swap';
import Pool from '../../components/pool';
import TopBar from '../../components/top-bar';

import './trade.css';

const Trade = () => {

    const { state } = useContext(SearchContext);
    const { app } = state;
    const {account,status}=useWallet
  
    return (
        <>
            {/* <TopBar /> */}
            <div className="trade-container justify-center redline">
                {
                    app === 1 ? <Swap /> : app === 2 ? <Pool /> : <></>
                }
            </div>
        </>
    )
}

export default Trade;