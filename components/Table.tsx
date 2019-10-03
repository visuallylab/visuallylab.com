import styled from 'styled-components';

type TContainerProps = {
  width?: string;
  height?: string;
};

export const Container = styled.div<TContainerProps>`
  display: flex;
  justify-content: flex-start;
  width: ${p => p.width || '600px'};
  height: ${p => p.height || '300px'};
`;

type TRowProps = {
  count: number;
  alignItems?: 'center' | 'flex-start' | 'flex-end';
};

export const Row = styled.div<TRowProps>`
  display: flex;
  align-items: ${p => p.alignItems || 'center'};
  justify-content: flex-start;
  height: ${p => `calc(100%/${p.count})`};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-right: 2em;
`;

export default {
  Container,
  Row,
  Column,
};
