import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { css } from '@emotion/core';

import { jsBreakpoints, mediaQueries } from "../../styles";
import FullWidthSection from '../../components/FullWidthSection';

export default function ArtistImageSlider({ data }) {
  const settings = {
    arrows: false,
    autoplay: false,
    lazyLoad: true,
    cssEase: 'cubic-bezier(0.86, 0, 0.07, 1)',
    infinite: true,
    speed: 1000,
    slidesToShow: 1.7,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 2.25,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.2,
        },
      },
    ],
  };
  return (
    <FullWidthSection
      height='0'
      backgroundColor='#f5f5f5'
      css={css`
        padding-top: 25px;
        padding-bottom: 60px;
        padding-left: 0;
        padding-right: 0;

        ${mediaQueries.phoneLarge} {
          padding-bottom: 115px;
          padding-top: 90px;
        }
      `}
    >
      <Slider
        {...settings}
        css={css`
          max-width: 100%;
          max-height: 100%;
          margin-bottom: 65px;
          overflow: hidden;

          .slick-list {
            overflow: hidden;
            ${mediaQueries.desktop} {
              padding: 0 90px;
              overflow: hidden;
            }
          }

          .slick-list .slick-slide {
            padding-right: 15px;
          }
        `}
      >

      </Slider>
    </FullWidthSection>
  );
}

ArtistImageSlider.propTypes = {
  data: PropTypes.object.isRequired,
};


