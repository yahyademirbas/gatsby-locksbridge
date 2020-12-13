import React from "react";
import useSlider from "./useSlider";
import { css } from "@emotion/core";
import { mediaQueries, weights, colors } from "../../styles";

export default function IndexSlider({ fill, data }) {
  // use addItem for anything that needs loading confirmation like images or embeds
  const { offset } = useSlider({
    total: data.length,
    enabled: true,
    useLoaded: false,
    speed: 5000
  });

  const headerTitle = css`
    @keyframes headerSlide {
      0% {
        transform: translateY(100%);
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

    position: relative;
    z-index: 10;
    margin-bottom: 0;
    padding: 0 20px;
    line-height: 1.23;
    font-size: 39px;
    font-weight: ${weights.medium};
    letter-spacing: -0.45px;
    text-align: left;
    text-stroke: ${fill};
    color: ${colors.lbDarkBlue};
    -webkit-text-stroke: ${fill};
    text-stroke-width: 1px;
    border-bottom: solid 5px ${fill};
    border-left: solid 5px ${fill};
    -webkit-text-stroke-width: 1.3px;
    -webkit-font-smoothing: antialiased;
    transform: translateY(100%);
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
      height: 100vh;
      width: 100%;
      background: transparent;
      animation-name: afterReveal;
      animation-duration: inherit;
      animation-timing-function: inherit;
      animation-iteration-count: inherit;
      animation-fill-mode: inherit;
    }

    ${mediaQueries.phoneLarge} {
      width: 100%;
      padding: 0 20px;
      font-size: 72px;
      line-height: 1.17;
      letter-spacing: -1px;
    }

    ${mediaQueries.desktop} {
      width: 100%;
      padding: 20px;
    }
  `;

  const Wrapper = css`
    position: absolute;
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    z-index: 2;
    flex-direction: column;
  `;

  const ContainerCSSHeader = css`
    height: 300px;
    min-width: 700px;
    background-color: transparent;
    margin: 0 auto;
    top: 20%;
    position: absolute;
    overflow: hidden;
  `;

  const ContainerCSS = css`
    height: 300px;
    min-width: 700px;
    align-self: center;
    background-color: transparent;
    margin: 0 auto;
    position: absolute;
    overflow: hidden;
  `;

  const ScrollerCSS = css`
    position: absolute;
    transition: transform 350ms;
    display: flex;
    flex-direction: column;
    transform: translate3d(0, -${offset * 300}px, 0);
    height: ${data.length * 300}px;
  `;

  const SlideCSS = css`
    width: 100%;
    height: 300px;
    display: flex;
    font-size: 3rem;
    flex-direction: column;
    text-align: right;
    color: transparent;
    align-items: flex-end;
    justify-content: center;
    position: relative;
    transition: opacity 350ms;
    text-stroke: ${fill};
    color: ${colors.lbDarkBlue};
    -webkit-text-stroke: ${fill};
    text-stroke-width: 1px;
    -webkit-text-stroke-width: 1.3px;
    -webkit-font-smoothing: antialiased;

    p {
      font-size: 1rem;
      color: ${fill};
      text-stroke: transparent;
      text-stroke-width: 0;
      -webkit-text-stroke: transparent;
    }
  `;

  return (
    <div css={Wrapper}>
      <div css={ContainerCSSHeader}>
        <h3 css={headerTitle}>
          LB Artists
        </h3>
      </div>
      <div css={ContainerCSS}>

        <div css={ScrollerCSS}>
          {data.map(({ node, i }) => (
            <div
              key={i}
              css={SlideCSS}
            >
              {node.childMdx.frontmatter.title}
              <p>{node.childMdx.excerpt}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
