/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { colors, mediaQueries, container } from '../../styles';
import _kebabCase from 'lodash/kebabCase';

import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import Quote from '../../components/ContentBody/Quote';
import ArtistNews from '../ArtistNews';
import ArtistVideos from '../ArtistVideos';
import ArtistAlbums from '../ArtistAlbums';

export default function ArtistPageSlide({ title, data }) {
  const ref = useRef();
  const [width, setWidth] = useState(0);

  function debounce(fn, ms) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(_ => {
        timer = null;
        fn.apply(this, args);
      }, ms);
    };
  }

  useEffect(() => {
    function handleResize() {
      let getWidth = 0;
      const w = window.innerWidth;
      switch (true) {
        case w >= 1025:
          getWidth =
            ref.current.children[0].children[1].clientWidth +
            window.innerWidth * 0.5;
          break;
        case w >= 900:
          getWidth =
            ref.current.children[0].children[1].clientWidth +
            window.innerWidth * 0.5;
          break;
        default:
          getWidth = window.innerWidth;
          break;
      }
      setWidth(getWidth);
    }

    const debouncedHandleResize = debounce(handleResize, 100);

    window.addEventListener('resize', debouncedHandleResize);
    window.addEventListener('orientationchange', debouncedHandleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      window.addEventListener('orientationchange', debouncedHandleResize);
    };
  }, []);

  const Card = styled.div`
    opacity: 1 !important;

    .animate-opacity {
      opacity: 0;
      transition: opacity 1s ease;
    }

    h3 {
      line-height: 1.57;
      letter-spacing: 1.5px;

      ${mediaQueries.desktop} {
        line-height: 1.57;
      }
    }
  `;

  const P = styled.p`
    color: ${colors.tagGray};
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.2px;
    line-height: 27px;
    text-align: justify;
    max-width: 100%;
    width: 100%;
    min-height: 81px;
    margin-bottom: 84px;

    ${mediaQueries.phoneLarge} {
      margin-top: 24px;
      margin-bottom: 84px;
    }
  `;

  const H3 = styled.h3`
    font-size: 60px !important;
    font-weight: 500;
    letter-spacing: 1.53px;
    line-height: 90px;
    text-align: center;
    color: ${colors.tagGray};
    transition: color 1s ease;
    text-stroke: ${colors.lbColor};
    -webkit-text-stroke: ${colors.lbColor};
    text-stroke-width: 1px;
    -webkit-text-stroke-width: 1px;
    -webkit-font-smoothing: antialiased;

    ${mediaQueries.phoneLarge} {
      font-size: 115px !important;
      font-weight: 500;
      letter-spacing: 1.53px;
      line-height: 76px;
    }
  `;

  return (
    <Card ref={ref} style={{ width }}>
      <span
        css={[
          container.max,
          css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .slider-button {
              opacity: 0;
              transition: opacity 1s ease;
              margin-bottom: 48px;

              ${mediaQueries.phoneLarge} {
                margin-bottom: 0;
              }
            }
          `,
        ]}
      >
        <H3>{title}</H3>

        {title === 'About' && (
          <MDXProvider>
            <P className='animate-opacity'>
              <MDXRenderer>{data.file.childMdx.body}</MDXRenderer>
            </P>
          </MDXProvider>
        )}

        {title === 'News' && (
          <div
            className='animate-opacity'
            css={[
              container.max,
              css`
                padding-top: 20px;
                margin-bottom: 30px;

                ${mediaQueries.phoneLarge} {
                  display: grid;
                  grid-template-columns: repeat(1, 1fr);
                  grid-column-gap: 10%;
                  place-items: center top;
                  padding-top: 143px;
                  margin-bottom: 0;
                }
              `,
            ]}
          >
            {data.file.childMdx.frontmatter.news.map((item, index) => (
              <ArtistNews
                key={`news-item-${_kebabCase(item.title) + '-' + index}`}
                imageUrl={item.imageUrl}
                link={item.link}
                title={item.title}
                subTitle={item.title}
              />
            ))}
          </div>
        )}

        {title === 'Reviews' && (
          <div className='animate-opacity'>
            {data.file.childMdx.frontmatter.reviews.map((item, index) => (
              <Quote
                key={`review-item-${_kebabCase(item.title) + '-' + index}`}
                size='small'
                data={{
                  field_quote: item.description,
                  field_footer_text: item.title,
                }}
              />
            ))}
          </div>
        )}

        {title === 'Videos' && (
          <div
            className='animate-opacity'
            css={[
              container.max,
              css`
                padding-top: 20px;
                margin-bottom: 30px;

                ${mediaQueries.phoneLarge} {
                  display: grid;
                  grid-template-columns: repeat(1, 1fr);
                  grid-column-gap: 10%;
                  place-items: center top;
                  padding-top: 143px;
                  margin-bottom: 0;
                }
              `,
            ]}
          >
            {data.file.childMdx.frontmatter.videos.map((item, index) => (
              <ArtistVideos
                url={item.videoUrl}
                key={`video-item-${_kebabCase(item.videoUrl) + '-' + index}`}
              />
            ))}
          </div>
        )}

        {title === 'Discography' && (
          <div className='animate-opacity'>
            {data.file.childMdx.frontmatter.albums.map((item, index) => (
              <ArtistAlbums
                imageUrl={item.imageUrl}
                index={item.index}
                title={item.title}
                url={item.imageURL}
                link={item.link}
                date={item.releaseDate}
                key={`album-item-${_kebabCase(item.videoUrl) + '-' + index}`}
              />
            ))}
          </div>
        )}
      </span>
    </Card>
  );
}

ArtistPageSlide.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  data: PropTypes.string,
};
