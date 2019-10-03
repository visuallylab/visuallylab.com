import styled from 'styled-components';

type TButtonProps = {
  outline?: boolean;
  color?: string;
};

export default styled.button<TButtonProps>`
  cursor: pointer;
  min-width: 7rem;
  padding: 0.5em;
  border-radius: 30px;
  background-color: ${p => p.color || p.theme.colors.primary};
  color: ${p => p.theme.colors.white};
  font-weight: 400;
  letter-spacing: 0.51px;
  transition: all 0.1s linear;
  white-space: nowrap;
  pointer-events: auto;

  &:hover {
    opacity: 0.95;
  }

  &:active {
    transform: scale(1.05);
  }

  ${p => {
    const color = p.color ? p.color : 'inherit';
    return (
      p.outline &&
      `
      border: solid 1px;
      border-color: ${color};
      background-color: transparent;
      color: ${color};
      :hover {
        background-color: ${color};
        color: ${
          p.color === 'white' ? p.theme.colors.lightBlack : p.theme.colors.white
        };
      }
    `
    );
  }}
`;
