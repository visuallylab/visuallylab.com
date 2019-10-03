import styled from 'styled-components';

export default styled.h3<{ noBold?: boolean }>`
  margin-top: 0;
  letter-spacing: 1.2px;
  font-weight: ${p => (p.noBold ? '300' : '500')};
  font-size: ${p => p.theme.fontSize.big};
`;
