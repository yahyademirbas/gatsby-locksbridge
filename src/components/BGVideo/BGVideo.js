/* eslint-disable prefer-template */
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import ReactPlayer from "react-player";

import useWindow from "../../hooks/useWindow";
import { mediaQueries, jsBreakpoints, colors } from "../../styles";
import FullWidthSection from "../FullWidthSection";

const BGVideo = ({ url, startTime, endTime, height, minHeight }) => {
  const refMovie = useRef();

  const sectionStyles = css`
    display: block;
    position: absolute;
    padding: 0;
    background-color: ${colors.black};

    ${mediaQueries.phoneLarge} {
      display: block;
    }

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      min-width: 100%;
      z-index: -1;
      min-height: ${props => props.minHeight || "300px"};
      ${mediaQueries.phoneLarge} {
        min-height: ${props => props.height || "700px"};
      }
      
    }
  `;

  const videoPlayer = css`
    overflow: hidden;
    padding-top: 56.25%;
    > div {
      position: absolute;
      top: 0;
    }

    ${mediaQueries.phoneLarge} {
      padding-top: 56.25%;

      > div > div {
        padding-top: 56.25% !important;
      }
    }
  `;

  return (
    <FullWidthSection height={height} minHeight={minHeight} css={sectionStyles}>
      <ReactPlayer
        css={videoPlayer}
        url={url}
        playing={false}
        volume={0}
        autoplay={true}
        loop={true}
        controls={false}
        ref={refMovie}
        height={height}
        config={{
          youtube: {
            preload: false,
            playerVars: {
              showinfo: 0,
              controls: 0,
              modestbranding: 1,
              responsive: 1,
              fs: 0
            }
          }
        }}
      />
    </FullWidthSection>
  );
};

BGVideo.propTypes = {
  url: PropTypes.string.isRequired
};

export default BGVideo;
