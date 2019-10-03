import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineProps,
  Legend,
} from 'recharts';
import { FC } from 'react';

export type TEnergyLineData = {
  hour: number;
  minute: number;
  sec: number;
  hourStr: string;
  minStr: string;
  secStr: string;
  green: number;
  fire: number;
  nuclear: number;
};

type TProps = {
  hours: number[];
  data: TUsageData[] | TEnergyLineData[];
  lines: LineProps[];
  renderTooltip?: (d: any) => React.ReactNode;
};

const UsageLinechart: FC<TProps> = ({ data, hours, lines, renderTooltip }) => {
  return (
    <ResponsiveContainer width="100%" height="35%">
      <LineChart
        data={data}
        margin={{
          top: 0,
          right: 20,
          left: 20,
          bottom: 0,
        }}
      >
        {/* <YAxis /> */}
        <XAxis dataKey="hour" ticks={hours} />
        {renderTooltip && (
          <Tooltip
            content={(src: any) => {
              if (!src.payload.length) {
                return null;
              }
              const d = src.payload[0].payload;
              return renderTooltip(d);
            }}
          />
        )}
        {lines.map(props => (
          <Line key={props.dataKey.toString()} {...props} />
        ))}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UsageLinechart;
