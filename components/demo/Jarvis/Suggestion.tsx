import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { FC } from 'react';
import { iconMap } from '@/constants/icon';
import { SuggestionType, TJarvisSuggestion } from '@/contexts/jarvis';
import theme from '@/themes/theme';
import Button from '@/components/demo/Button';

const AnimatedWrapper = styled(animated.div)`
  width: 100%;
  margin-top: 1em;
  padding: 0 1em;

  &:first-child {
    margin-top: 0;
  }
`;

const TittleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Description = styled.div`
  opacity: 0.5;
  font-weight: 500;
  margin-bottom: 0.5em;
`;

const getSuggestionProps = (type: SuggestionType) => {
  let color = '';
  switch (type) {
    case SuggestionType.Info: {
      color = theme.colors.success;
      break;
    }
    case SuggestionType.Warning: {
      color = '#ffec3d';
      break;
    }
    case SuggestionType.Alert: {
      color = theme.colors.error;
      break;
    }
  }

  return { color };
};

type TProps = {
  item: TJarvisSuggestion;
};

const Suggestion: FC<TProps> = ({ item }) => {
  const { color } = getSuggestionProps(item.type);
  const Icon = iconMap[item.type];

  const props = useSpring({
    transform: 'translate3d(0, 0, 0)',
    opacity: 1,
    from: {
      transform: 'translate3d(100%, 0, 0)',
      opacity: 0,
    },
  });

  return (
    <AnimatedWrapper style={props}>
      <TittleWrapper>
        <Icon size="1.5em" color={color} style={{ marginRight: '.5em' }} />
        <p className="title">{item.title}</p>
      </TittleWrapper>
      <Description>{item.message}</Description>
      {item.button && (
        <Button onClick={item.button.onClick}>{item.button.text}</Button>
      )}
    </AnimatedWrapper>
  );
};

export default Suggestion;
