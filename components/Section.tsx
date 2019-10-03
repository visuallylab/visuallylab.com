import styled from 'styled-components';

type TSectionProps = {
  row?: boolean;
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  justifyContent?: 'center' | 'flex-start' | 'flex-end';
  fullscreen?: boolean;
  focus?: boolean;
  src?: string;
};

export default styled.section<TSectionProps>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: ${({ row = false }) => (row ? 'row' : 'column')};
  justify-content: ${p => p.justifyContent || 'center'};
  align-items: ${p => p.alignItems || 'center'};
  height: ${p => (p.fullscreen ? '100vh' : 'initial')};
  overflow: ${p => (p.fullscreen ? 'hidden' : 'scroll')};
  transition: 0.5s;
  transform: ${props => (props.focus ? 'scale(1.05)' : 'inital')};
  ${p =>
    p.src &&
    `
    background: url(${p.src}) no-repeat center/cover;
  `}
  z-index: 1;
`;
