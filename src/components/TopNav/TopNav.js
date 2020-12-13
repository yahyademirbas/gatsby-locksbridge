import React, { useState } from "react";
import PropTypes from "prop-types";
import { LocalizedLink as Link } from "gatsby-theme-i18n";
import { css } from "@emotion/core";

import useWindow from "../../hooks/useWindow";
import Menu from "../Menu";
import { colors, mediaQueries, jsBreakpoints, container } from "../../styles";

import LBLogo from "./svg/LBLogo";
import LocksBridge from "./svg/LocksBridge";
import Hamburger from "./svg/hamburger";
import styled from "@emotion/styled";

const TopNav = ({ fill, hideNav }) => {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!isOpen);

  const LocaleSwitcher = styled.div`
    position: absolute;
    right: 5%;
    padding: 1rem;
    z-index:5;
    
  `;

  const LocaleColor = css`
  color: ${fill};
  }
`;


  const { width } = useWindow();


  return (
    <>
      {hideNav ? (
        <div
          css={[
            container.max,
            css`
              position: ${isOpen ? "fixed" : "absolute"};
              top: 0;
              padding-top: 20px;
              padding-bottom: 10px;
              left: 50%;
              transform: translateX(-50%);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 4;

              ${mediaQueries.phoneLarge} {
                padding-top: 30px;
              }
            `
          ]}
        >
          <LocksBridge
            css={css`
              height: 60px;
              fill: ${isOpen ? colors.lightgray : fill};
            `}
          />
        </div>
      ) : (
        <>
          {" "}
          <div
            css={[
              container.max,
              css`
                position: ${isOpen ? "fixed" : "absolute"};
                top: 0;
                padding-top: 20px;
                padding-bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                justify-content: space-between;
                align-items: center;
                z-index: 4;

                ${mediaQueries.phoneLarge} {
                  padding-top: 30px;
                }
              `
            ]}
          >
            <Link to='/' aria-label='return to homepage' data-cy='homeButton'>
              {/* This guard keeps the Gatsby build from breaking by ensuring this code isn't run at build time. */}
              {typeof window !== "undefined" &&
              (width > jsBreakpoints.phoneLarge ? (
                <LocksBridge
                  css={css`
                      height: 60px;
                      fill: ${isOpen ? colors.lightgray : fill};
                    `}
                />
              ) : (
                <LBLogo
                  css={css`
                      fill: ${isOpen ? colors.lightgray : fill};
                      height: 50px;
                      margin-left: -10px;
                    `}
                />
              ))}
            </Link>

            <LocaleSwitcher data-name='locale-switcher' css={LocaleColor}>
              <Link hrefLang='en' language="en" to='/' css={LocaleColor}>
                EN
              </Link>{" "}
              /{" "}
              <Link language="tr" to='/tr' css={LocaleColor}>
                TR
              </Link>
            </LocaleSwitcher>

            <button
              css={css`
                background-color: transparent;
                padding: 0;
                margin: 0;
                border: none;
                min-height: 25px;
                cursor: pointer;
                :focus {
                  outline: none;
                }
              `}
              type='button'
              onClick={() => toggleOpen()}
              data-cy='menuButton'
              aria-label='open site menu'
            >
              <Hamburger
                fill={isOpen ? colors.lightgray : fill}
                isOpen={isOpen}
              />
            </button>
          </div>

          <Menu toggleOpen={toggleOpen} menuOpen={isOpen} />{" "}
        </>
      )}
    </>
  );
};

TopNav.propTypes = {
  fill: PropTypes.string,
  hideNav: PropTypes.bool
};

TopNav.defaultProps = {
  fill: colors.lightgray,
  hideNav: false
};

export default TopNav;
