import {
  LineChart as RechartLineChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { i18nNamespace } from '@/constants';

type TProps = {
  data: Array<{ time: string; value: number }>;
};

const LineChart: React.FC<TProps> = React.memo(({ data }) => {
  const { t } = useTranslation(i18nNamespace.TrafficMap);
  return (
    <ResponsiveContainer width="90%">
      <RechartLineChart
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <Legend verticalAlign="top" height={36} />
        <XAxis
          dataKey="time"
          interval={2}
          padding={{ right: 60, left: 0 }}
          stroke="#fff"
        />
        <YAxis
          domain={[0, dataMax => Math.round(dataMax * 1.3)]}
          stroke="#fff"
        />
        <ReferenceLine
          x={data.slice().sort((a, b) => b.value - a.value)[1].time}
          stroke="red"
          label={({ viewBox: { x, y }, offset }) => (
            <text x={x} y={y - offset} fill="red" textAnchor="middle">
              {t('chart.accidentLabel')}
            </text>
          )}
        />
        <Line
          name={t('chart.legend') as string}
          type="monotone"
          dataKey="value"
          stroke="white"
        >
          {/* 
      // @ts-ignore */}
          <LabelList
            position="top"
            valueAccessor={(_, index) =>
              index === data.length - 1 ? data[data.length - 1].value : ''
            }
            content={({ y, value }) => (
              <text
                x="100%"
                y={y ? y - 10 : 0}
                fill="rgb(0, 217, 255)"
                fontSize={60}
                textAnchor="end"
                alignmentBaseline="baseline"
              >
                {value}
              </text>
            )}
          />
        </Line>
      </RechartLineChart>
    </ResponsiveContainer>
  );
});

export default LineChart;
