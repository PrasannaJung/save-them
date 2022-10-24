import React from "react";
import Footer from "./Footer";
import MainNavigation from "./MainNavigation";

const Layout = props => {
  return (
    <div className='bg-primary min-h-screen text-white'>
      <MainNavigation />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
