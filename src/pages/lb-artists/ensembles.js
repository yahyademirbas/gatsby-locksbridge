import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
//import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import CTA from '../../components/CTA';

import { h1L, mediaQueries, container, colors } from '../../styles';
import ArtistPreview from '../../components/ArtistPreview';
import Layout from '../../components/layout';
import FullWidthSection from '../../components/FullWidthSection';

export default function Ensembles({ data }) {
  const artists = data.allFile.edges;
  const headerStyles = css`
    @keyframes headerSlide {
      0% {
        transform: translateY(50%);
      }
      100% {
        transform: translateY(0);
      }
    }
    @keyframes afterReveal {
      0% {
        height: 100%;
      }
      100% {
        height: 0;
      }
    }
    padding: 0 20px;
    margin: 30px 0 60px;
    text-align: center;
    transform: translateY(50%);
    animation-name: headerSlide;
    animation-duration: 0.7s;
    animation-timing-function: ease-out;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: ${colors.yellow};
      animation-name: afterReveal;
      animation-duration: inherit;
      animation-timing-function: inherit;
      animation-iteration-count: inherit;
      animation-fill-mode: inherit;
    }
    ${mediaQueries.phoneLarge} {
      width: 70%;
      margin: 40px auto 50px;
    }
  `;
  return (
    <Layout
      headerData={{
        metaTitle: `LB Artists – Ensembles`,
        mobileMinHeight: '50vh',
        height: '50vh',
        children: (
          <>
            <h1 data-cy='insightTitle' css={[h1L, headerStyles]}>
              LB Artists – Ensembles
            </h1>
          </>
        ),
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

Ensembles.propTypes = {
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
              ...AllArtistImages
            }
          }
        }
      }
    }
  }
`;
