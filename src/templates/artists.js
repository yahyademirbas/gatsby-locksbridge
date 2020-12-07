import React, { useRef } from "react";
import PropTypes from "prop-types";
import { graphql, navigate } from "gatsby";
import {
  colors,
  container,
  jsBreakpoints,
  mediaQueries,
  pLight,
  smSectionHead,
  weights
} from "../styles";
import { useHasBeenVisible } from "../hooks/useVisibility";

import Layout from "../components/layout-artists";
import FullWidthSection from "../components/FullWidthSection";
import SplitSection from "../components/SplitSection";
import { TextWrapper } from "../components/Prefooter";

import Button from "../components/Button";
import ArtistsSlider from "../components/ArtistsSlider";
import ArtistPageSlider from "./ArtistPageSlider";

import { useIntl } from "react-intl";
import Img from "gatsby-image";
import { css } from "@emotion/core";

export default function ArtistsTemplate({ data }) {
  const intl = useIntl();
  const halfPage = useRef();
  const preload = useRef();

  const hasScrolled = useHasBeenVisible(halfPage);
  const isScrolling = useHasBeenVisible(preload);

  const artist = data.file;
  const artistDetails = data.file.childMdx.frontmatter;
  const images = data.ForTeam.nodes;

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
        metaTitle: artistDetails.meta,
        title: artistDetails.title,
        subTitle: artistDetails.subtitle,
        description: artistDetails.description,
        mobileMinHeight: "100vh",
        height: "100vh",
        bgUrl: artistDetails
      }}
    >

      <ArtistPageSlider backgroundColor={colors.lightgray} data={data} />

      {" "}
      {hasScrolled || isScrolling ? (

        <>



          <FullWidthSection
            css={css`
              padding: 44px 0 0;

              ${mediaQueries.desktop} {
                padding: 120px 0;
              }
            `}
            backgroundColor='#f5f5f5'
          >
            <h3 css={smSectionHead}>CONTACT PERSONS</h3>
            <p>{artistDetails.representation}</p>
            <div css={[leadersCss, container.medium]}>
              <div>
                <Img
                  alt={artistDetails.managerName}
                  fluid={getSrc(artistDetails.managerSRC, "leader")}
                />
                <h2>{artistDetails.managerName}</h2>
                <p>
                  {artistDetails.managerTitle}
                  <br />
                  <a href={artistDetails.managerMailTo}>
                    {artistDetails.managerMail}
                  </a>
                </p>
              </div>
              <div>
                <Img
                  alt={artistDetails.assistantName}
                  fluid={getSrc(artistDetails.assistantSRC, "leader")}
                />
                <h2>{artistDetails.assistantName}</h2>
                <p>
                  {artistDetails.assistantTitle}
                  <br />
                  <a href={artistDetails.assistantMailTo}>
                    {artistDetails.assistantMail}
                  </a>
                </p>
              </div>
            </div>
          </FullWidthSection>

          <ArtistsSlider
            data={data}
            showButton={false}
            backgroundColor={colors.gray}
            title='You May Also Like'
          />

          <SplitSection>
            <TextWrapper backgroundColor={colors.yellow}>
              <h3>Catch up over coffee?</h3>
              <Button onClick={() => navigate(`/contact/`)}>
                Get in Touch
              </Button>
            </TextWrapper>
            <TextWrapper backgroundColor={colors.lightblue}>
              <h3>Join the best in Boston.</h3>
              <Button onClick={() => navigate(`/careers/`)}>Work at TAG</Button>
            </TextWrapper>
          </SplitSection>

        </>
      ) : (
        <FullWidthSection ref={halfPage} height='200px' minHeight='200px' />
      )}
    </Layout>
  );
}

ArtistsTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
    fragment AllArtistContent on Mdx {
        body
        id
    }
    fragment AllArtistFrontMatters on MdxFrontmatter {
        area
        class
        title
        subtitle
        slug
        meta
        description
        representation
        artistvideoUrl
        artistVideoStartTime
        artistVideoEndTime
        managerName
        managerTitle
        managerMail
        managerMailTo
        managerSRC
        assistantName
        assistantTitle
        assistantMail
        assistantMailTo
        assistantSRC
        reviews {
            title
            description
        }
        news {
            title
            link
            imageUrl {
                imageMobile: childImageSharp {
                    fluid(maxHeight: 250) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
                imageDesktop: childImageSharp {
                    fluid(
                        maxWidth: 490
                        maxHeight: 250
                    ) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
                childImageSharp {
                    fluid(maxWidth: 490, maxHeight: 250) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
        videos {
            videoUrl
        }
        albums {
            imageUrl {
                imageMobile: childImageSharp {
                    fluid(maxHeight: 250) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
                imageDesktop: childImageSharp {
                    fluid(
                        maxWidth: 490
                        maxHeight: 250
                    ) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
                childImageSharp {
                    fluid(maxWidth: 490, maxHeight: 250) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            title
            releaseDate
            link
            index
        }
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
    query($slug: String!, $locale: String!) {
        file(
            childMdx: {
                fields: { locale: { eq: $locale } }
                frontmatter: { slug: { eq: $slug } }
            }
        ) {
            childMdx {
                ...AllArtistContent
                frontmatter {
                    ...AllArtistFrontMatters
                }
            }
        }
        allFile ( filter: {
            sourceInstanceName: { eq: "lb-artists" }
            childMdx: { fields: { locale: { eq: $locale } } }
        } ) {
            edges {
                node {
                    childMdx {
                        ...AllArtistContent
                        frontmatter {
                            ...AllArtistFrontMatters
                        }
                    }
                }
            }
        }
        ForTeam: allFile (filter: { relativeDirectory: { eq: "team" } }) {
            nodes {
                ...TeamImages
            }
        }
    }
`;
