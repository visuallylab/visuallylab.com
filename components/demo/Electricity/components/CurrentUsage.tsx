import { FC } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

const Title = styled.p`
  font-weight: 500;
  margin-bottom: 0.5em;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const AnimatedPercentNumber = styled(animated.p)`
  font-size: 4em;
  font-weight: 700;
  letter-spacing: 3px;
`;

const AnimatedNumber = styled(animated.span)`
  font-size: ${p => p.theme.fontSize.bigger};
  font-weight: 500;
  letter-spacing: 1px;
`;

const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const UsageTextWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate3d(-45%, 0, 0);
  bottom: 9%;
`;

const InfoWrapper = styled.div`
  position: absolute;
  left: 3%;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Info = styled.div`
  margin-bottom: 0.75em;
  > p {
    margin-bottom: 3px;
  }
`;

const Unit = styled.p`
  position: absolute;
  right: 5%;
  top: 5px;
  font-size: ${p => p.theme.fontSize.smaller};
`;

const COLORS = ['#59e2c2', '#9d9da0'];

type TProps = {
  pieHeight?: number;
  useValue: number;
  maxValue: number;
  estimateHighValue: number;
};

const CurrentUsage: FC<TProps> = ({
  useValue,
  maxValue,
  estimateHighValue,
  pieHeight,
}) => {
  const data = [
    { value: useValue, label: 'current usage' },
    { value: maxValue - useValue, label: 'left for limit' },
  ];
  const usage = (useValue / maxValue) * 100;

  const useValueProps = useSpring({
    number: useValue,
    from: {
      number: 0,
    },
  });

  const estimateHighValueProps = useSpring({
    number: estimateHighValue,
    from: {
      number: 0,
    },
  });

  const maxValueProps = useSpring({
    number: maxValue,
    from: {
      number: 0,
    },
  });

  const usageProps = useSpring({
    number: usage,
    from: {
      number: 0,
    },
  });

  const infoData = [
    {
      title: 'use',
      props: useValueProps,
    },
    {
      title: 'estimated high',
      props: estimateHighValueProps,
    },
    {
      title: 'max provide',
      props: maxValueProps,
    },
  ];

  return (
    <Wrapper>
      <Title>Current use:</Title>
      <ChartWrapper>
        <ResponsiveContainer width="100%" height={pieHeight}>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="90%"
              startAngle={180}
              endAngle={0}
              innerRadius="120%"
              outerRadius="150%"
              paddingAngle={0}
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <UsageTextWrapper>
          <AnimatedPercentNumber>
            {usageProps.number.interpolate(x => `${x.toFixed(0)}%`)}
          </AnimatedPercentNumber>
        </UsageTextWrapper>
        <InfoWrapper>
          {infoData.map(info => (
            <Info key={info.title}>
              <p>{info.title}</p>
              <AnimatedNumber>
                {info.props.number.interpolate(x => x.toFixed(0))}
              </AnimatedNumber>
            </Info>
          ))}
        </InfoWrapper>
        <Unit>( Unit: MW )</Unit>
        {/* TODO: Add estimated high pointer */}
      </ChartWrapper>
    </Wrapper>
  );
};

export default CurrentUsage;
