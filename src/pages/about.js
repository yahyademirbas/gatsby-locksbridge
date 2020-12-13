import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Layout from "../components/layout";
import FullWidthSection from "../components/FullWidthSection";
import SplitSection from "../components/SplitSection";
import WhatWeDo from "../components/WhatWeDo";

import {
  colors,
  fonts,
  weights,
  smSectionHead,
  h1L,
  container,
  mediaQueries,
  jsBreakpoints,
  contValues,
  pLight
} from "../styles";
import {useIntl} from "react-intl";

const About = ({ data }) => {
  const intl = useIntl();

  const leadersCss = css`
    padding-top: 20px;

    ${mediaQueries.phoneLarge} {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-left: 40px;
      padding-right: 40px;
    }

    div {
      ${mediaQueries.phoneLarge} {
        flex: 0 0 calc(50% - 86px);
        padding-top: 20px;

        &:nth-child(odd):last-child {
          margin-left: auto;
          margin-right: auto;
        }
      }
    }

    h2 {
      font-size: 21px;
      font-weight: ${weights.bold};
      text-align: center;
      margin-bottom: 6px;
      padding-top: 40px;

      ${mediaQueries.phoneLarge} {
        font-size: 27px;
      }
    }

    p {
      ${pLight};
      margin-bottom: 64px;
      ${mediaQueries.phoneLarge} {
        margin-bottom: 90px;
      }
    }

    .gatsby-image-wrapper > div {
      // Forcing correct image aspect ratio, overriding inline
      // gatsby-image provided styles
      ${mediaQueries.phoneLarge} {
        padding-bottom: 68% !important;
      }
    }
  `;

  const LocationF = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    width: 50%;
    h2,
    h3,
    p {
      transition: opacity 0.3s ease;
      opacity: 0.7;
    }
    &:hover {
      h2,
      h3,
      p {
        opacity: 1;
      }
    }
    h2 {
      ${h1L};
      padding-top: 10px;
      margin-bottom: 8px;
      ${mediaQueries.phoneLarge} {
        text-align: center;
      }
    }
    h3 {
      color: ${colors.reallydarkgray};
      font-family: ${fonts.sans};
      font-size: 21px;
      font-weight: ${weights.bold};
      letter-spacing: -0.5px;
      padding-top: 20px;
      margin-bottom: 12px;
      ${mediaQueries.phoneLarge} {
        text-align: center;
      }
    }
    & > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      ${mediaQueries.phoneLarge} {
        align-items: center;
      }
      p {
        ${pLight};
        padding: 0;
        margin: 0 0 1px 0;
      }
    }
    .gatsby-image-wrapper > div {
      // Forcing correct image aspect ratio, overriding inline
      // gatsby-image provided styles
      padding-bottom: 100% !important;

      ${mediaQueries.phoneLarge} {
        padding-bottom: 63.2% !important;
      }
    }
  `;

  const LocationS = styled.section`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
    h2,
    h3,
    p {
      transition: opacity 0.3s ease;
      opacity: 0.7;
    }
    &:hover {
      h2,
      h3,
      p {
        opacity: 1;
      }
    }
    h2 {
      ${h1L};
      padding-top: 10px;
      margin-bottom: 8px;
      ${mediaQueries.phoneLarge} {
        text-align: center;
      }
    }
    h3 {
      color: ${colors.reallydarkgray};
      font-family: ${fonts.sans};
      font-size: 21px;
      font-weight: ${weights.bold};
      letter-spacing: -0.5px;
      padding-top: 20px;
      margin-bottom: 12px;
      ${mediaQueries.phoneLarge} {
        text-align: center;
      }
    }
    & > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      ${mediaQueries.phoneLarge} {
        align-items: center;
      }
      p {
        ${pLight};
        padding: 0;
        margin: 0 0 1px 0;
      }
    }
    .gatsby-image-wrapper > div {
      // Forcing correct image aspect ratio, overriding inline
      // gatsby-image provided styles
      padding-bottom: 100% !important;

      ${mediaQueries.phoneLarge} {
        padding-bottom: 63.2% !important;
      }
    }
  `;
  const images = data.allFile.nodes;

  // returns the correct image source needed to render
  const getSrc = (name, media) => {
    if (media === "leader") {
      return [
        images.find(images => images.name === name).mobileImage.fluid,
        {
          ...images.find(images => images.name === name).desktopImage.fluid,
          media: `(min-width: ${jsBreakpoints.phoneLarge}px)`
        }
      ];
    }
    if (media === "location") {
      return [
        images.find(images => images.name === name).mobileImage.fluid,
        {
          ...images.find(images => images.name === name).desktopImage.fluid,
          media: `(min-width: ${jsBreakpoints.phoneLarge}px)`
        }
      ];
    }
    return images.find(images => images.name === name).childImageSharp.fluid;
  };

  return (
    <Layout
      headerData={{
        title: intl.formatMessage({ id: "navwho" }),
        mobileMinHeight: "93vh",
        height: "60vh"
      }}
    >
      <FullWidthSection
        height='550px'
        css={css`
          background-color: ${colors.lightblue};
          z-index: 1;
          height: 600px;
          text-align: center;
        `}
      >
        <h3 css={smSectionHead}>{intl.formatMessage({ id: "navartists" })}</h3>
        <h2 css={[h1L, container.medium]}>
          {intl.formatMessage({ id: "Motto" })}
        </h2>
        <p
          css={[
            pLight,
            css`
              padding-top: 10px;

              ${mediaQueries.phoneLarge} {
                width: ${contValues.min};
              }
            `
          ]}
        >
          {intl.formatMessage({ id: "OurDifference" })}
        </p>
      </FullWidthSection>

      <WhatWeDo />

      <FullWidthSection
        css={css`
          padding: 44px 0 0;

          ${mediaQueries.desktop} {
            padding: 120px 0;
          }
        `}
      >
        <h3 css={smSectionHead}>{intl.formatMessage({ id: "navteam" })}</h3>

        <div css={[leadersCss, container.medium]}>
          <div>
            <Img
              alt='Duygu Esenkar'
              fluid={getSrc("duygu-esenkar", "leader")}
            />
            <h2>Duygu Esenkar</h2>
            <p>{intl.formatMessage({ id: "projects" })}</p>
          </div>
          <div>
            <Img alt='Onur Tahmaz' fluid={getSrc("onur-tahmaz", "leader")} />
            <h2>Onur Tahmaz</h2>
            <p>{intl.formatMessage({ id: "artistic" })}</p>
          </div>
          <div>
            <Img
              alt='Kerim Sipahiler'
              fluid={getSrc("kerim-sipahiler", "leader")}
            />
            <h2>Kerim Sipahiler</h2>
            <p>{intl.formatMessage({ id: "investing" })}</p>
          </div>
          <div>
            <Img alt='Yunus Mercan' fluid={getSrc("yunus-mercan", "leader")} />
            <h2>Yunus Mercan</h2>
            <p>{intl.formatMessage({ id: "marketing" })}</p>
          </div>
          <div>
            <Img
              alt='Baran Sakallioglu'
              fluid={getSrc("baran-sakallioglu", "leader")}
            />
            <h2>Baran Sakallıoğlu</h2>
            <p>{intl.formatMessage({ id: "webdev" })}</p>
          </div>
          <div>
            <Img
              alt='Zekeriya Türkmen'
              fluid={getSrc("zekeriya-turkmen", "leader")}
            />
            <h2>Zekeriya Türkmen</h2>
            <p>{intl.formatMessage({ id: "france" })}</p>
          </div>
          <div>
            <Img
              alt='Babürşah Tugrul'
              fluid={getSrc("babursah-tugrul", "leader")}
            />
            <h2>Babürşah Tugrul</h2>
            <p>{intl.formatMessage({ id: "photography" })}</p>
          </div>
          <div>
            <Img
              alt='Mark Stickney'
              fluid={getSrc("mark-stickney", "leader")}
            />
            <h2>Mark Stickney</h2>
            <p>{intl.formatMessage({ id: "usa" })}</p>
          </div>
          <div>
            <Img
              alt='Yahya Demirbaş'
              fluid={getSrc("yahya-demirbas", "leader")}
            />
            <h2>Yahya Demirbaş</h2>
            <p>{intl.formatMessage({ id: "management" })}</p>
          </div>
        </div>
      </FullWidthSection>

      <FullWidthSection
        backgroundColor={colors.lightblue}
        css={css`
          padding: 44px 0 0;

          ${mediaQueries.desktop} {
            padding: 70px 0;
          }
        `}
      >
        <h3 css={smSectionHead}>{intl.formatMessage({ id: "navplace" })}</h3>
        <LocationF>
          <h2 css={h1L}>{intl.formatMessage({ id: "navtr" })}</h2>
          <Img fluid={getSrc("emond", "location")} alt='Istanbul' />
          <h3>{intl.formatMessage({ id: "navist" })}</h3>
          <div>
            <p>Maslak Mah. Maslak Meydan Sk.</p>
            <p>Veko Giz Plaza No: 3/79</p>
            <p>Sarıyer / İstanbul 34398</p>
          </div>
        </LocationF>
        <SplitSection css={container.large} gridColumnGap='20px' gridTemplateColumns="repeat(3, 1fr)">
          <LocationS>
            <h2 css={h1L}>{intl.formatMessage({ id: "navus" })}</h2>
            <Img fluid={getSrc("emond", "location")} alt='Rhode Island' />
            <h3>Rhode Island</h3>
          </LocationS>
          <LocationS>
            <h2 css={h1L}>{intl.formatMessage({ id: "navfr" })}</h2>
            <Img fluid={getSrc("emond", "location")} alt='Paris' />
            <h3>Paris</h3>
          </LocationS>
          <LocationS>
            <h2 css={h1L}>{intl.formatMessage({ id: "navit" })}</h2>
            <Img fluid={getSrc("emond", "location")} alt={intl.formatMessage({ id: "navFlr" })} />
            <h3>{intl.formatMessage({ id: "navFlr" })}</h3>
          </LocationS>
        </SplitSection>
      </FullWidthSection>
      <FullWidthSection
        minHeight='500px'
        height='400px'
        backgroundColor={colors.yellow}
        padding='0 0 30px'
        css={css`
          z-index: 1;
        `}
      >
        <h3 css={smSectionHead}>{intl.formatMessage({ id: "workwithuscta" })}</h3>
        <h2
          css={css`
            color: ${colors.reallydarkgray};
            font-size: 39px;
            font-weight: ${weights.bold};
            letter-spacing: -0.45px;
            line-height: 1.23;
            text-align: center;
            margin-bottom: 30px;

            ${mediaQueries.phoneLarge} {
              font-size: 48px;
              letter-spacing: -0.2px;
            }
          `}
        >
          {intl.formatMessage({ id: "workwithus" })}
        </h2>
      </FullWidthSection>
    </Layout>
  );
};

About.propTypes = {
  data: PropTypes.object.isRequired
};

export default About;

export const query = graphql`
    fragment TeamImages on File {
        name
        childImageSharp {
            fluid(maxWidth: 490, maxHeight: 240) {
                ...GatsbyImageSharpFluid_withWebp
            }
        }
        mobileImage: childImageSharp {
            fluid(cropFocus: NORTH, maxHeight: 335, maxWidth: 335) {
                ...GatsbyImageSharpFluid_withWebp
            }
        }
        desktopImage: childImageSharp {
            fluid(maxWidth: 530, srcSetBreakpoints: [480, 900, 1200]) {
                ...GatsbyImageSharpFluid_withWebp
            }
        }
        leaderDesktop: childImageSharp {
            fluid {
                ...GatsbyImageSharpFluid_withWebp
            }
        }
    }
    query {
        allFile(filter: { relativeDirectory: { eq: "team" } }) {
            nodes {
                ...TeamImages
            }
        }
    }
`;
