import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Spring } from "react-spring/renderprops";
import { css } from "@emotion/core";
import Img from "gatsby-image";

import {
  fonts,
  mediaQueries,
  container,
  weights,
  jsBreakpoints, smSectionHead, pLight
} from "../../styles";
import FullWidthSection from "../../components/FullWidthSection";
import { useHasBeenVisible } from "../../hooks/useVisibility";

export default function ArtistAlbums({ imageUrl, title, link, date }) {
  const nodeRef = useRef();
  const isVisible = useHasBeenVisible(nodeRef);


  const leadersCss = css`
    padding-top: 20px;

    ${mediaQueries.phoneLarge} {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-left: 40px;
      padding-right: 40px;
    }

    div {
      ${mediaQueries.phoneLarge} {
        flex: 0 0 calc(50% - 86px);
        padding-top: 20px;

        &:nth-child(odd):last-child {
          margin-left: auto;
          margin-right: auto;
        }
      }
    }

    h2 {
      font-size: 21px;
      font-weight: ${weights.bold};
      text-align: center;
      margin-bottom: 6px;
      padding-top: 40px;

      ${mediaQueries.phoneLarge} {
        font-size: 27px;
      }
    }

    p {
      ${pLight};
      margin-bottom: 64px;

      ${mediaQueries.phoneLarge} {
        margin-bottom: 90px;
      }
    }

    .gatsby-image-wrapper > div {
      // Forcing correct image aspect ratio, overriding inline
      // gatsby-image provided styles
      ${mediaQueries.phoneLarge} {
        padding-bottom: 68% !important;
      }
    }
  `;
  return (
    <FullWidthSection
      ref={nodeRef}
      height='0'
      padding='0'
      textAlign='left'
      css={css`
              display: flex;
              justify-content: space-between;
              flex: 0 0 100%;
              align-items: center;
              margin-bottom: 30px;
      `}
    >
      <Spring
        delay={0}
        to={{
          transform: isVisible ? "translateY(0)" : "translateY(200px)",
          opacity: isVisible ? "1" : "0"
        }}
      >
        {({ transform, opacity }) => (
          <div css={[leadersCss, container.medium]} style={{ transform, opacity }}>
          <div>
          <Img
          alt={title}
          fluid={[
          imageUrl.imageMobile.fluid,
        {
          ...imageUrl.imageDesktop.fluid,
          media: `(min-width: ${jsBreakpoints.phoneLarge}px)`,
        },
          ]}
          />
          <h2>{title}</h2>
          <p>
            {date}
          <br />
            <a href={link} rel="noopener noreferrer" target="_blank">Listen</a>
          </p>
          </div>
          </div>
          )}
      </Spring>


    </FullWidthSection>
  );
}

ArtistAlbums.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  index: PropTypes.number,
  link: PropTypes.string
};
