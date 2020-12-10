import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { colors, mediaQueries, smSectionHead } from '../../styles';
import FullWidthSection from '../../components/FullWidthSection';
import ArtistPageSlide from './ArtistPageSlide';
import ArtistPageSlideNav from './ArtistPageSlideNav';

export default function ArtistPageSlider({ backgroundColor, title, data }) {

  const checkIfTrueNews = data.file.childMdx.frontmatter.news[0].title != null;
  const checkIfTrueReviews = data.file.childMdx.frontmatter.reviews[0].title != null;
  const checkIfTrueVideos = data.file.childMdx.frontmatter.videos[0].videoUrl != null;
  const checkIfTrueDiscography = data.file.childMdx.frontmatter.albums[0].title != null;

  const sliderTitlesArray = [
    { title: "About" },
    ...(checkIfTrueNews ? [{ title: "News" }] : []),
    ...(checkIfTrueReviews ? [{ title: "Reviews" }] : []),
    ...(checkIfTrueVideos ? [{ title: "Videos" }] : []),
    ...(checkIfTrueDiscography ? [{ title: "Discography" }] : [])
  ];


  const settingsMain = {
    customPaging(i) {
      return (
        <button type='button'>
          <ArtistPageSlideNav title={sliderTitlesArray[i].title} />
        </button>
      );
    },
    arrows: false,
    autoplay: false,
    infinite: true,
    lazyLoad: false,
    speed: 500,
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    swipeToSlide: true,
    variableWidth: true,
    dots: true,
    focusOnSelect: false,
    dotsClass: 'slick-pager slick-dots',
  };

  const SliderSectionStyles = css`
    padding-bottom: 0;
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
    background-color: ${backgroundColor};
    min-width: 100vw;
    max-height: auto;
    ${mediaQueries.phoneLarge} {
      padding-bottom: 0;
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
      min-width: 100vw;
      max-height: auto;
    }

    .slick-list {
      cursor: default;
      width: 100vw;
    }

    .slick-slider {
      margin-top: 0;
      width: 100vw;
      display: flex;
      flex-direction: column-reverse;

      ${mediaQueries.phoneLarge} {
        margin-top: 0;
        display: flex;
        flex-direction: column-reverse;
        width: 100vw;
      }
    }

    .slick-slider .slick-pager {
      display: flex !important;
      justify-content: space-between;
      flex-direction: row;
      list-style: none;
      max-width: 100%;
      width: calc(80%);
      margin: auto;
      padding: 0;
      margin-bottom: 100px;
      position: relative;

      ${mediaQueries.phoneLarge} {
        max-width: 550px;
        margin-bottom: 100px;
      }
    }

    .slick-slider .slick-pager li.slick-active button {
      border-bottom: 1px solid;
    }

    .slick-dots li {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      ${mediaQueries.phoneLarge} {
        width: 20px;
      }
    }

    .slick-dots li button {
      width: 20px;
      height: 20px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .slick-dots li button:before {
      display: none;
    }

    .slick-dots li.slick-active button:before {
      content: '';
      background-color: ${colors.tagGray};
      transition: all 1s ease;
      width: 12px;
      height: 12px;
    }

    .slick-slider .slick-pager button {
      all: unset;
      cursor: pointer;
    }

    .slick-center h3 {
      color: ${colors.lbColor};
      text-stroke: ${colors.tagGray};
      -webkit-text-stroke: ${colors.tagGray};
      text-stroke-width: 1.3px;
      -webkit-text-stroke-width: 1.3px;
      -webkit-font-smoothing: antialiased;
      transition: color 1s ease;
    }

    .slick-center p,
    .slick-center .slider-button,
    .slick-center .animate-opacity {
      opacity: 1;
      transition: opacity 1s ease;
      transition-delay: 0s;
    }

    .slick-slide:not(.slick-center):hover h3 {
      color: rgba(40, 40, 41, 0.3);
      transition: color 1s ease;
    }
  `;

  return (
    <FullWidthSection css={SliderSectionStyles}>
      <h2 css={smSectionHead}>{title}</h2>

      <Slider {...settingsMain}>
        {sliderTitlesArray.map((node, index) => {
          return (
            <ArtistPageSlide key={index} title={node.title} data={data} />
          );
        })}
      </Slider>
    </FullWidthSection>
  );
}

ArtistPageSlider.propTypes = {
  backgroundColor: PropTypes.string,
  title: PropTypes.string,
};

ArtistPageSlider.defaultProps = {
  backgroundColor: colors.white,
};
