import styled from 'styled-components';

type TProps = {
  left: number;
  top: number;
};

const Tooltip = styled.div<TProps>`
  left: ${props => `${props.left}px`};
  top: ${props => `${props.top}px`};
  pointer-events: none;
  position: absolute;
  z-index: 9px;
  font-size: 12px;
  padding: 8px;
  background: #000;
  color: #fff;
  width: auto;
  max-height: 240px;
  overflow-y: hidden;
`;

export default Tooltip;
