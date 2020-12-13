import React  from "react";
import useSlider from "./useSlider";
import { css } from "@emotion/core";


export default function IndexSlider({ fill, data }) {
  // use addItem for anything that needs loading confirmation like images or embeds
  const { offset } = useSlider({
    total: data.length,
    enabled: true,
    useLoaded: false,
    speed: 3000
  });

  const Wrapper = css`
    position: absolute;
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    z-index: 2;
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
    height: 100%;
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
    text-align: center;
    color: ${fill};
    align-items: center;
    justify-content: center;
    position: relative;
    transition: opacity 350ms;

    p {
      font-size: 0.2rem;
    }
  `;

  return (
    <div css={Wrapper}>
      <div css={ContainerCSS}>
        <div
          css={ScrollerCSS}
        >
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
