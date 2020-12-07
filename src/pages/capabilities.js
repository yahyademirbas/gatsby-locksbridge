import React, { useRef } from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';
import { css } from '@emotion/core';
import Img from 'gatsby-image';

import {
  fonts,
  mediaQueries,
  jsBreakpoints,
  container,
  weights, partnersProjects
} from "../styles";
import Layout from '../components/layout';
import FullWidthSection from '../components/FullWidthSection';
import { useHasBeenVisible } from '../hooks/useVisibility';
import CTA from '../components/CTA';
import SplitSection from "../components/SplitSection";
import { list } from "../styles/custom-css";
import EliteSRC from "../../static/images/Partner_Wordmark-Elite_1col.svg";

const Capability = ({ imageSrc, imageAlt, content, index, id }) => {
  const nodeRef = useRef();
  const isVisible = useHasBeenVisible(nodeRef);

  return (
    <FullWidthSection
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

const CapabilitiesPage = ({ data }) => {
  return (
    <Layout
      headerData={{
        title: `All the stuff we’re good at.`,
        mobileMinHeight: '93vh',
        height: '400px',
      }}
    >
      <SplitSection gridColumnGap='16px' css={partnersProjects}>
        <article>
          <h2>Conquer complexity</h2>
          <p>
            BigCommerce is not complex, but your integration may be. We’ve
            pioneered robust integrations for both back and front-end
            experiences.
          </p>
        </article>
        <article>
          <h2>Maximize your budget</h2>
          <p>
            Minimize your build investment and reinvest into initiatives that
            move the needle. (We can help with that too).
          </p>
        </article>
        <article>
          <h2>Global first</h2>
          <p>
            Companies need to think globally to compete. We’ll help you lay the
            foundation from day one.
          </p>
        </article>
        <article>
          <h2>Automate all the things</h2>
          <p>
            Automation is about more than just saving time. We leverage
            automation to create processes that create raving fans and big
            spenders.
          </p>
        </article>
      </SplitSection>

      <FullWidthSection height='400px' align='left' css={list}>
        <h4>Scale your sales potential with BigCommerce</h4>
        <p>
          We work directly with incredible organizations to build complex
          systems and innovative digital experiences; working with mid-market
          and enterprise clients to develop web experiences in Drupal and
          BigCommerce.
        </p>
        <div>
          <ul>
            <li>
              BigCommerce API integration, custom development, and platform
              migration.
            </li>
            <li>
              BigCommerce responsive theme design, user experience, and UI
              design.
            </li>
            <li>
              BigCommerce on-page search engine optimization, website migration,
              analytics tracking, conversion rate option, and structured data
              implementation.
            </li>
          </ul>
        </div>
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <a
            href='https://partners.bigcommerce.com/directory/partner/501032/third-grove'
            title='BigCommerce Elite Partner'
            css={css`
              width: 100%;
              max-width: 200px;
              margin: 30px auto 0 auto;
            `}
          >
            <img src={EliteSRC} alt='BigCommerce Elite Partner' />
          </a>
        </div>
      </FullWidthSection>

      <Capability
        id='technology'
        imageSrc={data.technologyImageDesktop.childImageSharp.fluid}
        imageAlt='Laptop on desk with drink'
        content={
          <>
            <h2>Technology</h2>
            <p>
              Work with the best engineers in the room—no matter what room
              you’re in. Our engineers are writing and discovering the future of
              digital excellence.
            </p>
            <ul>
              <li>Front-End Development</li>
              <li>Back-End Development</li>
              <li>Content Management</li>
              <li>
                <Link to='/partners/drupal/'>Drupal</Link>
              </li>
              <li>
                <Link to='/partners/acquia/'>Acquia</Link>
              </li>
              <li>
                <Link to='/partners/shopify/'>Shopify</Link>
              </li>
              <li>
                <Link to='/partners/gatsby/'>Gatsby</Link>
              </li>
            </ul>
          </>
        }
        index={0}
      />
      <Capability
        id='strategy'
        imageSrc={data.strategyImageDesktop.childImageSharp.fluid}
        imageAlt='Two office workers looking at a chart on a laptop'
        content={
          <>
            <h2>Strategy</h2>
            <p>
              The foundation for great work. Know your customer, your goals, and
              how to reach them.
            </p>
            <ul>
              <li>Digital Strategy</li>
              <li>Trends &amp; Insights</li>
              <li>Customer Research</li>
              <li>Industry Research</li>
              <li>Analytics / Data / SEO</li>
              <li>Omnichannel Strategy</li>
            </ul>
          </>
        }
        index={1}
      />
      <Capability
        id='creative'
        imageSrc={data.creativeImageDesktop.childImageSharp.fluid}
        imageAlt='Man drawing logos in a notebook'
        content={
          <>
            <h2>Creative</h2>
            <p>
              Where data, culture, and good looks come together. Create the
              strongest connection to the brand experience, and look good doing
              it.
            </p>
            <ul>
              <li>Campaign Creation</li>
              <li>Art Direction</li>
              <li>UI/UX Design</li>
              <li>Social Content</li>
              <li>Content Development</li>
              <li>Interaction / Motion</li>
            </ul>
          </>
        }
        index={2}
      />
      <CTA />
    </Layout>
  );
};

export const query = graphql`
  query CapabilitiesQuery {
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

export default CapabilitiesPage;

CapabilitiesPage.propTypes = {
  data: PropTypes.object.isRequired,
};
