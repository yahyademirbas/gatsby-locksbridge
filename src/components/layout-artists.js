import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import { headerPropTypes } from "./HeaderTemplate/HeaderTemplate";
import HeaderTemplate from "./HeaderTemplate";

import "../styles/layout.css";
import Footer from "./Footer";

const Layout = ({ children, headerData }) => {

  function handleFirstTab(e) {
    if (e.keyCode === 9) {
      document.body.classList.add("user-is-tabbing");
    }
  }

  useEffect(() => window.addEventListener("keydown", handleFirstTab), []);

  return (
    <motion.div>

      <HeaderTemplate {...headerData} />

      <main>{children}</main>

      <Footer/>

    </motion.div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  headerData: PropTypes.shape(headerPropTypes)
};

Layout.defaultProps = {
  headerData: {}
};

export default Layout;
