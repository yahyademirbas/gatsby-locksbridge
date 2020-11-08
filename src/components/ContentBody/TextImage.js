/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { css } from '@emotion/core';

import {
  weights,
  container,
  mediaQueries,
  contentH2,
  contentHeadings,
  dropCap,
} from '../../styles';
import SplitSection from '../SplitSection';

const TextImage = ({ data, text }) => {
  const sectionStyle = css`
    ${container.min};
    font-weight: ${weights.thin};
    grid-column-gap: 20px;
    padding: 0 20px;

    ${mediaQueries.phoneLarge} {
      padding: 0;
    }
    
    a {
      text-decoration: underline;
    }

    h2 {
      ${contentH2}
    }

    h3 {
      ${contentHeadings}
    }
    p {
      ${dropCap}
    }
  `;

  return (
    <SplitSection css={sectionStyle} gridTemplateColumns='45% 49%'>
      <section>
        <Img
          fluid={data.hero.childImageSharp.fluid}
          alt={data.title}
          css={css`
            margin-bottom: 40px;
            padding: 0;
          `}
        />
      </section>
      <section
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </SplitSection>
  );
};

TextImage.propTypes = {
  data: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
};

export default TextImage;
