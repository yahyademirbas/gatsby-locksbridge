/* eslint-disable react/jsx-one-expression-per-line */
import React, { useRef } from 'react';
import { navigate, graphql } from 'gatsby';

import Layout from '../components/layout';
import ArtistsSlider from '../components/ArtistsSlider';
import LogoGrid from '../components/LogoGrid';
import SplitSection from '../components/SplitSection';
import Button from '../components/Button';
import { useHasBeenVisible } from '../hooks/useVisibility';
import FullWidthSection from '../components/FullWidthSection';
import { TextWrapper } from '../components/Prefooter';

import CTAGrid from '../components/CTAGrid';
import Quote from '../components/ContentBody/Quote';
import heroImage from '../images/artists/bosphilharmonic.jpg';
import heroImageMobile from '../images/bostonHeroMobile.png';

import {
  colors
} from '../styles';
import CapabilitiesSlider from '../components/CapabilitiesSlider';
import { useIntl } from 'react-intl';

// eslint-disable-next-line react/prop-types
export default ({ data }) => {
  const intl = useIntl();
  const halfPage = useRef();
  const preload = useRef();
  const hasScrolled = useHasBeenVisible(halfPage);
  const isScrolling = useHasBeenVisible(preload);

  return (
    <Layout
      headerData={{
        metaTitle: intl.formatMessage({ id: 'Motto' }),
        title: 'LocksBridge Artists',
        subTitle:
          "Turkey's first and leading international classical artist management company!",
        description:
          "Turkey's first and leading international classical artist management company!",
        mobileMinHeight: '100vh',
        height: '100vh',
        color: colors.darkgray,
        heroImage,
        heroImageMobile,
      }}
    >
      <ArtistsSlider data={data} backgroundColor={colors.lightgreen} />
      <CapabilitiesSlider
        title='What We Do'
        backgroundColor={colors.lightblue}
      />
      <Quote
        center
        altStyle
        size='large'
        padding='100px 0 100px 0'
        backgroundColor={colors.yellow}
        quoteColor={colors.white}
        data={{
          field_quote:
            'I wanted to let you know how much I have enjoyed working with the amazing team at Third and Grove. You guys go above and beyond!',
          field_footer_text:
            'Brittany Juliano, Digital Content Specialist, Draper Labs',
        }}
      />{' '}
      {hasScrolled || isScrolling ? (
        <>
          <CTAGrid
            header='Why brands work with Third and Grove for Drupal support, maintenance, and optimization:'
            items={data.allDrupalSupportCtaGridTwoJson.edges}
            images={data.icons.edges}
            backgroundColor={colors.lightblue}
            altStyle
          />

          <LogoGrid title='A Few of Our Friends' />

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
        <FullWidthSection ref={halfPage} height='2286px' minHeight='3448px' />
      )}
    </Layout>
  );
};

export const query = graphql`
  fragment IconSRCS on File {
    name
    publicURL
    absolutePath
  }
  fragment IconsSet1 on DrupalSupportCtaGridOneJson {
    icon
    title
    description
  }
  fragment IconsSet2 on DrupalSupportCtaGridTwoJson {
    icon
    title
    description
  }
  fragment AllArtistImagesTemplate on MdxFrontmatter {
    hero {
      imageMobile: childImageSharp {
        fluid(maxHeight: 250) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
      imageDesktop: childImageSharp {
        fluid(
          maxWidth: 980
          maxHeight: 500
          srcSetBreakpoints: [480, 900, 1200]
        ) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
      childImageSharp {
        fluid(maxWidth: 980, maxHeight: 500) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
  query($locale: String!) {
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
    allImageSharp(
      filter: { fluid: { originalName: { regex: "/boston-page-dtc-art/" } } }
    ) {
      nodes {
        fluid(maxWidth: 1920, maxHeight: 1080) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allDrupalSupportCtaGridOneJson {
      edges {
        node {
          ...IconsSet1
        }
      }
    }
    allDrupalSupportCtaGridTwoJson {
      edges {
        node {
          ...IconsSet2
        }
      }
    }
    icons: allFile(filter: { absolutePath: { regex: "/drupal-support/" } }) {
      edges {
        node {
          ...IconSRCS
        }
      }
    }
  }
`;
