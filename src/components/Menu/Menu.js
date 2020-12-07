import React from 'react';
import PropTypes from 'prop-types';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { css } from '@emotion/core';

import { colors, mediaQueries, weights, container } from '../../styles';

const Menu = ({ menuOpen, toggleOpen }) => {
  const textFadeIn = css`
    position: relative;
    opacity: ${menuOpen ? '1' : '0'};
    transform: translateY(${menuOpen ? '0' : '50%'});
    transition-property: color, transform, opacity;
    transition-timing-function: ease-in-out;
    transition-duration: 1s;

    &::after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: ${colors.lbRed};
      transition: inherit;
      height: ${menuOpen ? '0' : '100%'};
    }
  `;

  const mobileDelay1 = css`
    transition-delay: 0s, 0.1s, 0.1s;
  `;

  const mobileDelay2 = css`
    transition-delay: 0s, 0.2s, 0.2s;
  `;

  const mobileDelay3 = css`
    transition-delay: 0s, 0.3s, 0.3s;
  `;

  const mobileDelay4 = css`
    transition-delay: 0s, 0.4s, 0.4s;
  `;

  const mobileDelay5 = css`
    transition-delay: 0s, 0.5s, 0.5s;
  `;

  const mobileDelay6 = css`
    transition-delay: 0s, 0.6s, 0.6s;
  `;

  const mobileDelay7 = css`
    transition-delay: 0s, 0.7s, 0.7s;
  `;

  const mobileDelay8 = css`
    transition-delay: 0s, 0.8s, 0.8s;
  `;

  const mobileDelay9 = css`
    transition-delay: 0s, 0.9s, 0.9s;
  `;

  const mobileDelay10 = css`
    transition-delay: 0s, 1s, 1s;
  `;

  const mobileDelay11 = css`
    transition-delay: 0s, 1.1s, 1.1s;
  `;

  const mobileDelay12 = css`
    transition-delay: 0s, 1.2s, 1.2s;
  `;

  const desktopDelay1 = css`
    ${mediaQueries.phoneLarge} {
      transition-delay: 0s, 0.2s, 0.2s;
    }
  `;

  const desktopDelay2 = css`
    ${mediaQueries.phoneLarge} {
      transition-delay: 0s, 0.4s, 0.4s;
    }
  `;

  const desktopDelay3 = css`
    ${mediaQueries.phoneLarge} {
      transition-delay: 0s, 0.6s, 0.6s;
    }
  `;

  const desktopDelay4 = css`
    ${mediaQueries.phoneLarge} {
      transition-delay: 0s, 0.8s, 0.8s;
    }
  `;

  const linkBaseStyles = css`
    display: block;
    color: ${colors.whiteFaded};
    font-weight: ${weights.medium};
    letter-spacing: -0.2px;

    &:hover,
    &:focus {
      color: ${colors.white};
    }
  `;

  const linkPrimaryStyle = css`
    font-size: 36px;
    line-height: 57px;

    ${mediaQueries.desktop} {
      font-size: 48px;
      line-height: 81px;
    }
  `;

  const sectionStyle = css`
    ${mediaQueries.phoneLarge} {
      padding: 0;
    }
  `;

  const sectionPrimaryStyle = css`
    h5 {
      display: none;

      ${mediaQueries.phoneLarge} {
        display: block;
      }
    }
  `;

  const sectionHeaderStyle = css`
    font-weight: ${weights.thin};
    color: ${colors.white};
    letter-spacing: -0.1px;
    line-height: 15px;
    font-size: 15px;
    margin-bottom: 10px;

    ${mediaQueries.phoneLarge} {
      margin-bottom: 26px;
      line-height: 81px;
      font-size: 21px;
    }
  `;

  const linksWrapper = css`
    display: grid;
    -ms-grid-columns: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    max-width: 195px;
    margin: 0 auto;

    ${mediaQueries.phoneLarge} {
      display: block;
      max-width: none;
      margin: 0 auto;
    }
  `;

  return (
    <nav
      css={css`
        position: fixed;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: ${colors.lbRed};
        transition: 0.3s ease all;
        overflow: hidden;
        z-index: 3;
        top: ${menuOpen ? '0' : '100vh'};
        flex-direction: column;
        justify-content: center;
        height: ${menuOpen ? 'auto' : '0'};
        min-height: ${menuOpen ? '100vh' : '0'};
        padding: 0;

        ${mediaQueries.phoneLarge} {
          flex-direction: row;
          height: ${menuOpen ? '100vh' : '0'};
        }
      `}
    >
      <div
        css={[
          container.max,
          css`
            padding-top: 80px;
            padding-bottom: 60px;
            ${mediaQueries.phoneLarge} {
              display: flex;
              justify-content: space-around;
              padding-top: 0;
              padding-bottom: 0;
            }
          `,
        ]}
      >
        <section css={[sectionStyle, sectionPrimaryStyle, css`justify-self: flex-start; text-align: left`]}>
          <h5 css={[sectionHeaderStyle, textFadeIn, desktopDelay1, css`text-align: left`]}>
            What We Do
          </h5>
          <Link
            css={[
              linkPrimaryStyle,
              textFadeIn,
              linkBaseStyles,
              mobileDelay1,
              desktopDelay1,
            ]}
            onClick={() => toggleOpen()}
            to='/capabilities'
          >
            Work
          </Link>
          <Link
            onClick={() => toggleOpen()}
            css={[
              linkPrimaryStyle,
              textFadeIn,
              linkBaseStyles,
              mobileDelay2,
              desktopDelay2,
            ]}
            to='/work'
          >
            Events
          </Link>
          <Link
            css={[
              linkPrimaryStyle,
              textFadeIn,
              linkBaseStyles,
              mobileDelay3,
              desktopDelay3,
            ]}
            onClick={() => toggleOpen()}
            to='/insights'
          >
            Creative
          </Link>
          <Link
            css={[
              linkPrimaryStyle,
              textFadeIn,
              linkBaseStyles,
              mobileDelay4,
              desktopDelay4,
            ]}
            onClick={() => toggleOpen()}
            to='/capabilities'
          >
            Capabilities
          </Link>
        </section>

        <section css={[sectionStyle, sectionPrimaryStyle, css`justify-self: center; text-align: center`]}>
          <h5 css={[sectionHeaderStyle, textFadeIn, desktopDelay1, css`text-align: center`]}>
            Artist Management
          </h5>
          <Link
            css={[
              linkPrimaryStyle,
              textFadeIn,
              linkBaseStyles,
              mobileDelay5,
              desktopDelay1,
            ]}
            onClick={() => toggleOpen()}
            to='/lb-artists/'
          >
            News
          </Link>
          <Link
            css={[
              linkPrimaryStyle,
              textFadeIn,
              linkBaseStyles,
              mobileDelay6,
              desktopDelay2,
            ]}
            onClick={() => toggleOpen()}
            to='/lb-artists/soloists/'
          >
            Tours
          </Link>
          <Link
            css={[
              linkPrimaryStyle,
              textFadeIn,
              linkBaseStyles,
              mobileDelay7,
              desktopDelay3,
            ]}
            onClick={() => toggleOpen()}
            to='/lb-artists/soloists/'
          >
            Projects
          </Link>
          <Link
            css={[
              linkPrimaryStyle,
              textFadeIn,
              linkBaseStyles,
              mobileDelay8,
              desktopDelay4,
            ]}
            onClick={() => toggleOpen()}
            to='/lb-artists/'
          >
            LB Artists
          </Link>
        </section>

        <section css={[sectionStyle, sectionPrimaryStyle, css`justify-self: flex-end; text-align: right`]}>
          <h5
            css={[sectionHeaderStyle, textFadeIn, mobileDelay7, desktopDelay1, css`text-align: right`]}
          >
            Who We Are
          </h5>
          <div css={linksWrapper}>
            <Link
              css={[
                linkPrimaryStyle,
                textFadeIn,
                linkBaseStyles,
                mobileDelay9,
                desktopDelay1,
              ]}
              onClick={() => toggleOpen()}
              to='/team'
              >
              Team
            </Link>
            <Link
              css={[
                linkPrimaryStyle,
                textFadeIn,
                linkBaseStyles,
                mobileDelay10,
                desktopDelay2,
              ]}
              onClick={() => toggleOpen()}
              to='/about'
            >
              About
            </Link>
            <Link
              css={[
                linkPrimaryStyle,
                textFadeIn,
                linkBaseStyles,
                mobileDelay11,
                desktopDelay3,
              ]}
              onClick={() => toggleOpen()}
              to='/work'
            >
              Careers
            </Link>
          </div>
          <div>
            <Link
              css={[
                linkPrimaryStyle,
                textFadeIn,
                linkBaseStyles,
                mobileDelay12,
                desktopDelay4,
              ]}
              onClick={() => toggleOpen()}
              to='/contact'
            >
              Partners
            </Link>
          </div>
        </section>

      </div>
    </nav>
  );
};

Menu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};

export default Menu;
