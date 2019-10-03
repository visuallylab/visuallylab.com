import styled, { css } from 'styled-components';

type TProps = {
  focus?: boolean;
};

export default styled.h2<TProps>`
  will-change: transform;
  font-size: 3rem;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 1rem;
  letter-spacing: 2.4px;
  line-height: 1.3;
  transition: 1.5s 0.2s;
  ${p =>
    p.focus !== undefined &&
    css`
      transform: ${p.focus ? 'translateY(0px)' : 'translateY(45px)'};
      opacity: ${p.focus ? '1' : '0'};
    `}
`;
