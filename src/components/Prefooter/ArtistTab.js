/* eslint-disable prefer-template, no-else-return */
import styled from '@emotion/styled';

import { weights, mediaQueries } from '../../styles';

const ArtistTab = styled.span`
  display: flex;
  margin: 0;
  padding: 20px 10px;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  background-color: ${props => props.backgroundColor};
  background-size: cover;
  background-position: center;

  ${mediaQueries.phoneLarge} {
    justify-content: center;
  }

  h3 {
    margin-bottom: 28px;
    font-size: 22px;
    font-weight: ${weights.medium};
    letter-spacing: -0.2px;
    line-height: 1.375;

    ${mediaQueries.phoneLarge} {
      font-size: 22px;
      margin-bottom: 0;
      font-weight: ${weights.bold};
    }
  }
`;

export default ArtistTab;
