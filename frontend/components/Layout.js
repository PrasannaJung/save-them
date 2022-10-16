import React from "react";
import MainNavigation from "./MainNavigation";

const Layout = props => {
  return (
    <div className='bg-primary min-h-screen text-white'>
      <MainNavigation />
      {props.children}
    </div>
  );
};

export default Layout;
