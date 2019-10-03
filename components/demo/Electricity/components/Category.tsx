import styled from 'styled-components';
import { FC } from 'react';

import theme from '@/themes/theme';
import { iconMap } from '@/constants/icon';
import { animated, useSpring } from 'react-spring';

const Content = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
`;

const CategoryName = styled.p`
  font-size: ${p => p.theme.fontSize.small};
  margin-bottom: 5px;
`;

export type TCategory = {
  key: string;
  value: number;
  name: string;
};

type TProps = {
  item: TCategory;
  data: number;
};

const Category: FC<TProps> = ({ item, data }) => {
  const Icon = iconMap[item.key];
  const props = useSpring({
    number: data,
    from: {
      number: 0,
    },
  });
  return (
    <div style={{ width: '25%' }}>
      <CategoryName>{item.name}</CategoryName>
      <Content color={'green'}>
        {Icon && (
          <Icon
            color={theme.colors.smokyWhite}
            size="1.5em"
            style={{ marginRight: '.5em' }}
          />
        )}
        <animated.p>
          {props.number.interpolate(x => `${x.toFixed(1)}%`)}
        </animated.p>
      </Content>
    </div>
  );
};

export default Category;
