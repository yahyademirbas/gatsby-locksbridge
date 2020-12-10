import _ from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import CTA from "../components/CTA";

import { mediaQueries, colors } from "../styles";
import PostPreview from "../components/PostPreview";
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

const BASE_LINE = 80;

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos;
}

export default function WorkPage({ data }) {
  const posts = data.allFile.edges;
  // starts filtering
  const [count, countRef, increaseCount] = useRenderedCount();
  const [category, selectCategory] = useCategory();
  const countOfInitialPost = 6;

  const categories = useMemo(
    () => _.uniq(posts.map(({ node }) => node.childMdx.frontmatter.category)),
    []
  );

  useIntersectionObserver();
  useScrollEvent(() => {
    const currentPos = window.scrollY + window.innerHeight;
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE;
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost;
    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore()
    })();
  });

  const refinedPosts = useMemo(() =>
    posts
      .filter(
        ({ node }) =>
          category === CATEGORY_TYPE.ALL ||
          node.childMdx.frontmatter.category === category
      )
      .slice(0, count * countOfInitialPost), [category, count]
  );
  // ends filtering

  return (
    <Layout
      headerData={{
        metaTitle: `LB posts – Full Roster`,
        mobileMinHeight: "50vh",
        title: "LB posts",
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
          {refinedPosts.map(({ node }, index) => (
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

WorkPage.propTypes = {
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
                absolutePath: {regex: "/workContent/"}
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
