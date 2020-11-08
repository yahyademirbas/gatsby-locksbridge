import React, { useRef } from 'react';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';
import { css } from '@emotion/core';
import Img from 'gatsby-image';
import {
  colors,
  fonts,
  weights,
  container,
  mediaQueries,
  contValues,
  pLight,
  jsBreakpoints
} from '../styles';

import Layout from '../components/layout';
import FullWidthSection from '../components/FullWidthSection';
import { useHasBeenVisible } from '../hooks/useVisibility';
import CTA from '../components/CTA';
import CTAGrid from '../components/CTAGrid';
import preserver from '../images/drupal-support/preserver.png';

const Capability = ({ imageSrc, imageAlt, content, index, id, data }) => {
  const nodeRef = useRef();
  const isVisible = useHasBeenVisible(nodeRef);
  const Row = styled.section`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    margin-bottom: 12px;
    width: 100%;

    ${mediaQueries.phoneLarge} {
      width: ${contValues.min};
      justify-content: space-around; // for Edge
    }

    div {
      width: 50%;
      margin-bottom: 40px;

      ${mediaQueries.phoneLarge} {
        width: auto;
        padding: 0 36px;
      }

      h2 {
        font-weight: ${weights.medium};
        font-size: 39px;
        color: ${colors.darkgray};
        letter-spacing: -1.38px;
        text-align: center;
        margin-bottom: 12px;

        ${mediaQueries.phoneLarge} {
          margin-bottom: 36px;
          font-size: 48px;
        }
      }
      h3 {
        font-family: ${fonts.sans};
        font-weight: ${weights.light};
        font-size: 15px;
        color: ${colors.darkgray};
        letter-spacing: 0.2px;
        text-align: center;
      }
    }
  `;
  const sectionStylesWithImage = css`
    padding: 50px 20px;
    position: relative;

    ${mediaQueries.phoneLarge} {
      padding: 100px 0 100px 0;
    }

    &:after {
      content: '';
      background-image: url(${preserver});
      position: absolute;
      bottom: 0;
      right: 0;
      width: calc(425px / 2);
      height: calc(500px / 2);
      background-size: contain;
      background-repeat: no-repeat;

      ${mediaQueries.phoneLarge} {
        content: '';
        background-image: url(${preserver});
        position: absolute;
        top: 15%;
        right: 0;
        width: 425px;
        height: 500px;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }

    h2 {
      font-size: 27px;
      line-height: 39px;
      ${mediaQueries.phoneLarge} {
        font-size: 39px;
        font-weight: ${weights.medium};
        line-height: 48px;
        margin-bottom: 24px;
      }
    }

    p {
      font-weight: ${weights.light};
    }

    .basic-block--container {
      display: flex;
      flex-direction: column-reverse;
      ${mediaQueries.phoneLarge} {
        display: block;
      }
    }

    .basic-block--right {
      height: 150px;
      ${mediaQueries.phoneLarge} {
        float: right;
        shape-outside: circle(44% at 47% 68%);
        width: 500px;
        height: 580px;
        margin-top: 0px;
        shape-margin: 2%;
        margin-bottom: 0px;
      }
    }

    .basic-block--left {
      ${container.textOnly}
      padding-left: 0;
      padding-right: 0;

      ${mediaQueries.phoneLarge} {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  `;

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
      <FullWidthSection backgroundColor={colors.lightgreen} textAlign='center' height='750px' minHeight='730px'>
        <h4
          css={[
            pLight,
            css`
              padding: 70px 0;
              ${mediaQueries.phoneLarge} {
                width: ${contValues.min};
              }
            `,
          ]}
        >
          We’re a full service Boston-based agency with the best engingeers in
          the city – any city really. We are the only Drupal development agency
          to employ a Drupal 8 core maintainer and consistently rank in
          the&nbsp;
          <a
            href='https://www.drupal.org/drupal-services'
            rel='noopener noreferrer'
            target='_blank'
          >
            top 10 Drupal agencies in the world
          </a>
          . We’ve helped leading brands in Boston (and around the country)
          maximize their Drupal investment and optimize performance with
          reliable, stress-tested ongoing support.
        </h4>
        <Row>
          <div>
            <h2>177k</h2>
            <h3>Hours on Drupal</h3>
          </div>
          <div>
            <h2>100%</h2>
            <h3>Acquia Certified</h3>
          </div>
          <div>
            <h2>1,400</h2>
            <h3>Contributions</h3>
          </div>
        </Row>
        <Row>
          <div>
            <h2>Drupal 9</h2>
            <h3>We&apos;re Writing It</h3>
          </div>
          <div>
            <h2>Big</h2>
            <h3>On Innovation</h3>
          </div>
        </Row>
      </FullWidthSection>
      <section css={sectionStylesWithImage}>
        <div className='basic-block--container'>
          <div className='basic-block--right' />
          <div className='basic-block--left'>
            <h2>
              A full suite of support options for Drupal 7, 8, and 9, handling
              complex front end, back end, integration, and compliance needs.
            </h2>

            <p>
              Support services include proactive Drupal patching, migrations and
              upgrades to Drupal 8 and 9, content migrations, new features, bug
              fixes, resource augmentation, training, optimization, digital
              strategy, UX/UI improvements, and Google Analytics
              industrialization.
            </p>

            <p>
              Our support packages are fully customizable for each organization,
              and can be changed or cancelled for any reason (or no reason) with
              30thirty days’ notice. We aren’t a cell phone company;, if you
              don’t like us, you shouldn’t have we don’t want you to have to
              work with us.
            </p>

            <p>
              We are experts on the Acquia and Platform, Pantheon platforms, as
              well asnd custom hosting platforms in use by our clients.
            </p>
          </div>
        </div>
      </section>

      <CTAGrid
        items={data.allDrupalSupportCtaGridOneJson.edges}
        images={data.icons.edges}
        link='#contact'
        altStyle={false}
      />
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
      <Capability
        id='technology'
        imageSrc={[
          data.technologyImageMobile.childImageSharp.fluid,
          {
            ...data.technologyImageDesktop.childImageSharp.fluid,
            media: `(min-width: ${jsBreakpoints.phoneLarge}px)`,
          },
        ]}
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
        imageSrc={[
          data.strategyImageMobile.childImageSharp.fluid,
          {
            ...data.strategyImageDesktop.childImageSharp.fluid,
            media: `(min-width: ${jsBreakpoints.phoneLarge}px)`,
          },
        ]}
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
        imageSrc={[
          data.creativeImageMobile.childImageSharp.fluid,
          {
            ...data.creativeImageDesktop.childImageSharp.fluid,
            media: `(min-width: ${jsBreakpoints.phoneLarge}px)`,
          },
        ]}
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
    technologyImageMobile: file(relativePath: { eq: "technology-mobile.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    technologyImageDesktop: file(relativePath: { eq: "technology.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    strategyImageMobile: file(relativePath: { eq: "strategy-mobile.png" }) {
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
    creativeImageMobile: file(relativePath: { eq: "creative-mobile.png" }) {
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
