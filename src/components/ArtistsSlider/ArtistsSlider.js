import React from 'react';
import { navigate } from 'gatsby';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';

import { colors, mediaQueries, smSectionHead } from '../../styles';
import ArtistPreviewSlide from '../ArtistPreviewSlide';
import FullWidthSection from '../FullWidthSection';
import Button from '../Button';

export default function ArtistsSlider({ showButton, backgroundColor, title, data }) {
  console.log(data);
  const settings = {
    arrows: false,
    autoplay: false,
    autoplaySpeed: 7500,
    cssEase: 'cubic-bezier(0.86, 0, 0.07, 1)',
    centerPadding: 90,
    infinite: true,
    speed: 1000,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1220,
        settings: {
          centerPadding: 10,
        },
      },
    ],
  };
  return (
    <FullWidthSection
      height='100vh'
      css={css`
        padding-top: 25px;
        padding-bottom: 60px;
        padding-left: 0;
        padding-right: 0;
        background-color: ${backgroundColor};

        ${mediaQueries.phoneLarge} {
          padding-bottom: 115px;
          padding-top: 90px;
        }
      `}
    >
      <h2 css={smSectionHead}>{title}</h2>
      <Slider
        {...settings}
        css={css`
          max-width: 100%;
          max-height: 100%;
          margin-bottom: 65px;

          .slick-list {
            ${mediaQueries.desktop} {
              padding: 0 90px;
            }
          }
        `}
      >
        {data.allFile.edges.map(({ node }) => (
          <ArtistPreviewSlide key={node.childMdx.frontmatter.title} frontmatter={node.childMdx.frontmatter} />
          ))}
      </Slider>
      {showButton && (
        <Button onClick={() => navigate(`/lb-artists/`)}>Our Artists</Button>
      )}
    </FullWidthSection>
  );
};

ArtistsSlider.propTypes = {
  showButton: PropTypes.bool,
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
  data: PropTypes.object.isRequired,
};

ArtistsSlider.defaultProps = {
  showButton: true,
  backgroundColor: colors.white,
  title: `LB Artists`,
};

export const query = graphql`
    fragment AllArtistFrontMatters on MdxFrontmatter {
        area
        class
        excerpt
        title
        slug
    }
`
