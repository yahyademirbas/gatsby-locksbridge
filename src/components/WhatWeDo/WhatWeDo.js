import React, { forwardRef } from 'react';
import { css } from '@emotion/core';
import { navigate } from 'gatsby';

import Button from '../Button';
import { colors, mediaQueries, smSectionHead } from '../../styles';
import FullWidthSection from '../FullWidthSection';
import { useIntl } from "react-intl";
import { LocalizedLink as Link } from "gatsby-theme-i18n";

const WhatWeDo = forwardRef((props, ref) => {
  const intl = useIntl();
  const headingCss = css`
    margin-bottom: 5px;
    font-size: 48px;
    line-height: 1.4;
    letter-spacing: -0.5px;
    cursor: pointer;
    transition: 0.3s ease all;

    &:last-of-type {
      margin-bottom: 40px;
    }

    ${mediaQueries.phoneLarge} {
      font-size: 90px;
      line-height: 1.33;
      letter-spacing: -1.13px;
      margin-bottom: 0;
    }

    a {
      color: ${colors.darkgrayFaded};
    }

    a:hover {
      color: ${colors.darkgray};
    }
  `;

  return (
    <FullWidthSection
      ref={ref}
      backgroundColor={colors.whiteFaded}
      height='750px'
      minHeight='550px'
      css={css`
        padding-top: 40px;
        padding-bottom: 60px;
        ${mediaQueries.phoneLarge} {
          padding-top: 80px;
          padding-bottom: 100px;
        }
      `}
    >
      <h3 css={smSectionHead}>{intl.formatMessage({ id: "navwhat" })}</h3>
      <h4 css={headingCss}>
        <Link to='/capabilities#artistmanagement'>{intl.formatMessage({ id: "navmanagement" })}</Link>
      </h4>
      <h4 css={headingCss}>
        <Link to='/capabilities#creative'>{intl.formatMessage({ id: "navcreative" })}</Link>
      </h4>
      <h4 css={headingCss}>
        <Link to='/capabilities#events'>{intl.formatMessage({ id: "navevents" })}</Link>
      </h4>
      <Button>
        <Link to='/capabilities'>
          {intl.formatMessage({ id: "navcaps" })}
        </Link>
      </Button>
    </FullWidthSection>
  );
});

export default WhatWeDo;
