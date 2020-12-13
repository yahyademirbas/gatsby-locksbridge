import React  from "react";
import Transition from "../../components/Transition";
import { Global } from "@emotion/core";
import { globalStyles } from "../../styles";
import { Helmet } from "react-helmet";

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
    </>
  );
};

export default CustomLayout;
