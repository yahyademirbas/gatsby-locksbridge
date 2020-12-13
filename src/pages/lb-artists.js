import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import CTA from "../components/CTA";

import { mediaQueries, colors } from "../styles";
import ArtistPreview from "../components/ArtistPreview";
import Layout from "../components/layout";
import FullWidthSection from "../components/FullWidthSection";
import { useCategory } from "../hooks/useCategory";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useRenderedCount } from "../hooks/useRenderedCount";
import { useScrollEvent } from "../hooks/useScrollEvent";
import * as Dom from "../util/dom";
import * as EventManager from "../util/event-manager";
import { Category } from "../components/Category";
import { CATEGORY_TYPE } from "../constants";



export default function Artists({ data }) {

  const artists = data.allFile.edges;

  const BASE_LINE = 80;

  function getDistance(currentPos) {
    return Dom.getDocumentHeight() - currentPos;
  }
  // starts filtering
  const [count, countRef, increaseCount] = useRenderedCount();
  const [category, selectCategory] = useCategory();
  const countOfInitialPost = 10;

  const categories = _.uniq(artists.map(({ node }) => node.childMdx.frontmatter.category));

  useIntersectionObserver();
  useScrollEvent(() => {
    const currentPos = window.scrollY + window.innerHeight;
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE;
    const doesNeedMore = () =>
      artists.length > countRef.current * countOfInitialPost;
    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore()
    })();
  });


  const refinedPosts =
    artists
      .filter(
        ({ node }) =>
          category === CATEGORY_TYPE.ALL ||
          node.childMdx.frontmatter.category === category
      )
      .slice(0, count * countOfInitialPost);
  // ends filtering

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

        <Category
          categories={categories}
          category={category}
          selectCategory={selectCategory}
        />
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
          {refinedPosts.map(({ node, index }) => (
            <ArtistPreview
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

Artists.propTypes = {
  data: PropTypes.object.isRequired
};

export const query = graphql`
    query($locale: String!) {
        allFile(
            filter: {
                absolutePath: {regex: "/lb-artists/"}
                childMdx: { fields: { locale: { eq: $locale } } }
            }
            sort: {fields: childMdx___frontmatter___title, order: ASC}
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
