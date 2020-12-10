import React, { useCallback, useRef } from "react";
import { Item } from "./item";
import { css } from "@emotion/core";

export function Category({ categories, category, selectCategory }) {
  const containerRef = useRef(null);

  const scrollToCenter = useCallback(tabRef => {
    const { offsetWidth: tabWidth } = tabRef.current;
    const { scrollLeft, offsetWidth: containerWidth } = containerRef.current;
    const tabLeft = tabRef.current.getBoundingClientRect().left;
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const refineLeft = tabLeft - containerLeft;
    const targetScollX = scrollLeft + refineLeft - (containerWidth / 2) + (tabWidth / 2);

    containerRef.current.scroll({ left: targetScollX, top: 0, behavior: "smooth" });
  }, [containerRef]);

  const Container = css`
    position: sticky;
    position: -webkit-sticky;
    top: 8px;
    line-height: 0;
    white-space: nowrap;
    overflow-x: scroll;
    -ms-overflow-style: none; // IE 10+
    overflow: -moz-scrollbars-none; // Firefox
    z-index: 1;
    padding: 6px 20px;

    scroll-behavior: smooth;

    .item {
      display: inline-block;
      margin: 0.25rem 6px 0.25rem 0;
      border-radius: 15px;
      white-space: normal;
      box-sizing: border-box;

      div {
        display: block;
        padding: 14px 16px 16px 16px;
        font-size: 13px;
        box-sizing: border-box;
        cursor: pointer;
      }
    }

    .item:last-child {
      margin-right: 0;
    }
    ::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }
  `;
  return (
    <ul
      ref={containerRef}
      className="category-container"
      role="tablist"
      id="category"
      style={{
        margin: `0 auto`
      }}
      css={Container}
    >
      <Item title={"All"} selectedCategory={category} onClick={selectCategory} scrollToCenter={scrollToCenter} />
      {categories.map((title, idx) => (
        <Item
          key={idx}
          title={title}
          selectedCategory={category}
          onClick={selectCategory}
          scrollToCenter={scrollToCenter}
        />
      ))}
    </ul>
  );
};