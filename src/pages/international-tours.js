import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';
import { css } from '@emotion/core';
import Img from 'gatsby-image';

import {
  fonts,
  mediaQueries,
  colors,
  container,
  weights
} from "../styles";
import Layout from '../components/layout';
import FullWidthSection from '../components/FullWidthSection';
import { useHasBeenVisible } from '../hooks/useVisibility';
import CTA from '../components/CTA';
import { useIntl } from "react-intl";

const Capability = ({ imageSrc, imageAlt, content, index, id, bgColor }) => {
  const nodeRef = useRef();
  const isVisible = useHasBeenVisible(nodeRef);

  return (
    <FullWidthSection
      backgroundColor={bgColor}
      ref={nodeRef}
      height='0'
      padding='0'
      textAlign='left'
      css={css`
        &:first-of-type {
          margin-top: 20px;

          ${mediaQueries.phoneLarge} {
            margin-top: 175px;
          }
        }
      `}
    >
      <div id={id} css={container.medium}>
        <div
          css={css`
            margin-bottom: 90px;

            ${mediaQueries.phoneLarge} {
              display: flex;
              justify-content: space-between;
              flex-direction: ${index % 2 ? 'row-reverse' : 'row'};
              align-items: center;
              margin-bottom: 170px;
            }

            h2 {
              font-size: 33px;
              font-weight: ${weights.bold};
            }

            p {
              font-weight: ${weights.light};
            }

            ul {
              margin: 0;

              li {
                font-family: ${fonts.sans};
                font-weight: ${weights.bold};
                font-variant-caps: all-small-caps;
                letter-spacing: 1px;
                list-style: none;
              }
            }
          `}
        >
          <Spring
            delay={0}
            to={{
              transform: isVisible ? 'translateY(0)' : 'translateY(200px)',
              opacity: isVisible ? '1' : '0',
            }}
          >
            {({ transform, opacity }) => (
              <Img
                fluid={imageSrc}
                alt={imageAlt}
                style={{ transform, opacity }}
                css={css`
                  width: 100%;
                  margin-bottom: 20px;

                  > div {
                    padding-bottom: 100% !important;
                  }

                  ${mediaQueries.phoneLarge} {
                    flex: 0 0 ${index % 2 ? '64%' : '49%'};
                    width: ${index % 2 ? '64%' : '49%'};
                    margin-bottom: 0;

                    > div {
                      padding-bottom: ${index % 2 ? '76% !important' : '100%'};
                      padding-bottom: ${index % 4 === 2
                  ? '131% !important'
                  : '100%'};
                    }
                  }
                `}
              />
            )}
          </Spring>

          <div
            css={css`
              position: relative;

              ${mediaQueries.phoneLarge} {
                flex: 0 0 ${index % 2 ? '30%' : '40%'};
                width: ${index % 2 ? '30%' : '40%'};
              }
            `}
          >
            {content}
          </div>
        </div>
      </div>
    </FullWidthSection>
  );
};

Capability.propTypes = {
  imageSrc: PropTypes.object.isRequired,
  imageAlt: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

const Tours = ({ data }) => {
  const intl = useIntl();
  return (
    <Layout
      headerData={{
        title: intl.formatMessage({ id: "toursHeader" }),
        mobileMinHeight: '93vh',
        height: '400px',
      }}
    >
      <Capability
        bgColor={colors.lbWhite}
        id='internationaltours'
        imageSrc={data.technologyImageDesktop.childImageSharp.fluid}
        imageAlt='Laptop on desk with drink'
        content={
          <>
            <h2>{intl.formatMessage({ id: "toursHeader" })}</h2>
            <p>
              {intl.formatMessage({ id: "toursCont" })}
            </p>
          </>
        }
        index={0}
      />
      <CTA />
    </Layout>
  );
};

export const query = graphql`
    query ToursQuery {
        technologyImageDesktop: file(relativePath: { eq: "technology.png" }) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        strategyImageDesktop: file(relativePath: { eq: "strategy.png" }) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        creativeImageDesktop: file(relativePath: { eq: "creative.png" }) {
            childImageSharp {
                fluid {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;

export default Tours;

Tours.propTypes = {
  data: PropTypes.object.isRequired,
};
