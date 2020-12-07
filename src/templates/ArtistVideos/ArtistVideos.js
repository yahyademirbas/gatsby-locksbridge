import React, { useRef } from 'react';
import { Spring } from 'react-spring/renderprops';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

import { useHasBeenPartlyVisible } from '../../hooks/useVisibility';
import { fonts, weights, mediaQueries } from '../../styles';
import ReactPlayer from 'react-player';

export default function ArtistVideos({ url }) {
  const nodeRef = useRef();
  const isVisible = useHasBeenPartlyVisible(nodeRef, 0.4);

  const refMovie = useRef();

  const videoPlayer = css`
    overflow: hidden;
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

  const Card = styled.div`
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

  return (
    <Spring
      delay={0}
      to={{
        transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
        opacity: isVisible ? '1' : '0',
      }}
    >
      {({ transform, opacity }) => (
        <Card ref={nodeRef} style={{ transform, opacity }}>
          <ReactPlayer
            css={videoPlayer}
            url={url}
            playing={false}
            volume={0}
            controls={false}
            ref={refMovie}
            progressInterval={3000}
            stopOnUnmount={false}
            width='50vw'
            height='50vh'
            config={{
              youtube: {
                playerVars: {
                  showinfo: 0,
                  controls: 0,
                  modestbranding: 1,
                  responsive: 1,
                  fs: 0,
                },
              },
            }}
          />
        </Card>
      )}
    </Spring>
  );
}

ArtistVideos.propTypes = {
  url: PropTypes.object.isRequired,
};
