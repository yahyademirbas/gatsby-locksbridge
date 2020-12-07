import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import CTA from '../components/CTA';

import { mediaQueries, container, colors } from '../styles';
import ArtistPreview from '../components/ArtistPreview';
import Layout from '../components/layout';
import FullWidthSection from '../components/FullWidthSection';

export default function Artists({ data }) {
  const artists = data.allFile.edges;
  return (
    <Layout
      headerData={{
        metaTitle: `LB Artists – Full Roster`,
        mobileMinHeight: '50vh',
        title: "LB Artists",
        subTitle: "All Talents are Here",
        height: '50vh',
        bgColor: colors.lbRed
      }}
    >
      <FullWidthSection padding='0'>
        <div
          css={[
            container.max,
            css`
              padding-top: 20px;
              margin-bottom: 30px;

              ${mediaQueries.phoneLarge} {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-column-gap: 10%;
                place-items: center top;
                padding-top: 143px;
                margin-bottom: 0;
              }
            `,
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
  data: PropTypes.object.isRequired,
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
