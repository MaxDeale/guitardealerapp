import React, { useState } from "react";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import { Drawer, Button, Icon } from "antd";
import "./Sections/Navbar.css";
import logo from "./dealer.png";
import styles from "./navbar.module.css";

function NavBar() {
  const [visible, setVisible] = useState(false);
  //toggles dropdown menu
  const showDrawer = () => {
    setVisible(true);
  };
  //closes menu
  const onClose = () => {
    setVisible(false);
  };

  //navbar uses antd package for responsive menu button
  return (
    <nav
      className="menu"
      id={styles.mainNav}
      style={{ position: "fixed", zIndex: "5", width: "100%" }}
    >
      <div id={styles.logoContainer}>
        <a href="/">
          <img id={styles.logo} src={logo} alt="dt" />
        </a>
      </div>
      <p
        id={styles.view}
        style={{ fontFamily: "pacifico", marginLeft: "20px", fontSize: "1rem" }}
      >
        click to view products
      </p>
      <div className="menu__container">
        <div className="menu_right">
          <RightMenu mode="horizontal" />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );
}

export default NavBar;
