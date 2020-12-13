import React, { useCallback, useRef } from "react";
import { Item } from "./item";
import { css } from "@emotion/core";
import { colors } from "../../styles";
import { useIntl } from "react-intl";

export function Category({ categories, category, selectCategory }) {
  const intl = useIntl();
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
    white-space: nowrap;
    z-index: 1;
    margin: 0;
    display: flex;
    flex-direction: row;
    background-color: ${colors.lbMain};
    width: 100%;
    min-height: 100px;
    align-content: center;
    justify-content: center;
    list-style: none;
    .item {
      margin: 0 6px 0 6px;
      box-sizing: border-box;
      background-color: ${colors.lbGray};
      color: ${colors.lbWhite};
      align-self: center;
      justify-self: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
      &:hover {
        background-color: ${colors.lbWhite};
        color: ${colors.lbGray};
      }

      &:active {
        background-color: ${colors.lbWhite};
        color: ${colors.lbGray};
      }

      &:focus {
        background-color: ${colors.lbWhite};
        color: ${colors.lbGray};
      }


      div {
        align-self: center;
        justify-self: center;
        transition: all 0.35s linear;
        padding: 0.5rem 1rem 0.5rem 1rem;
        font-size: 13px;
        text-align: center;
        box-sizing: border-box;
        cursor: pointer;
      }
    }
  `;
  return (
    <div
      ref={containerRef}
      className="category-container"
      role="tablist"
      id="category"
      css={Container}
    >
      <Item title={intl.formatMessage({ id: "all" })} selectedCategory={category} onClick={selectCategory} scrollToCenter={scrollToCenter} />
      {categories.map((title, idx) => (
        <Item
          key={idx}
          title={title}
          selectedCategory={category}
          onClick={selectCategory}
          scrollToCenter={scrollToCenter}
        />
      ))}
    </div>
  );
};