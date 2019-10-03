import { FC } from 'react';
import styled from 'styled-components';
import { LineProps } from 'recharts';
import theme from '@/themes/theme';
import FloatingBox from '@/components/FloatingBox';

import EnergyStatus from './components/EnergyStatus';
import Linechart, { TEnergyLineData } from './components/Linechart';

type TProps = {
  width?: string;
  data: TEnergyData[];
  hours: number[];
};

const lines: LineProps[] = [
  {
    dataKey: 'green',
    stroke: theme.colors.success,
    dot: false,
    name: 'green',
  },
  {
    dataKey: 'nuclear',
    stroke: theme.colors.error,
    dot: false,
    name: 'nuclear',
  },
  {
    dataKey: 'fire',
    stroke: theme.colors.warning,
    dot: false,
    name: 'fire',
  },
];

const TooltipWrapper = styled.div`
  padding: 1em 0.5em;
  font-size: ${p => p.theme.fontSize.smaller};
  border-radius: ${p => p.theme.borderRadius};
  background: ${p => p.theme.colors.spaceGray};
  display: flex;
  flex-direction: column;
  justify-content: center;

  > p {
    letter-spacing: 1.5px;
    margin-bottom: 5px;
  }

  > .control {
    color: ${p => p.theme.colors.unused};
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: ${p => p.theme.fontSize.small};
  }
`;

const renderTooltip = (d: TEnergyLineData) => {
  return (
    <TooltipWrapper>
      <div className="control">
        <p>
          {d.hourStr}:{d.minStr}:{d.secStr}
        </p>
        <p>(MW)</p>
      </div>
      {['Green', 'Fire', 'Nuclear'].map(k => {
        // @ts-ignore
        const value = Math.round(d[k.toLowerCase()]);
        return (
          <p key={k}>
            {k}: {value}
          </p>
        );
      })}
    </TooltipWrapper>
  );
};

const PowerBox: FC<TProps> = ({ width, data, hours }) => {
  const latestEnergy = data[data.length - 1];

  const lineChartData: TEnergyLineData[] = data.map(d => {
    const green = Object.values(d.energy.green.data).reduce(
      (acc, cur) => acc + cur,
      0,
    );
    const fire = Object.values(d.energy.fire.data).reduce(
      (acc, cur) => acc + cur,
      0,
    );
    const nuclear = Object.values(d.energy.nuclear.data).reduce(
      (acc, cur) => acc + cur,
      0,
    );

    return {
      hour: d.hour,
      minute: d.minute,
      sec: d.sec,
      hourStr: d.hourStr,
      minStr: d.minStr,
      secStr: d.secStr,
      green,
      fire,
      nuclear,
    };
  });

  return (
    <FloatingBox width={width}>
      <EnergyStatus data={latestEnergy.energy} total={latestEnergy.total} />
      <Linechart
        data={lineChartData}
        hours={hours}
        lines={lines}
        renderTooltip={renderTooltip}
      />
    </FloatingBox>
  );
};

export default PowerBox;
