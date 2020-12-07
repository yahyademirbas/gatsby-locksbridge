import React from 'react';
import styled from '@emotion/styled';

import { colors } from '../../styles';

export default function ArtistPageSlideNav({ title }) {
  const NavItem = styled.p`
    color: ${colors.tagGray};
    font-family: 'NB International Pro';
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 2px;
    line-height: 36px;
    text-align: center;
    text-transform: uppercase;
    padding-bottom: 10px;
  `;

  return (
    <NavItem className='slider-nav'>
      <span>{title}</span>
    </NavItem>
  );
}
