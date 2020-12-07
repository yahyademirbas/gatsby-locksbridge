import React, { useRef, useState, useEffect, useMemo } from "react";
import { useViewportScroll, useTransform, motion } from "framer-motion";

import Img from 'gatsby-image';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import { fonts, weights, mediaQueries, jsBreakpoints } from '../../styles';

export default function ArtistPreview({
                                        frontmatter,
                                        yOffset = 200, // number > 0
                                        easing = [0.42, 0, 0.58, 1],
                                        // easing = "easeInOut", // [number, number, number, number] | "linear" | "easeIn" |
                                        triggerPoint = 0.25, // value between 0 and 1 (top and bottom of the window), point to start animation
                                        fadeOut = true, // true | false fade an element out on end of the animation
                                        ...rest
                                      }) {
  const Card = styled(motion.div)`
    width: 100%;
    margin-bottom: 116px;
    transition-duration: 0.4s;
    transition-timing-function: ease-out;
    ${mediaQueries.phoneLarge} {
      margin-bottom: 90px;
    }
    h2 {
      margin: 32px 0 14px;
      font-weight: ${weights.bold};
      font-size: 27px;
      line-height: 1.44;
      ${mediaQueries.phoneLarge} {
        width: 80%;
        margin: 50px auto 30px;
        font-size: 33px;
        line-height: 1.58;
      }
    }
    footer {
      font-family: ${fonts.sans};
      font-weight: ${weights.light};
      font-size: 15px;
      line-height: 2.4;
      ${mediaQueries.phoneLarge} {
        width: 80%;
        margin: 0 auto;
      }
    }
  `;

  const { scrollY } = useViewportScroll();
  const ref = useRef();
  const [elementTop, setElementTop] = useState(0);
  const [elementBottom, setElementBottom] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const setValues = () => {
      setElementTop(ref.current.offsetTop);
      setElementBottom(ref.current.offsetTop + ref.current.offsetHeight);
      setClientHeight(window.innerHeight);
    };

    setValues();
    document.addEventListener("load", setValues);
    window.addEventListener("resize", setValues);

    return () => {
      document.removeEventListener("load", setValues);
      window.removeEventListener("resize", setValues);
    };
  }, [ref, yOffset]);

  // const transformInitialValue =
  //   elementTop - window.innerHeight <= 0 ? 0 : elementTop - window.innerHeight;
  const transformInitialValue = elementTop - clientHeight * triggerPoint;
  const transformFinalValue = elementTop + yOffset;

  const yRange = [transformInitialValue, transformFinalValue];

  const y = useTransform(scrollY, yRange, [0, -yOffset], easing);

  const opacityInitialValue = fadeOut ? 0 : 1;
  const opacityRange = useMemo(() => [opacityInitialValue, 1], [
    opacityInitialValue
  ]);

  // const yOpacityRange = [transformInitialValue, transformFinalValue];
  const yOpacityRange = [elementBottom, transformFinalValue - yOffset];
  const opacity = useTransform(
    scrollY,
    yOpacityRange,
    opacityRange,
    "anticipate"
  );


  return (

        <Card ref={ref} initial={{ y: 0 }} style={{ y, opacity }} {...rest}>
          <Link
            css={css`
              display: block;
            `}
            to={frontmatter.slug}
          >
            <Img
              fluid={[
                frontmatter.hero.imageMobile.fluid,
                {
                  ...frontmatter.hero.imageDesktop.fluid,
                  media: `(min-width: ${jsBreakpoints.phoneLarge}px)`,
                },
              ]}
              alt={frontmatter.title}
            />

            <h2>{frontmatter.title}</h2>

            <footer>{`${frontmatter.area}`}</footer>
          </Link>
        </Card>
  );
}

ArtistPreview.propTypes = {
  frontmatter: PropTypes.object.isRequired,
};
