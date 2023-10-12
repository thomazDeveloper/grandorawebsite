import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../index.css";
import { useDispatch } from "core/store/store";
import { initialize } from "core/store/reducers/nft";

const Layout = ({ children }: any) => {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("initialize")
  //   dispatch(initialize());
  // }, [])

  return (
    <div className="w-full">
      <BrowserRouter>
        <div className="fixed w-full h-30 z-2000">
          <Header />
        </div>
        <div>{children}</div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Layout;
