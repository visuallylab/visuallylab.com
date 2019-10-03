import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`;

const Bar = styled.div`
  width: 1px;
  height: 4rem;
  background: ${p => p.theme.colors.white};
  margin-top: 0.5em;
`;

const Text = styled.p`
  font-size: ${p => p.theme.fontSize.small};
`;

const ScrollInfo: FC = () => {
  return (
    <Wrapper>
      <Text>SCROLL</Text>
      <Bar />
    </Wrapper>
  );
};

export default ScrollInfo;
