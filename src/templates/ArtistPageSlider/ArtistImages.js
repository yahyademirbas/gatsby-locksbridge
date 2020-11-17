import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { container, mediaQueries } from "../../styles";
import { css } from "@emotion/core";
import FullWidthSection from "../../components/FullWidthSection";


export default function ArtistImages({ data }) {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <FullWidthSection padding='0'>
      <div
        css={[
          container.max
        ]}
      >
        <Slider {...settings}>
          {data.allImageSharp.edges.map(({ node }) => (
            <Img fixed={node.fixed} key={node.id} alt="Gatsby Docs are awesome"/>
          ))}
        </Slider>
      </div>
    </FullWidthSection>
  );
};

ArtistImages.propTypes = {
  data: PropTypes.string
};