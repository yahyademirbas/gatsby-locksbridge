import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import CTA from "../components/CTA";

import { mediaQueries, colors } from "../styles";
import PostPreview from "../components/PostPreviewWoFilter";
import Layout from "../components/layout";
import FullWidthSection from "../components/FullWidthSection";

export default function Projects({ data }) {
  const posts = data.allFile.edges;

  return (
    <Layout
      headerData={{
        metaTitle: `Latest News`,
        mobileMinHeight: "50vh",
        title: "Latest News",
        subTitle: "Latest News from LB Artists",
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
          {posts.map(({ node }, index) => (
            <PostPreview
              key={`item_${index}`}
              frontmatter={node.childMdx.frontmatter}
              excerpt={node.childMdx.excerpt}
            />
          ))}
        </div>
      </FullWidthSection>
      <CTA />
    </Layout>
  );
}

Projects.propTypes = {
  data: PropTypes.object.isRequired
};


export const query = graphql`
    query($locale: String!) {
        site {
            siteMetadata {
                title
            }
        }
        allFile(
            filter: {
                absolutePath: {regex: "/creative/"}
                childMdx: { fields: { locale: { eq: $locale } } }
            }
            sort: {fields: childMdx___frontmatter___title, order: ASC}
        ) {
            edges {
                node {
                    childMdx {
                        ...AllWorksContent
                        frontmatter {
                            ...AllWorksFrontMatters
                        }
                    }
                }
            }
        }
    }
`;
