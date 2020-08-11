import React, { useState } from "react";
import Toolbar from "../../Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const closeSideDrawer = () => {
    setShowSideDrawer(false);
  };

  const drawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <React.Fragment>
      <SideDrawer open={showSideDrawer} close={closeSideDrawer} />
      <Toolbar toggleSideDrawer={drawerToggleHandler} />
      <div className={classes.Content}>{props.children}</div>
    </React.Fragment>
  );
};

export default Layout;
