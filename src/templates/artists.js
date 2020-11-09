import React, { useRef } from "react";
import PropTypes from "prop-types";
import { graphql, navigate } from "gatsby";
import { colors } from "../styles";
import { useHasBeenVisible } from "../hooks/useVisibility";

import Layout from "../components/layout";
import { PopUp } from "../components/PopUp";
import FullWidthSection from "../components/FullWidthSection";
import SplitSection from "../components/SplitSection";
import { TextWrapper } from "../components/Prefooter";

import Button from "../components/Button";
import ArtistsSlider from "../components/ArtistsSlider";
import ArtistPageSlider from "./ArtistPageSlider";
import heroImage from "../images/main03.jpg";
import heroImageMobile from "../images/main03.jpg";

import { useIntl } from "react-intl";
import { Link } from "react-scroll";


export default function ArtistsTemplate({ data }) {
  const intl = useIntl();
  const halfPage = useRef();
  const preload = useRef();
  const hasScrolled = useHasBeenVisible(halfPage);
  const isScrolling = useHasBeenVisible(preload);

  const artist = data.file;
/*
  const pageLayout = css`
  
        ${mediaQueries.phoneLarge} {
          margin-bottom: 90px;
        }
        
        .stats-container,
        .stat-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .stats-container {
          flex-direction: column;
        }

        .stat-container {
          flex: auto;
          flex-direction: column;
          margin-bottom: 24px;

          :last-of-type {
            margin-bottom: 0;
          }

          h4 {
            font-size: 48px;
            font-weight: bold;
            letter-spacing: -0.2px;
            line-height: 54px;
            margin-bottom: 0;
          }

          p {
            font-size: 16px;
            font-weight: bold;
            letter-spacing: 0.21px;
            line-height: 27px;
          }
        }

        ${container.min} ${mediaQueries.phoneLarge} {
          .stats-container {
            flex-direction: row;
          }
          .stat-container {
            margin-bottom: 0;
          }
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
      `;
  */
  return (
    <Layout
      headerData={{
        metaTitle: intl.formatMessage({ id: "Motto" }),
        title: (
          <>

            {artist.childMdx.frontmatter.title}
            <br/>
            <Link to="mainPage" smooth duration={1000}>
              down
            </Link>
          </>
        ),
        subTitle: "You won't find a better Drupal agency in Boston.",
        description: "You won't find a better Drupal agency in Boston.",
        mobileMinHeight: "100vh",
        height: "100vh",
        color: colors.darkgray,
        heroImage,
        heroImageMobile
      }}>

      <ArtistPageSlider
        title= {artist.childMdx.frontmatter.title}
        backgroundColor={colors.lightgray}
        data={data}
      />

      {" "}
      {hasScrolled || isScrolling ? (
        <>
          <ArtistsSlider
            data={data}
            showButton={false}
            backgroundColor={colors.gray}
            title='You May Also Like'
          />

          <SplitSection>
            <TextWrapper backgroundColor={colors.yellow}>
              <h3>Catch up over coffee?</h3>
              <Button onClick={() => navigate(`/contact/`)}>Get in Touch</Button>
            </TextWrapper>
            <TextWrapper backgroundColor={colors.lightblue}>
              <h3>Join the best in Boston.</h3>
              <Button onClick={() => navigate(`/careers/`)}>Work at TAG</Button>
            </TextWrapper>
          </SplitSection>

        </>
      ) : (
        <FullWidthSection ref={halfPage} height='2286px' minHeight='3448px' />
      )}
      <PopUp />
    </Layout>
  );
};

ArtistsTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
    fragment AllArtistContent on Mdx {
        body
        id
    }
    query($slug: String!, $locale: String!) {
        file (
            childMdx: {
                fields: { locale: {eq: $locale} }
                frontmatter: { slug: {eq: $slug} }
            }
        ) {
            childMdx {
                ...AllArtistContent
                frontmatter {
                    ...AllArtistFrontMatters
                    ...AllArtistImagesTemplate
                }
            }
        }

        allFile(
            filter: {
                sourceInstanceName: { eq: "artistsPages" }
                childMdx: { fields: { locale: { eq: $locale } } }
            }
        ) {
            edges {
                node {
                    childMdx {
                        ...AllArtistContent
                        frontmatter {
                            ...AllArtistFrontMatters
                            ...AllArtistImagesTemplate
                        }
                    }
                }
            }
        }
    }
`;
