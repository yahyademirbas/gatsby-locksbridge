import React, { useRef } from 'react';
import { Spring } from 'react-spring/renderprops';
import Img from 'gatsby-image';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';

import { useHasBeenPartlyVisible } from '../../hooks/useVisibility';
import { fonts, weights, mediaQueries, jsBreakpoints, colors } from '../../styles';

export default function ArtistPreview({ imageUrl, title, link, subTitle }) {
  const nodeRef = useRef();
  const isVisible = useHasBeenPartlyVisible(nodeRef, 0.4);

  const Card = styled.div`
    width: 100%;
    margin-bottom: 116px;
    transition-duration: 0.4s;
    transition-timing-function: ease-out;
    ${mediaQueries.phoneLarge} {
      margin-bottom: 75px;
    }
  `;

  const TitleNews = styled.h2`
    margin: 32px 0 14px;
    font-weight: ${weights.bold};
    font-size: 27px;
    line-height: 1.44;
    ${mediaQueries.phoneLarge} {
      min-width: 50%;
      width: max-content;
      color: ${colors.lbWhite};
      padding: 4px 10px 4px 10px;
      border-radius: 0 0 10px 10px;
      margin: 32px 0 14px;
      font-size: 33px;
      background-color: ${colors.darkgray};
      line-height: 1.58;
    }
  `;

  const SubTitleNews = styled.h4`
    font-family: ${fonts.sans};
    font-weight: ${weights.light};
    font-size: 15px;
    line-height: 2.4;
    ${mediaQueries.phoneLarge} {
      min-width: 50%;
      width: max-content;
      margin: 0 25px;
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
              css={css`border-radius: 25px 25px 0 0;`}
            />

            <TitleNews>{title}</TitleNews>
            <SubTitleNews>{subTitle}</SubTitleNews>
          </Link>
        </Card>
      )}
    </Spring>
  );
}

ArtistPreview.propTypes = {
  title: PropTypes.object.isRequired,
};
