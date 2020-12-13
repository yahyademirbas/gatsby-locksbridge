import React, { useRef, useState, useEffect, useMemo } from "react";
import { useViewportScroll, useTransform, motion } from "framer-motion";

import Img from "gatsby-image";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import PropTypes from "prop-types";
import { LocalizedLink as Link } from "gatsby-theme-i18n";

import { weights, mediaQueries, jsBreakpoints } from "../../styles";

export default function PostPreview({
                                      frontmatter,
                                      excerpt,
                                      yOffset = 200, // number > 0
                                      easing = [0.42, 0, 0.58, 1],
                                      // easing = "easeInOut", // [number, number, number, number] | "linear" | "easeIn" |
                                      triggerPoint = 0.25, // value between 0 and 1 (top and bottom of the window), point to start animation
                                      fadeOut = true, // true | false fade an element out on end of the animation
                                      ...rest
                                    }) {
  const Card = styled(motion.div)`
    margin-bottom: 116px;
    transition-duration: 0.4s;
    transition-timing-function: ease-out;

    ${mediaQueries.phoneLarge} {
      margin-bottom: 70px;
    }

    h2 {
      font-weight: ${weights.bold};
      font-size: 1.296em;
      margin: 1rem 0 0 0;
      line-height: 1.15;

      ${mediaQueries.phoneLarge} {
        width: 80%;
        font-size: 1.5em;
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

  const Description = styled.p`
    transition: 0.3s opacity;
    margin: 1em 0 0 0;
  `;

  const Category = styled.span`
    display: block;
    margin: 1rem 0 0 0;
    font-size: 0.9em;
    opacity: 0.5;
  `;
  return (

    <Card ref={ref} initial={{ y: 0 }} style={{ y, opacity }} {...rest} css={css`padding: 0 1.5em;`}>
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
              media: `(min-width: ${jsBreakpoints.phoneLarge}px)`
            }
          ]}
          alt={frontmatter.title}
          css={css`max-width: 25em;
            max-height: 25em;
            border-radius: 25px 25px 0 0 `}
        />

        <h2>{frontmatter.title}</h2>

        <Description>{`${excerpt}`}</Description>
        <Category>{`${frontmatter.category}`}</Category>
      </Link>
    </Card>
  );
}

PostPreview.propTypes = {
  frontmatter: PropTypes.object.isRequired,
  excerpt: PropTypes.object.isRequired
};
