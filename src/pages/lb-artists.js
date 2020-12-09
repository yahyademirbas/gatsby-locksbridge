import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import CTA from "../components/CTA";

import { mediaQueries, colors } from "../styles";
import ArtistPreview from "../components/ArtistPreview";
import Layout from "../components/layout";
import FullWidthSection from "../components/FullWidthSection";

export default function Artists({ data }) {
  const artists = data.allFile.edges;

  return (
    <Layout
      headerData={{
        metaTitle: `LB Artists – Full Roster`,
        mobileMinHeight: "50vh",
        title: "LB Artists",
        subTitle: "All Talents are Here",
        height: "50vh",
        bgColor: colors.yellow
      }}
    >
      <FullWidthSection padding='0'>
        <div
          css={[
            css`
              padding-top: 20px;
              margin-bottom: 30px;
              grid-template-columns: repeat(2, 1fr);
              grid-column-gap: 0.75em;

              ${mediaQueries.phoneLarge} {
                display: grid;
                width: 100%;
                grid-template-columns: repeat(3, 1fr);
                grid-column-gap: 1.5em;
                align-items: center;
                justify-items: center;
                padding-top: 143px;
                background-color: ${colors.lbWhite};
              }
            `
          ]}
        >
          {artists.map(({ node }) => (
            <ArtistPreview
              key={node.childMdx.frontmatter.title}
              frontmatter={node.childMdx.frontmatter}
            />
          ))}
        </div>
      </FullWidthSection>
      <CTA />
    </Layout>
  );
}

Artists.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
    query($locale: String!) {
        allFile(
            filter: {
                sourceInstanceName: { eq: "lb-artists" }
                childMdx: { fields: { locale: { eq: $locale } } }
            }
        ) {
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
    }
`;
