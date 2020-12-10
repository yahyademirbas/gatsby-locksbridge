/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { navigate, graphql } from "gatsby";

import Layout from "../components/layout";
import ArtistsSlider from "../components/ArtistsSlider";
import LogoGrid from "../components/LogoGrid";
import SplitSection from "../components/SplitSection";
import Button from "../components/Button";
import { TextWrapper } from "../components/Prefooter";

import { colors } from "../styles";
import { useIntl } from "react-intl";

const Index = ({ data }) => {
  const intl = useIntl();

  return (
    <Layout
      headerData={{
        metaTitle: intl.formatMessage({ id: "Motto" }),
        title: "",
        subTitle: "",
        description: "Turkey's first and leading international classical artist management company!",
        mobileMinHeight: "100vh",
        color: colors.darkgray,
        height: "100vh",
        newsSlider: true,
        bgUrl: data.bgimage.childImageSharp.fluid
      }}
    >

      <ArtistsSlider data={data} backgroundColor={colors.lbWhite} />

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
    query($locale: String!) {
        allFile (
            filter: {
                absolutePath: {regex: "/lb-artists/"}
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
        bgimage: file (relativePath: { eq: "boston.png" }) {
            childImageSharp {
                fluid(maxWidth: 900) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;

export default Index;