import { FC } from 'react';
import styled from 'styled-components';

import theme from '@/themes/theme';
import { iconMap } from '@/constants/icon';

import EnergyBar from './EnergyBar';

const Title = styled.p`
  font-weight: 500;
  margin-bottom: 0.5em;
`;

const Wrapper = styled.div`
  margin: 0.5em 0 1em;
`;

const EnergyIcon = styled.div<{ color: string }>`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate3d(-175%, -50%, 0);
  display: flex;
  align-items: center;
  justify-content: center;
`;

type TProps = {
  data: TEnergy;
  total: number;
};

const greenKeys: Array<keyof TEnergy['green']['data']> = [
  'wind',
  'solar',
  'hydro',
  'coGen',
];
const fireKeys: Array<keyof TEnergy['fire']['data']> = ['coal', 'lng', 'oil'];
const nuclearKeys: Array<keyof TEnergy['nuclear']['data']> = [
  'nuclear1',
  'nuclear2',
];

const energyKeys: Array<keyof TEnergy> = ['green', 'fire', 'nuclear'];

const getEnergyProps = (energyKey: keyof TEnergy, data: any) => {
  let keys: string[] = [];
  let color: string = '';
  switch (energyKey) {
    case 'green': {
      keys = greenKeys;
      color = theme.colors.success;
      break;
    }
    case 'fire': {
      keys = fireKeys;
      color = theme.colors.warning;
      break;
    }
    case 'nuclear': {
      keys = nuclearKeys;
      color = theme.colors.error;
      break;
    }
  }

  return {
    color,
    data: keys.map(key => ({
      key,
      name: key,
      value: data[key],
    })),
  };
};

const EnergyStatus: FC<TProps> = ({ data, total }) => {
  return (
    <Wrapper>
      <Title>Energy generated</Title>
      <div style={{ width: '100%' }}>
        {energyKeys.map(key => {
          const IconComponent = iconMap[key];
          const { data: energyData, color } = getEnergyProps(
            key,
            data[key].data,
          );
          return (
            <EnergyBar
              key={key}
              color={color}
              total={total}
              goal={data[key].goal}
              data={energyData}
              Icon={
                <EnergyIcon color={color}>
                  <IconComponent color={color} size="2.5em" />
                </EnergyIcon>
              }
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default EnergyStatus;
