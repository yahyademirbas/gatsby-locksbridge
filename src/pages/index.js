/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { navigate, graphql } from "gatsby";

import Layout from "../components/layout";
import ArtistsSlider from "../components/ArtistsSlider";
import LogoGrid from "../components/LogoGrid";
import SplitSection from "../components/SplitSection";
import Button from "../components/Button";
import { TextWrapper } from "../components/Prefooter";

import CTAGrid from "../components/CTAGrid";

import { colors } from "../styles";

import { useIntl } from "react-intl";


const Index = ({ data }) => {
  const intl = useIntl();

  return (
    <Layout
      headerData={{
        metaTitle: intl.formatMessage({ id: "Motto" }),
        title: "LocksBridge Artists",
        subTitle: "XXX",
        description:
          "Turkey's first and leading international classical artist management company!",
        mobileMinHeight: "100vh",
        color: colors.darkgray,
        height: "100vh",
        newsSlider: false,
        bgUrl: data.bgimage.childImageSharp.fluid,
        bgColor: colors.lbColor
      }}
    >

      <ArtistsSlider data={data} backgroundColor={colors.lbColor} />

      <CTAGrid
        header='Why brands work with Third and Grove for Drupal support, maintenance, and optimization:'
        items={data.allDrupalSupportCtaGridTwoJson.edges}
        images={data.icons.edges}
        backgroundColor={colors.yellow}
        altStyle
      />

      <LogoGrid title='A Few of Our Friends' />

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
    query($locale: String!) {
        allFile (
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
        bgimage: file (relativePath: { eq: "boston.png" }) {
                    childImageSharp {
                        fluid(maxWidth: 900) {
                            ...GatsbyImageSharpFluid_withWebp
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

export default Index;