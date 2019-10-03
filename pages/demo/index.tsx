import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useContext, ComponentType } from 'react';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';

import DemoLayout from '@/layouts/Demo';
import { SITE_TITLE, i18nNamespace } from '@/constants';
import { ActionRouterContext } from '@/contexts/actionRouter';
import { TemplateType } from '@/constants/actionRouter';
import system, { SystemPage } from '@/constants/system';

const AnimatedWrapper = styled(animated.div)`
  width: 100%;
  height: 100%;
`;

const IntroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const getPage = (item: TemplateType) => {
  let Component: ComponentType<any>;
  switch (item) {
    default:
    case TemplateType.Home: {
      system.page = SystemPage.Home;
      Component = () => (
        // FIXME: change to home page
        <IntroWrapper>
          <h1>City Dashboard</h1>
          <p>Say: Hey Jarvis!</p>
        </IntroWrapper>
      );
      break;
    }
    case TemplateType.T_Realtime: {
      system.page = SystemPage.Traffic;
      Component = dynamic(() => import('@/components/demo/Traffic/Map'));
      break;
    }

    case TemplateType.E_Realtime: {
      system.page = SystemPage.Electricity;
      Component = dynamic(() =>
        import('@/components/demo/Electricity/Realtime'),
      );
      break;
    }
  }
  return ({ style }: any) => (
    <AnimatedWrapper style={style}>
      <Component />
    </AnimatedWrapper>
  );
};

const Demo: NextPage = () => {
  const { currentIndex, history } = useContext(ActionRouterContext);
  const transitions = useTransition(
    history[currentIndex].templateType,
    p => p,
    {
      from: { opacity: 0, transform: 'scale(0.8)' },
      enter: { opacity: 1, transform: 'scale(1)' },
      leave: { opacity: 0, transform: 'scale(0.9)' },
    },
  );

  return (
    <DemoLayout title={'Smart City Dashboard |' + SITE_TITLE}>
      {transitions.map(({ item, props, key }) => {
        const Page = getPage(item);
        return <Page key={key} style={props} />;
      })}
    </DemoLayout>
  );
};

Demo.getInitialProps = async () => ({
  namespacesRequired: Object.values(i18nNamespace),
});

export default Demo;
