import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { headerPropTypes } from "./Header/Header";
import Header from "./Header";
import { motion } from "framer-motion";

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
        <div>{children}</div>
    </motion.div>
  );
};

Layout.propTypes = {
  headerData: PropTypes.shape(headerPropTypes)
};

Layout.defaultProps = {
  headerData: {}
};

export default Layout;
