import * as React from 'react'
import { Global } from '@emotion/core';
import PropTypes from 'prop-types';

import { globalStyles } from '../styles';

import { headerPropTypes } from './mdxHeader/mdxHeader';
import mdxHeader from './mdxHeader';
import Footer from './Footer';
import { MDXProvider } from "@mdx-js/react"
import { MdxLink } from "gatsby-theme-i18n"


import '../styles/layout.css';

const components = {
    a: MdxLink,
}

export default function Layout({ children, headerData }) {
  return(
  <>
      <Global styles={globalStyles} />
      <mdxHeader {...headerData} />
      <main>
        <MDXProvider components={components}>{children}</MDXProvider>
      </main>
      <Footer />
  </>
)};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    headerData: PropTypes.shape(headerPropTypes),
};

Layout.defaultProps = {
    headerData: {},
};

