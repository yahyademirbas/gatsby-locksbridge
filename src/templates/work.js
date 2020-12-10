import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';

import { colors, mediaQueries } from '../styles';
import Layout from '../components/layout';
import {
  NewsletterFullWidthSection,
  NewsletterOverlay,
} from '../components/NewsletterForm';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import styled from "@emotion/styled";

const Works = ({ data }) => {
  const post = data.file.childMdx.frontmatter;
  const postContent = data.file.childMdx.body;

  const P = styled.p`
    color: ${colors.tagGray};
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.2px;
    line-height: 27px;
    text-align: justify;
    max-width: 100%;
    width: 100%;
    min-height: 81px;
    margin-bottom: 84px;

    ${mediaQueries.phoneLarge} {
      margin-top: 24px;
      margin-bottom: 84px;
    }
  `;

  const wrapperStyle = css`
    padding-top: 40px;

    ${mediaQueries.phoneLarge} {
      padding-top: 90px;
    }
  `;

  return (
    <Layout
      headerData={{
        metaTitle: post.title,
        title: post.title,
        subTitle: post.subtitle,
        description: "Turkey's first and leading international classical artist management company!",
        label: `${post.date} - ${post.subtitle}`,
        invert: true,
        color: colors.yellow,
        height: '50vh',
        mobileMinHeight: "100vh",
        newsSlider: false,
        bgUrl: post.hero.childImageSharp.fluid
      }}
    >
      <div
        css={[
          css`
            ${mediaQueries.phoneLarge} {
              margin-bottom: 90px;
            }
          `,
          wrapperStyle,
        ]}
      >
        <MDXProvider>
          <P className='animate-opacity'>
            <MDXRenderer>{postContent}</MDXRenderer>
          </P>
        </MDXProvider>
      </div>
      <NewsletterOverlay />
      <NewsletterFullWidthSection />
    </Layout>
  );
};

Works.propTypes = {
  data: PropTypes.object.isRequired,
};


export const query = graphql`
    fragment AllWorksContent on Mdx {
        body
        id
        excerpt(pruneLength: 200, truncate: true)
    }
    fragment AllWorksFrontMatters on MdxFrontmatter {
        category: area
        class
        title
        subtitle
        slug
        date(formatString: "MMMM DD, YYYY")
        author
        collab
        hero {
            imageMobile: childImageSharp {
                fluid(maxHeight: 600, maxWidth: 600) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
            imageDesktop: childImageSharp {
                fluid(maxHeight: 1000, maxWidth: 1000) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
            childImageSharp {
                fluid(maxHeight: 1080, maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
        heroMobile {
            childImageSharp {
                fluid(maxHeight: 1920, maxWidth: 1080) {
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
                ...AllWorksContent
                frontmatter {
                    ...AllWorksFrontMatters
                }
            }
        }
    }
`;

export default Works;