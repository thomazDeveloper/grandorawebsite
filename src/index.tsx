import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,Navigate, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { MetaMaskProvider } from "metamask-react";
import Providers from './Providers';

import Layout from "./layouts";
import { store, persister } from "./core/store/store";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Product from "./pages/Products";
import ProductDetal from "./pages/Products/ProductDetail";
import Marketplace from "./pages/Marketplace";
import Team from "./pages/team";

import Mint from "./pages/Marketplace/Mint/mint";
import Create from "./pages/Marketplace/Mint/create";
import Inventor from "./pages/Marketplace/Mint/inventor";
import InventorDetail from "pages/Marketplace/Mint/productdetail";

import MarketProducts from "./pages/Marketplace/marketproducts";
import NFTProductDetail from "./pages/Marketplace/NFTProductDetail";
import ProductFilterModal from "./pages/Marketplace/ProductfilterModal";
import Trade from "./pages/Trade"
import UserSetting from './pages/User/setting';
import UserProfile from './pages/User/profile';
import UserInventory from './pages/User/inventory';
import News from "./pages/News";
import Gameplays from "./pages/Gameplay";
import Shoppingcart from "./pages/shopcart";
import StayTuned from "./pages/Upcoming/StayTuned";
import ComingYellow from "./pages/Upcoming/ComingYellow";

import ComingSoon from "./pages/Upcoming/ComingSoon";
import AuthProvider from "./context/AuthProvider";
import { SearchTokenProvider } from './context/SearchToken';
import Offers from "./components/Offers/Offers";
import Favourite from "./components/Dashboard/Favourite";
import DashboardSingleCollection from "./pages/Dashboard/DashboardSingleCollection";
import Dashboard from "./pages/Dashboard/Dashboard";
import Item from "./components/Dashboard/Item";
import DashboardItem from "./pages/Dashboard/DashboardItem";
import DashboardFavourite from "./pages/Dashboard/DashboardFavourite";
import DashboardCollections from "./pages/Dashboard/DashboardCollections";
import DashboardActivity from "./pages/Dashboard/DashboardActivity";
import { BsUpload } from "react-icons/bs";
import { PersistGate } from 'redux-persist/integration/react';
import { CookiesProvider } from "react-cookie";
import Protected from "protected"
import GameProducts from "./pages/Marketplace/marketproducts";


 const container = document.getElementById('root');
// // Create a root.
 const root = ReactDOM.createRoot(container!);

root.render(
  <Providers>
    <MetaMaskProvider> 
    <AuthProvider>
    <SearchTokenProvider>
      <Provider store={store}>
        <CookiesProvider>
        <PersistGate loading={null} persistor={persister}>
       
          <Layout>
            <Routes>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="map" element={<Map />} />
              <Route path="product" element={<Product />} />
              <Route path="product/detail/:id" element={<ProductDetal />} />
              <Route path="team" element={<Team />} />

              <Route path="mint" element={<Protected><Mint /></Protected>} />
              <Route path="mint/upload" element={<Protected><Create /></Protected>} />
              <Route path="mint/inventor" element={<Protected><Inventor /></Protected>} />
              <Route path="mint/inventor/detail" element={<Protected><InventorDetail /></Protected>} />

              <Route path="marketplace" element={<Marketplace />} />
              <Route path="marketplace/nft-product" element={<MarketProducts />} />
              <Route path="marketplace/in-game" element={<GameProducts />} />
              <Route path="user/setting" element={<Protected><UserSetting /></Protected>} />
              <Route path="user/profile" element={<Protected><UserProfile /></Protected>} />
              <Route path="user/inventory" element={<Protected><UserInventory /></Protected>} />
              <Route
                path="marketplace/productdetail/:id"
                element={<NFTProductDetail />}
              />
              <Route
                path="marketplace/ProductFilterModal"
                element={<ProductFilterModal />}
              />
              <Route path="news" element={<News />} />
              <Route path="gameplay" element={<Gameplays />} />
              <Route path="shopcart" element={<Shoppingcart />} />
              <Route path="stay" element={<ComingSoon />} />
             
              <Route path="swap" element={<Protected><Trade/></Protected>}/>
              <Route path="offers" element={<Offers />} />
              <Route path="dashboard" element={<Protected><Dashboard /></Protected>} />
              <Route path="dashboard/item" element={<DashboardItem />} />
              <Route path="dashboard/collections" element={<DashboardCollections />} />
              <Route path="dashboard/collection/1" element={<DashboardSingleCollection />} />
              <Route path="dashboard/activity" element={<DashboardActivity />} />
              <Route path="dashboard/favourite" element={<DashboardFavourite />} />
            </Routes>
          </Layout>
        </PersistGate>
        </CookiesProvider>
      </Provider>
     </SearchTokenProvider>
    </AuthProvider>
     </MetaMaskProvider> 
  </Providers>,
 // document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
