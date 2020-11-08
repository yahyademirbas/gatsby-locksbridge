import React from 'react';
import { LocalizedLink as Link } from "gatsby-theme-i18n";
import Img from 'gatsby-image';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { ensureTrailingSlash } from '../../util';

import {
  fonts,
  weights,
  mediaQueries,
  jsBreakpoints,
  container,
} from '../../styles';
import { graphql } from "gatsby";

export default function ArtistPreviewSlide( { frontmatter } ) {
  console.log(frontmatter);
  const Card = styled.div`
    opacity: 1 !important;
    padding: 0;

    h3 {
      margin: 15px 20px 20px;
      font-weight: ${weights.bold};
      font-size: 21px;
      line-height: 1.57;

      ${mediaQueries.phoneLarge} {
        margin: 0 0 30px;
        font-size: 48px;
        line-height: 1.375;
        letter-spacing: -0.2px;
      }
    }
    footer {
      margin: 0 20px;
      font-family: ${fonts.sans};
      font-weight: ${weights.light};
      font-size: 15px;
      line-height: 1.7;

      ${mediaQueries.phoneLarge} {
        margin: 0;
        letter-spacing: 0.2px;
      }
    }
  `;
  return (
    <Card>
      <span
        css={[
          container.max,
          css`
            display: block;
            transition: 1s cubic-bezier(0.86, 0, 0.07, 1) padding-left,
              1s cubic-bezier(0.86, 0, 0.07, 1) padding-right;

            ${mediaQueries.phoneLarge} {
              display: flex;
              align-items: center;
            }

            ${mediaQueries.desktop} {
              padding: 0;
              margin-left: calc(50% - 610px);
              transition: 1s cubic-bezier(0.86, 0, 0.07, 1) margin-left;
            }

            .slick-current + .slick-slide & {
              // Making the next slide peek in from the right.
              padding-left: 0;
              padding-right: 40px;

              ${mediaQueries.desktop} {
                margin-left: 0;
                padding: 0;
              }
            }
          `,
        ]}
      >
          {frontmatter && (
          <div
            css={css`
              flex: 0 0 38%;

              .gatsby-image-wrapper > div {
                // Forcing correct image aspect ratio, overriding inline
                // gatsby-image provided styles
                padding-bottom: 77% !important;

                ${mediaQueries.phoneLarge} {
                  padding-bottom: 88.9% !important;
                }
              }
            `}
          >
              <Img
                fluid={[
                  frontmatter.hero
                    .imageMobile.fluid,
                  {
                    ...frontmatter.hero
                      .imageDesktop.fluid,
                    media: `(min-width: ${jsBreakpoints.phoneLarge}px)`,
                  },
                ]}
                alt={frontmatter.title}
              />
          </div>
          )}
        <div
          css={css`
            flex: 0 0 43%;

            ${mediaQueries.phoneLarge} {
              margin-left: 9.3%;
            }
          `}
        >
          <Link to={ensureTrailingSlash(frontmatter.slug)}>
            <h3>{frontmatter.title}</h3>
            <footer>
              {`${frontmatter.area} - ${frontmatter.class}`}
            </footer>
          </Link>
        </div>
      </span>
    </Card>
  );
};

ArtistPreviewSlide.propTypes = {
  frontmatter: PropTypes.object.isRequired,
};

export const query = graphql`
    fragment AllArtistImages on MdxFrontmatter {
        hero {
            imageMobile: childImageSharp {
                fluid(maxHeight: 530, maxWidth: 400) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
            imageDesktop: childImageSharp {
                fluid(maxHeight: 530, maxWidth: 400) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
            image: childImageSharp {
                fluid(maxHeight: 530, maxWidth: 400) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`

