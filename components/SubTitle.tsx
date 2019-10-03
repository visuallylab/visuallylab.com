import styled, { css } from 'styled-components';
type TProps = {
  focus?: boolean;
};
export default styled.h3<TProps>`
  font-weight: 500;
  color: ${p => p.theme.colors.lightGrey};
  font-size: ${p => p.theme.fontSize.big};
  margin-top: 0;
  margin-bottom: 0.5rem;
  letter-spacing: 1.2px;
  transition: 1.5s;
  ${p =>
    p.focus !== undefined &&
    css`
      transform: ${p.focus ? 'translateY(0px)' : 'translateY(35px)'};
      opacity: ${p.focus ? '1' : '0'};
    `}
`;
