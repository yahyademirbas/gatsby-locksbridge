import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

import { headerPropTypes } from "./Header/Header";
import Header from "./Header";

import "../styles/layout.css";

const Layout = ({ headerData, children }) => {
  function handleFirstTab(e) {
    if (e.keyCode === 9) {
      document.body.classList.add("user-is-tabbing");
    }
  }

  useEffect(() => window.addEventListener("keydown", handleFirstTab), []);

  return (
    <motion.div>

      <Header {...headerData} />

      <main>{children}</main>

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
