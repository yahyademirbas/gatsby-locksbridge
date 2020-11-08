/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { graphql, navigate } from "gatsby";

import Button from "../../components/Button";
import { colors, mediaQueries, container } from "../../styles";

import img from "./icons/data.png";

import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";


export default function ArtistPageSlide({ title, description, icon, link, data }) {
  const ref = useRef();
  const [width, setWidth] = useState(0);

  function debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(_ => {
        timer = null;
        fn.apply(this, args);
      }, ms);
    };
  }

  useEffect(() => {
    function handleResize() {
      let getWidth = 0;
      const w = window.innerWidth;
      switch (true) {
        case w >= 1025:
          getWidth =
            ref.current.children[0].children[1].clientWidth +
            window.innerWidth * 0.3;
          break;
        case w >= 900:
          getWidth =
            ref.current.children[0].children[1].clientWidth +
            window.innerWidth * 0.4;
          break;
        default:
          getWidth = window.innerWidth;
          break;
      }
      setWidth(getWidth);
    }

    const debouncedHandleResize = debounce(handleResize, 100);

    window.addEventListener("resize", debouncedHandleResize);
    window.addEventListener("orientationchange", debouncedHandleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      window.addEventListener("orientationchange", debouncedHandleResize);
    };
  }, []);

  const imageSrc = require(`${icon}`);
  const Card = styled.div`
    opacity: 1 !important;

    .animate-opacity {
      opacity: 0;
      transition: opacity 1s ease;
    }

    h3 {
      line-height: 1.57;
      letter-spacing: 1.5px;

      ${mediaQueries.desktop} {
        line-height: 1.375;
      }
    }
  `;

  const P = styled.p`
    color: ${colors.tagGray};
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.2px;
    line-height: 27px;
    text-align: justify;
    max-width: 100%;
    width: 100%;
    min-height: 81px;
    margin-top: 24px;

    ${mediaQueries.phoneLarge} {
      margin-top: 24px;
      margin-bottom: 84px;
    }
  `;

  const H3 = styled.h3`
    font-size: 60px !important;
    font-weight: 500;
    letter-spacing: -0.7px;
    line-height: 90px;
    text-align: center;
    color: ${colors.lightblue};
    transition: color 1s ease;
    text-stroke: ${colors.tagGray};
    -webkit-text-stroke: ${colors.tagGray};
    text-stroke-width: 1px;
    -webkit-text-stroke-width: 1px;
    -webkit-font-smoothing: antialiased;

    ${mediaQueries.phoneLarge} {
      font-size: 115px !important;
      font-weight: 500;
      letter-spacing: 1.53px;
      line-height: 76px;
    }
  `;

  return (
    <Card ref={ref} style={{ width }}>
      <span
        css={[
          container.max,
          css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            img {
              width: 50px;
              height: 50px;
            }

            .slider-button {
              opacity: 0;
              transition: opacity 1s ease;
              margin-bottom: 48px;

              ${mediaQueries.phoneLarge} {
                margin-bottom: 0;
              }
            }
          `
        ]}
      >
        <img className='animate-opacity' src={imageSrc} alt={title} />
        <H3>{title}</H3>

        {title === "About" && <Button />}
        {title === "Images" && <img />}
        {title === "Videos" && <Button />}
        {title === "Recordings" && <img />}
        {title === "About" &&
        <MDXProvider>
          <P className='animate-opacity'><MDXRenderer>{data.file.childMdx.body}</MDXRenderer></P>
        </MDXProvider>
        }
        {title === "Images" &&
          <div>a</div>
        }
        {title === "Videos" &&
        <MDXProvider>
          <P className='animate-opacity'><MDXRenderer>{data.file.childMdx.body}</MDXRenderer></P>
        </MDXProvider>
        }
        {title === "Recordings" &&
        <MDXProvider>
          <P className='animate-opacity'><MDXRenderer>{data.file.childMdx.body}</MDXRenderer></P>
        </MDXProvider>
        }
      </span>
    </Card>
  );
}


ArtistPageSlide.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  data: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string
};

ArtistPageSlide.defaultProps = {
  title: "Title",
  icon: img,
  link: "Link"
};
