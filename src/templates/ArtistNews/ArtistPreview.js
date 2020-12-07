import React, { useRef } from 'react';
import { Spring } from 'react-spring/renderprops';
import Img from 'gatsby-image';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import { useHasBeenPartlyVisible } from '../../hooks/useVisibility';
import { fonts, weights, mediaQueries, jsBreakpoints } from '../../styles';

export default function ArtistPreview({ imageUrl, title, link }) {
  const nodeRef = useRef();
  const isVisible = useHasBeenPartlyVisible(nodeRef, 0.4);

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
          <Link
            css={css`
              display: block;
            `}
            to={link}
          >
            <Img
              fluid={[
                imageUrl.imageMobile.fluid,
                {
                  ...imageUrl.imageDesktop.fluid,
                  media: `(min-width: ${jsBreakpoints.phoneLarge}px)`,
                },
              ]}
              alt={title}
            />

            <h2>{title}</h2>
          </Link>
        </Card>
      )}
    </Spring>
  );
}

ArtistPreview.propTypes = {
  title: PropTypes.object.isRequired,
};
