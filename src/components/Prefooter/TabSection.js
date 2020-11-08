import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { mediaQueries } from '../../styles';

const TabSection = ({
  children,
  gridTemplateColumns,
  gridColumnGap,
  ...props
}) => (
  <div
    {...props}
    css={css`
      ${mediaQueries.phoneLarge} {
        display: grid;
        grid-template-columns: ${gridTemplateColumns};
        grid-column-gap: ${gridColumnGap};
        justify-content: space-between;
        width: 100%;
      }
    `}
  >
    {children}
  </div>
);

TabSection.propTypes = {
  gridTemplateColumns: PropTypes.string,
  gridColumnGap: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

TabSection.defaultProps = {
  gridTemplateColumns: '25% 25% 25% 25%',
  gridColumnGap: 'inherit',
};

export default TabSection;
