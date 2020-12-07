import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colors } from '../../styles';

import BackgroundImage from 'gatsby-background-image';

function BGImageSlider({ className }) {
  const styledButtonLeft = css`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 3%;
    background-color: transparent;
    color: #f5f5f5;
    border: none;
  `;

  const styledButtonRight = css`
    position: absolute;
    z-index: 2;
    top: 50%;
    right: 3%;
    background-color: transparent;
    color: #f5f5f5;
    border: none;
  `;

  const { allFile } = useStaticQuery(
    graphql`
      query {
        allFile(
          sort: { fields: name, order: DESC }
          filter: { relativeDirectory: { eq: "artists" } }
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    `
  );

  const [index, setIndex] = useState(0);
  //Minus 1 for array offset from 0

  const length = allFile.edges.length - 1;

  const handleNext = () =>
    index === length ? setIndex(0) : setIndex(index + 1);

  const handlePrevious = () =>
    index === 0 ? setIndex(length) : setIndex(index - 1);

  const { node } = allFile.edges[index];

  // Watch out for CSS's stacking order, especially when styling the individual
  // positions! The lowermost image comes last!
  return (
    <BackgroundImage
      Tag={`html`}
      id={`test`}
      className={className}
      fluid={node.childImageSharp.fluid}
      key={node.id}
      alt={node.name.replace(/-/g, ' ').substring(2)}
      css={css`
        transition: opacity 3s ease-in-out;
        height: 100vh;
        width: 100%;
        position: absolute;
        top: 0;
      `}
    >
      <button onClick={() => handlePrevious()} css={styledButtonLeft}>
        Previous
      </button>
      <button onClick={() => handleNext()} css={styledButtonRight}>
        Next
      </button>
    </BackgroundImage>
  );
}

const StyledBGImageSlider = styled(BGImageSlider)`
  width: 100vw;
  min-height: 100vh;
  background-size: cover;
  background-color: ${colors.tagGray};
  background-position: center;
  position: absolute !important;
  z-index: 1;
`;

export default StyledBGImageSlider;
