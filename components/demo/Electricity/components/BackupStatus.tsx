import { FC } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { FaBolt } from 'react-icons/fa';

import theme from '@/themes/theme';

const Title = styled.p`
  font-weight: 500;
  margin-bottom: 0.5em;
`;

const Wrapper = styled.div``;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Ratio = styled(animated.p)`
  font-weight: 700;
  font-size: 4em;
  letter-spacing: 2px;
  margin-left: 10px;
`;

const StatusText = styled(animated.span)`
  font-size: ${p => p.theme.fontSize.bigger};
  color: ${p => p.color};
  letter-spacing: 1px;
  margin-top: 5px;
`;

const BackupStatus: FC<{ value: number; lastHigh: number }> = ({
  value,
  lastHigh,
}) => {
  let statusText = '';
  let color = '';
  const ratio = (value / lastHigh) * 100;

  if (ratio >= 10) {
    statusText = 'SUPPLY GREAT';
    color = '#59e2c2';
  } else if (ratio < 10 && ratio > 6) {
    statusText = 'SUPPLY TIGHT';
    color = theme.colors.warning;
  } else if (ratio <= 6) {
    statusText = 'WARNING';
    color = theme.colors.error;
  }
  const props = useSpring({ number: ratio, color, from: { number: 0 } });

  return (
    <Wrapper>
      <Title>Backup status:</Title>
      <div style={{ textAlign: 'center' }}>
        <StatusWrapper>
          <FaBolt
            style={{ marginRight: '.25em', marginTop: '3px', color }}
            size="3.5em"
          />
          <Ratio style={{ color: props.color }}>
            {props.number.interpolate(x => `${Number(x).toFixed(1)}%`)}
          </Ratio>
        </StatusWrapper>
        <StatusText style={{ color: props.color }}>( {statusText} )</StatusText>
      </div>
    </Wrapper>
  );
};

export default BackupStatus;
