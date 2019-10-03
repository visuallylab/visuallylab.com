import { FC } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
import { GiTrumpetFlag, GiPirateFlag } from 'react-icons/gi';

import theme from '@/themes/theme';

import Category, { TCategory } from './Category';

const OuterWrapper = styled.div`
  width: 100%;
  padding-top: 1em;

  &:first-child {
    padding-top: 0;
  }
`;

const InnerWrapper = styled.div`
  width: 80%;
  margin-left: 15%;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 2em;
  background-color: ${p => p.theme.colors.spaceGray};
  border-radius: 4px;
  margin: 0.5em 0;
`;

const InnerBar = styled(animated.div)<{ color: string }>`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  height: 100%;
  background-color: ${p => p.color};
  margin-right: 1em;
`;

const AnimatedNumber = styled(animated.p)`
  font-weight: 500;
`;

const Goal = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Total = styled(Goal)`
  white-space: no-wrap;
  font-size: ${p => p.theme.fontSize.small};
`;

const GoalFlag = styled.div<{ left: string }>`
  position: absolute;
  left: ${p => p.left};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: translate3d(-50%, -85%, 0);

  > div {
    margin-top: 3px;
    width: 2px;
    height: 0.75em;
    background: ${theme.colors.smokyWhite};
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1em;
`;

type TProps = {
  color: string;
  data: TCategory[];
  total: number;
  Icon: React.ReactNode;
  goal: {
    value: number;
    more: boolean;
  };
};

const EnergyBar: FC<TProps> = ({ data, goal, Icon, total, color }) => {
  const energyTotal = data.reduce((acc, cur) => acc + cur.value, 0);
  const percent = Math.round((energyTotal / total) * 1000) / 10;
  const widthProps = useSpring({
    width: percent,
    from: {
      width: 0,
    },
  });

  const width = widthProps.width.interpolate(x => `${Number(x).toFixed(1)}%`);
  const GoalComponent = goal.more ? GiTrumpetFlag : GiPirateFlag;
  return (
    <OuterWrapper>
      <InnerWrapper>
        <Goal>
          <p>
            Goal: {goal.more ? '>' : '<'} {`${goal.value}%`}
          </p>
        </Goal>
        <Box>
          <InnerBar style={{ width }} color={color} />
          <AnimatedNumber>{width}</AnimatedNumber>
          <GoalFlag left={`${goal.value}%`}>
            <GoalComponent
              color={
                percent > goal.value
                  ? theme.colors.smokyWhite
                  : theme.colors.spaceGray
              }
              size="1.5em"
            />
            <div />
          </GoalFlag>
          {Icon}
        </Box>
        <Total>
          <p>{Math.round(energyTotal)} MW</p>
        </Total>
        <CategoryWrapper>
          {data.map(d => {
            const categoryPercent = Math.round((d.value / total) * 1000) / 10;
            return <Category key={d.name} item={d} data={categoryPercent} />;
          })}
        </CategoryWrapper>
      </InnerWrapper>
    </OuterWrapper>
  );
};

export default EnergyBar;
