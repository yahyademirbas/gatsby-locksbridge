/* eslint-disable no-bitwise */
import React from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Img from "gatsby-image";
import { motion } from "framer-motion";

import ScrollAnimation from "../ScrollAnimation";
import { scale } from "../../util/utils";
import TopNav from "../TopNav";
import SEO from "../seo";
import { colors, fonts, mediaQueries, weights } from "../../styles";
import FullWidthSection from "../FullWidthSection";
import FeaturesSlider from "../FeaturesSlider";

/**
 * Header used on every page.
 *
 * @param {string} title - passed through to SEO
 * @param {object} subTitle
 * @param {string} label
 * @param {bool} labelMobileOnly
 * @param {bool} hideNav
 * @param {string} metaTitle - passed through to SEO
 * @param {string} description - passed through to SEO
 * @param {string} height - passed to wrapper component
 * @param {string} mobileMinHeight - passed to wrapper component
 * @param {node} children
 * @param {string} color - passed to background color
 * @param {boolean} invert - passed through to TopNav
 * @param {string} titleMarginBottom - passed to title
 * @param {string} titlePadding - passed to title
 * @param {string} image - passed to SEO
 * @param {boolean} newsSlider - used for main page
 * @param {node} bgUrl - bg image
 */
function Header({
                  title,
                  label,
                  labelMobileOnly,
                  metaTitle,
                  description,
                  height,
                  mobileMinHeight,
                  children,
                  color,
                  invert,
                  titleMarginBottom,
                  titlePadding,
                  image,
                  subTitle,
                  hideNav,
                  newsSlider,
                  bgUrl
                }) {
  const isLightBackground = value => {
    let r;
    let g;
    let b;

    if (value.match(/^rgb/)) {
      // If HEX, store the red, green, blue values in separate variables.
      [r, g, b] = value.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );
    } else {
      // If RGB, convert it to HEX
      // @see: http://gist.github.com/983661
      const rgbVal = +`0x${value
        .slice(1)
        .replace(value.length < 5 && /./g, "$&$&")}`;

      r = rgbVal >> 16;
      g = rgbVal & 255;
      b = (rgbVal >> 8) & 255;
    }
    return (
      Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b)) > 127.5
    );
  };

  const fontColor =
    isLightBackground(color) && !invert ? colors.darkgray : colors.lightgray;

  const headerTitle = css`
    @keyframes headerSlide {
      0% {
        transform: translateY(100%);
      }
      100% {
        transform: translateY(0);
      }
    }

    @keyframes afterReveal {
      0% {
        height: 100%;
      }
      100% {
        height: 0;
      }
    }

    position: relative;
    margin-bottom: ${titleMarginBottom};
    padding: 0 20px;
    line-height: 1.23;
    font-size: 39px;
    font-weight: ${weights.medium};
    letter-spacing: -0.45px;
    text-align: center;
    color: ${fontColor};
    transform: translateY(100%);
    animation-name: headerSlide;
    animation-duration: 0.7s;
    animation-timing-function: ease-out;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: transparent;
      animation-name: afterReveal;
      animation-duration: inherit;
      animation-timing-function: inherit;
      animation-iteration-count: inherit;
      animation-fill-mode: inherit;
    }

    ${mediaQueries.phoneLarge} {
      width: 75%;
      padding: ${titlePadding};
      font-size: 72px;
      line-height: 1.17;
      letter-spacing: -1px;
    }

    ${mediaQueries.desktop} {
      width: 60%;
    }
  `;
  const sectionCSS = css`
    padding: 88px 0;
    background-color: ${color};
  `;
  const headerSubTitle = css`
    margin-top: 32px;
    font-family: ${fonts.sans};
    font-size: 15px;
    font-weight: ${weights.regular};
    line-height: 2.4;
    text-transform: capitalize;
    color: ${fontColor};
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 600px;
    width: 100%;
    transform: translateY(50%);
    animation-name: headerSlide;
    animation-duration: 0.7s;
    animation-timing-function: ease-out;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    ${mediaQueries.desktop} {
      margin-bottom: 42px;
      ${labelMobileOnly && `display: none`};
    }
  `;
  const headerlabel = css`
    margin-bottom: 32px;
    font-family: ${fonts.sans};
    font-size: 15px;
    font-weight: ${weights.light};
    line-height: 2.4;
    text-transform: capitalize;
    color: ${fontColor};
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;

    ${mediaQueries.desktop} {
      margin-bottom: 42px;
      ${labelMobileOnly && `display: none`};
    }
  `;

  const Cover = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: -3;
    transform-origin: center bottom;
  `;

  const BgImg = styled(Img)`
    position: absolute;
    width: 100%;
    height: 100%;

    & > img {
      object-fit: cover !important;
      object-position: 50% 50% !important;
    }
  `;

  const Height = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-align: left;
    margin: 0;
    padding: 0;
  `;

  return (
    <>
      <SEO title={metaTitle || title} description={description} image={image} />
      <TopNav fill={fontColor} hideNav={hideNav} />
      <ScrollAnimation
        render={({ progress }) => {
          let zoom = scale(progress, 1, 1.2);
          let zoom2 = scale(progress, 1, 1.1);
          return (
            <FullWidthSection
              css={sectionCSS}
              height={height}
              minHeight={mobileMinHeight}
            >
              <Height style={{
                scale: zoom2
              }}>
                {newsSlider && (
                  <FeaturesSlider />
                )}
                {label && (
                  <span data-cy='labelText' css={headerlabel}>
                    {label}
                  </span>
                )}
                {title && (
                  <h1 data-cy='titleText' css={headerTitle}>
                    {title}
                  </h1>
                )}
                {subTitle && (
                  <span data-cy='labelText' css={headerSubTitle}>
                    {subTitle}
                  </span>
                )}
              </Height>
              {children && children}
              {bgUrl && (
              <Cover
                style={{
                  scale: zoom
                }}
              >
                <BgImg
                  fluid={bgUrl.fluid}
                  alt=""
                />
              </Cover>
              )}
            </FullWidthSection>
          );
        }}

      />

    </>
  );
};

// This is exported for use in layout.js.
export const headerPropTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  subTitle: PropTypes.object,
  label: PropTypes.string,
  labelMobileOnly: PropTypes.bool,
  metaTitle: PropTypes.string,
  description: PropTypes.string,
  height: PropTypes.string,
  mobileMinHeight: PropTypes.string,
  children: PropTypes.node,
  invert: PropTypes.bool,
  color: PropTypes.string,
  titleMarginBottom: PropTypes.string,
  titlePadding: PropTypes.string,
  image: PropTypes.string,
  hideNav: PropTypes.bool,
  bgUrl: PropTypes.node
};

Header.propTypes = headerPropTypes;

Header.defaultProps = {
  title: null,
  subTitle: null,
  label: null,
  labelMobileOnly: false,
  metaTitle: null,
  description: null,
  height: "100vh",
  mobileMinHeight: "100vh",
  children: null,
  invert: false,
  color: colors.yellow,
  titleMarginBottom: "0",
  titlePadding: "0 20px",
  image: null,
  hideNav: false,
  newsSlider: false,
  bgUrl: null
};

export default Header;
