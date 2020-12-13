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
        metaTitle: "LocksBridge Artists",
        description: intl.formatMessage({ id: "Motto" }),
        mobileMinHeight: "100vh",
        color: colors.darkgray,
        height: "100vh",
        newsSlider: true,
        newsData: data.allFile.edges,
        bgUrl: data.bgimage.childImageSharp.fluid,
        bgColor: colors.lbColor
      }}
    >

      <ArtistsSlider data={data} backgroundColor={colors.lbWhite} />

      <LogoGrid title={intl.formatMessage({ id: "partners" })} />

      <SplitSection>
        <TextWrapper backgroundColor={colors.yellow}>
          <h3>{intl.formatMessage({ id: "contactus" })}</h3>
          <Button onClick={() => navigate(`/contact/`)}>{intl.formatMessage({ id: "contactuscta" })}</Button>
        </TextWrapper>
        <TextWrapper backgroundColor={colors.lightblue}>
          <h3>{intl.formatMessage({ id: "workwithus" })}</h3>
          <Button onClick={() => navigate(`/careers/`)}>{intl.formatMessage({ id: "workwithuscta" })}</Button>
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
        bgimage: file (relativePath: { eq: "cagatay-akyol.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
    }
`;

export default Index;