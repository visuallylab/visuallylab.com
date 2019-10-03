import { FC, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import H1 from '@/components/demo/H1';
import { createCurrentData, MAX_PROVIDE } from '@/utils/electricity';
import UsageBox from './UsageBox';
import PowerBox from './PowerBox';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  padding: 1em 4%;
`;

const Title = styled(H1)`
  margin: 0 0.5em 0.75em;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: cenetr;
  justify-content: space-between;
  height: 90%;
`;

const currentData = createCurrentData();

const Realtime: FC = () => {
  const timer = useRef<number>(0);
  const [data, setData] = useState(currentData);

  useEffect(() => {
    const updateData = () => {
      setData(d => {
        const hours = d.hours;
        const current = { ...d.energyData[d.energyData.length - 1].energy };

        const hour = dayjs().hour();
        const minute = dayjs().minute();
        const sec = dayjs().second();
        if (hours.length === 0 || hours[hours.length - 1] !== hour) {
          hours.push(hour);
        }

        let random = 0;

        random = Math.floor(Math.random() * 100);

        if (random % 2) {
          Object.keys(current).forEach(key => {
            // @ts-ignore
            Object.keys(current[key].data).forEach(k => {
              // @ts-ignore
              current[key].data[k] += Math.random() * 5;
            });
          });
        } else {
          Object.keys(current).forEach(key => {
            // @ts-ignore
            Object.keys(current[key].data).forEach(k => {
              // @ts-ignore
              current[key].data[k] -= Math.random() * 2;
            });
          });
        }

        const total = Object.values(current).reduce(
          (acc, cur) =>
            acc + Object.values(cur.data).reduce((a, c) => a + c, 0),
          0,
        );

        const estimatedHigh = total + random;

        const usageData = [...d.usageData];
        const energyData = [...d.energyData];
        const hourStr = hour < 10 ? `0${hour}` : String(hour);
        const minStr = minute < 10 ? `0${minute}` : String(minute);
        const secStr = sec < 10 ? `0${sec}` : String(sec);
        usageData.push({
          hour,
          minute,
          sec,
          useValue: total,
          estimatedHigh,
          maxProvide: MAX_PROVIDE,
          backupCapacity: MAX_PROVIDE - estimatedHigh,
          hourStr,
          minStr,
          secStr,
        });
        energyData.push({
          hour,
          minute,
          sec,
          energy: current,
          total,
          hourStr,
          minStr,
          secStr,
        });
        return {
          hours,
          usageData,
          energyData,
        };
      });
      timer.current = setTimeout(updateData, 3000);
    };

    timer.current = setTimeout(updateData, 5000);
  }, []);
  return (
    <Wrapper>
      <Title>Electricity Dashboard</Title>
      <ContentWrapper>
        <UsageBox width="47%" data={data.usageData} hours={data.hours} />
        <PowerBox width="47%" data={data.energyData} hours={data.hours} />
      </ContentWrapper>
    </Wrapper>
  );
};

export default Realtime;
