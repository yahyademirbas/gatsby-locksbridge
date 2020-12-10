import React from "react";
import Slider from "react-slick";
import { css } from "@emotion/core";
import FullWidthSection from "../../components/FullWidthSection";

function IndexSlider({ fontColor }) {
  const settings = {
    className: "center",
    arrows: false,
    vertical: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    centerPadding: "42px",
    slidesToShow: 1,
    speed: 900

  };

  const ContainerCSS = css`
    margin: 0;
    padding: 40px;
    width: 80%;
    color: ${fontColor} !important;

    .variable-width .slick-slide h3 {
      height: 100px;
      color: ${fontColor};
      margin: 5px;
      line-height: 100px;
      text-align: center;
    }

    .center .slick-center {
      text-align: center;
      color: ${fontColor};
      opacity: 1;
      transform: scale(1.08);
    }

    .center {
      opacity: 0.8;
      transition: all 300ms ease;
    }

    .content {
      padding: 20px;
      margin: auto;
      width: 90%;
    }

    .slick-slider {
      text-align: center;
      margin: 30px auto 50px;
    }

    .slick-thumb {
      bottom: -45px;
    }

    @media (max-width: 768px) {
      .center {
        margin-left: -40px;
        margin-right: -40px;
      }

      .center .slick-center {
        text-align: center;
        color: ${fontColor};
        opacity: 1;
        transform: scale(1);
      }

      .center {
        opacity: 0.8;
        transform: scale(0.95);
        transition: all 300ms ease;
      }
    }
  `;

  return (
    <FullWidthSection css={ContainerCSS}>
      <Slider {...settings} >
        <div>
          <h3>LocksBridge is Turkey's first and leading international classical artist management company! </h3>
        </div>
        <div>
          <h3>Above all, we are a curious team of young entrepreneurs simlpy thriving on the pleasure of creating the original.</h3>
        </div>
        <div>
          <h3>yazı3</h3>
        </div>
        <div>
          <h3>yazı4</h3>
        </div>
        <div>
          <h3>yazı5</h3>
        </div>
      </Slider>
    </FullWidthSection>
  );
}

export default IndexSlider;