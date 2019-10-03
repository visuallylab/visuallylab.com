import { FC } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

import H3 from '@/components/demo/H3';

import { TData } from '../UsageBox';

type TItemProps = { itemKey: keyof TData; item: TData };

const AnimatedUsage = styled(animated.div)`
  font-size: 3.5em;
  font-weight: bold;
`;

const Icon = styled.img`
  width: 3em;
`;

const Item: FC<TItemProps> = ({ itemKey, item }) => {
  const data = item[itemKey];
  const props = useSpring({
    number: typeof data === 'number' ? data : 0,
    from: {
      number: 0,
    },
  });

  switch (itemKey) {
    case 'iconUri': {
      return <Icon src={data as string} />;
    }
    case 'title': {
      return <H3>{data}</H3>;
    }
    case 'ratio': {
      return (
        <AnimatedUsage>
          {props.number.interpolate(x => `${x.toFixed(0)}%`)}
        </AnimatedUsage>
      );
    }
    case 'value': {
      return (
        <animated.div>
          {props.number.interpolate(x => `${x.toFixed(0)} MW`)}
        </animated.div>
      );
    }
    default:
      return null;
  }
};

export default Item;
