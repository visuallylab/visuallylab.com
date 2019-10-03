import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { FC } from 'react';

const Wrapper = styled(animated.div)<{ width?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${p => p.width || '100%'};
  background-color: ${p => p.theme.colors.boxBackground};
  border-radius: ${p => p.theme.borderRadius};
  border: solid 1px ${p => p.theme.colors.boxBorder};
  box-shadow: 0px 0px 5px 0px rgba(255, 255, 255, 0.1) inset;
  padding: 0.5em 1em;
`;

type TProps = {
  width?: string;
};

const FloatingBox: FC<TProps> = ({ children, width }) => {
  const props = useSpring({
    transform: 'scale3d(1,1,1)',
    opacity: 1,
    from: {
      transform: 'scale3d(0.65, 0.65, 0.65)',
      opacity: 0,
    },
  });
  return (
    <Wrapper width={width} style={props}>
      {children}
    </Wrapper>
  );
};

export default FloatingBox;
