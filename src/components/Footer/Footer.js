import React from 'react';
import { LocalizedLink as Link } from 'gatsby-theme-i18n';
import { css } from '@emotion/core';

import { colors, fonts, weights, mediaQueries, container } from '../../styles';
import { useIntl } from "react-intl";

const Footer = () => {
  const intl = useIntl();

  const linkStyle = css`
    display: block;
    color: ${colors.whiteFaded};
    font-family: ${fonts.sans};
    padding: 13px;
    font-size: 18px;
    line-height: 1;
    font-weight: ${weights.bold};

    ${mediaQueries.phoneLarge} {
      margin-right: 40px;
      padding: 11px 0;
    }
    &:hover {
      color: ${colors.white};
    }
  `;
  const wrapperStyle = css`
    padding: 20px 0;
    text-align: center;
    background-color: ${colors.darkgray};
    min-height: 100vh;
    display: flex;
    align-items: center;

    ${mediaQueries.phoneLarge} {
      display: block;
      padding: 80px 0;
      min-height: 0;
    }
  `;
  const innerWrapperStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 50vh;
    ${mediaQueries.phoneLarge} {
      flex-direction: row;
      justify-content: center;
      min-height: 0;
    }
  `;
  return (
    <div css={wrapperStyle}>
      <div css={[innerWrapperStyle, container.max]}>
        <Link css={linkStyle} to='/work/'>
          {intl.formatMessage({ id: "navwork" })}
        </Link>
        <Link css={linkStyle} to='/capabilities/'>
          {intl.formatMessage({ id: "navcaps" })}
        </Link>
        <Link css={linkStyle} to='/insights/'>
          {intl.formatMessage({ id: "navartists" })}
        </Link>
        <Link css={linkStyle} to='/about/'>
          {intl.formatMessage({ id: "navabout" })}
        </Link>
        <Link css={linkStyle} to='/careers/'>
          {intl.formatMessage({ id: "navcareer" })}
        </Link>
        <Link css={linkStyle} to='/contact/'>
          {intl.formatMessage({ id: "navcontact" })}
        </Link>
        <Link css={linkStyle} to='/legal/'>
          {intl.formatMessage({ id: "navlegal" })}
        </Link>
      </div>
    </div>
  );
};

export default Footer;
