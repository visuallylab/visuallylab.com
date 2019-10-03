import styled from 'styled-components';
export default styled.button<{ color?: string }>`
  padding: 0.25em 0.5em;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid #666;
  font-weight: 100;
  font-size: 14px;
  color: ${p => p.color || p.theme.colors.smokyWhite};
  letter-spacing: 0.5x;
  transition: 0.05s;
  white-space: nowrap;
  pointer-events: auto;

  :focus {
    outline: 0;
  }

  :hover {
    transform: scale(1.15);
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
  }
  :active {
    color: whitesmoke;
    transform: scale(1.05);
  }
`;
