import React  from "react";
import Transition from "../../components/Transition";
import { Global } from "@emotion/core";
import { globalStyles } from "../../styles";
import { Helmet } from "react-helmet";
import Footer from "../../components/Footer";

const CustomLayout = ({ element, props }) => {

  return (
    <>
      <Global styles={globalStyles} />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Transition {...props}>
        {element}
      </Transition>
      <Footer />
    </>
  );
};

export default CustomLayout;
