import { FC } from 'react';
import styled from 'styled-components';
import { LineProps } from 'recharts';

import FloatingBox from '@/components/FloatingBox';

import BackupStatus from './components/BackupStatus';
import UsageLinechart from './components/Linechart';
import CurrentUsage from './components/CurrentUsage';

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

const renderTooltip = (d: TUsageData) => {
  return (
    <TooltipWrapper>
      <div className="control">
        <p>
          {d.hourStr}:{d.minStr}:{d.secStr}
        </p>
        <p>(MW)</p>
      </div>
      <div className="control">
        <p>(Max: {d.maxProvide})</p>
      </div>

      {[
        { key: 'useValue', name: 'Use' },
        { key: 'backupCapacity', name: 'Backup' },
      ].map(o => {
        // @ts-ignore
        const value = Math.round(d[o.key]);
        return (
          <p key={o.key}>
            {o.name}: {value}
          </p>
        );
      })}
    </TooltipWrapper>
  );
};

export type TData = {
  iconUri: string;
  title: string;
  value: number;
  ratio: number;
};

type TProps = {
  width?: string;
  data: TUsageData[];
  hours: number[];
};

const lines: LineProps[] = [
  {
    dataKey: 'useValue',
    stroke: 'rgb(127, 222, 195)',
    dot: false,
    name: 'usage value',
  },
  {
    dataKey: 'maxProvide',
    stroke: '#fff',
    dot: false,
    name: 'max provide',
  },
  {
    dataKey: 'backupCapacity',
    stroke: 'rgb(244, 228, 94)',
    dot: false,
    name: 'backup capacity',
  },
];

const UsageBox: FC<TProps> = ({ width, data, hours }) => {
  const latestData = data[data.length - 1];

  return (
    <FloatingBox width={width}>
      <BackupStatus value={latestData.backupCapacity} lastHigh={3885} />
      <CurrentUsage
        useValue={latestData.useValue}
        maxValue={latestData.maxProvide}
        estimateHighValue={latestData.estimatedHigh}
        pieHeight={200}
      />
      <UsageLinechart
        data={data}
        hours={hours}
        lines={lines}
        renderTooltip={renderTooltip}
      />
    </FloatingBox>
  );
};

export default UsageBox;
