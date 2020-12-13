import React from 'react';
import { css } from '@emotion/core';

import Layout from '../components/layout';
import ContactForm from '../components/ContactForm';
import { mediaQueries, fonts, weights, container } from '../styles';
import {useIntl} from "react-intl";
const Contact = () => {

  const intl = useIntl();

  const wrapperCss = css`
    padding-top: 80px;
    padding-bottom: 80px;
    text-align: center;
    font-family: ${fonts.sans};
    font-weight: ${weights.light};
    font-size: 16px;
    line-height: 1.7;

    ${mediaQueries.phoneLarge} {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-top: 100px;
      padding-bottom: 100px;
    }
  `;

  const headingCss = css`
    margin-bottom: 0;
    font-family: ${fonts.sans};
    font-weight: ${weights.bold};
    font-size: 21px;
    line-height: 1.7;

    ${mediaQueries.phoneLarge} {
      font-size: 18px;
      line-height: 2;
    }
  `;

  const contactItem = css`
    min-height: 120px;

    ${mediaQueries.phoneLarge} {
      flex: 0 0 calc(50% - 20px);
      width: calc(50% - 20px);
    }
  `;

  const contactItemWide = css`
    ${mediaQueries.phoneLarge} {
      flex: 0 0 100%;
      width: 100%;
      padding-top: 40px;
    }
  `;

  const socialList = css`
    list-style-type: none;
    margin: 0;
    padding: 0;

    ${mediaQueries.phoneLarge} {
      margin-top: 11px;
      display: flex;
      justify-content: center;
      line-height: 1;
    }

    li {
      margin-bottom: 0;
      padding: 0;

      ${mediaQueries.phoneLarge} {
        padding: 0 30px;

        & + li {
          border-left: solid 1px currentColor;
        }
      }
    }
  `;

  return (
    <Layout
      headerData={{
        title: intl.formatMessage({ id: "navcontact" }),
        height: '850px',
        children: <ContactForm />,
      }}
    >
      <div css={[container.textOnly, wrapperCss]}>
        <div css={contactItem}>
          <h3 css={headingCss}>{intl.formatMessage({ id: "mail" })}</h3>
          <a href='mailto:info@locksbridge.net'>info@locksbridge.net</a>
        </div>

        <div css={contactItem}>
          <h3 css={headingCss}>{intl.formatMessage({ id: "navist" })}</h3>
          333 Washington St Suite 326
          <br />
          Boston, MA 02108
        </div>

        <div css={[contactItem, contactItemWide]}>
          <h3 css={headingCss}>{intl.formatMessage({ id: "follow" })}</h3>
          <ul css={socialList}>
            <li>
              <a
                href='https://www.linkedin.com/company/locksbridgenet/'
                target='_blank'
                rel='noopener noreferrer'
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href='https://www.instagram.com/locksbridgenet/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href='https://facebook.com/locksbridgenet'
                target='_blank'
                rel='noopener noreferrer'
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href='https://www.youtube.com/channel/UC7r5NCAhHgqO-15PK2uaRdQ'
                target='_blank'
                rel='noopener noreferrer'
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};
export default Contact