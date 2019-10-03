import styled, { css } from 'styled-components';

type TProps = {
  focus?: boolean;
};

export default styled.p<TProps>`
  font-size: ${p => p.theme.fontSize.big};
  letter-spacing: 1px;
  line-height: normal;
  transition: 1.5s 0.4s;
  ${p =>
    p.focus !== undefined &&
    css`
      transform: ${p.focus ? 'translateY(0px)' : 'translateY(55px)'};
      opacity: ${p.focus ? '1' : '0'};
    `}
`;
