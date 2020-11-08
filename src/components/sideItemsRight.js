import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { fonts, mediaQueries } from '../styles';

const ItemsContainer = styled.div`
  position: fixed;
  display: none;
  flex-direction: column;
  right: 40px;
  bottom: 0;
  justify-content: center;
  align-items: center;
  mix-blend-mode: difference;

  ${mediaQueries.phoneLarge} {
    display: flex;
  }

  a {
    line-height: 0;
  }
`;

const Line = styled.div`
  height: 100px;
  width: 2px;
  background-color: white;
  margin-bottom: 15px;
`;

const Email = styled.p`
  writing-mode: vertical-rl;
  color: white;
  mix-blend-mode: difference;
  font-family: ${fonts.sans};
  margin-bottom: 15px;
`;

const SideItemsRight = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 1800);
  }, []);

  return (
    <TransitionGroup>
      {isMounted && (
        <CSSTransition classNames='fade' timeout={1000}>
          <ItemsContainer>
            <a href='mailto:cadekynaston@gmail.com'>
              <Email>cadekynaston@gmail.com</Email>
            </a>
            <Line />
          </ItemsContainer>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export default SideItemsRight;
