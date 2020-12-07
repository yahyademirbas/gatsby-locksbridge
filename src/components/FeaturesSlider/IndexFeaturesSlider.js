import React from "react";
import styled from "@emotion/styled";
import { a } from "springBeta";
import InfiniteSlider from "./Slider";
import items from "./items";

const Main = styled.div`
  height: 450px;
  width: 80%;
  margin: 0 auto;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
  cursor: url('https://github.com/chenglou/react-motion/raw/master/demos/demo8-draggable-list/cursor.png') 39 39, auto;

`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Image = styled(a.div)`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
`;

const MessageContainer = styled.div`
  position: absolute;
  display: flex;
  color: #fff;
  width: 100%;
  height: 100%;
`
const Message = styled.div`
  text-align: center;
  width: 100%;
  justify-self: center;
  background-color: transparent;
  align-self: center;
`


export default function FeaturesSlider() {
  const text = "asflasfl";
  return (
    <Main>
      <InfiniteSlider items={items}>
        {({ css }, i) => (
          <Content>
            <Image style={{ backgroundImage: css }} />
            <MessageContainer>
              <Message dangerouslySetInnerHTML={{ __html: text }} />
            </MessageContainer>
          </Content>
        )}
      </InfiniteSlider>
    </Main>
  );
}
