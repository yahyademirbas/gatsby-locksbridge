import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { colors, container, jsBreakpoints, mediaQueries } from '../../styles';
import FullWidthSection from '../../components/FullWidthSection';
import Slider from 'react-slick';

export default function ArtistImages({ data }) {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <FullWidthSection padding='0'>
      <div css={[container.max]}>
        <Slider {...settings}>
          {data.allImageSharp.edges.map(({ node }) => (
            <Img
              fixed={[
                node.imageMobile,
                {
                  ...node.imageDesktop,
                  media: `(min-width: ${jsBreakpoints.phoneLarge}px)`,
                },
              ]}
            />
          ))}
        </Slider>
      </div>
    </FullWidthSection>
  );
}

ArtistImages.propTypes = {
  data: PropTypes.string,
};
