import styled from 'styled-components';
import ScrollAnimation from 'react-animate-on-scroll';
import Section from '@/components/Section';
import { getRelativePath } from '@/utils';
import { media } from '@/utils/theme';

const Logo = styled.img`
  height: 100%;
`;

const LogoWrapper = styled(ScrollAnimation)`
  height: 20%;

  ${media('pad')} {
    height: 25%;
  }
`;

const Title = styled.h1`
  margin: 2rem 0 1rem;
  font-size: 5rem;
  letter-spacing: 4px;
  font-weight: bold;
  background-image: ${p =>
    `linear-gradient(to right, ${p.theme.colors.primary}, #cfdef5);`};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-weight: 500;
  letter-spacing: 0.51px;
  font-size: ${p => p.theme.fontSize.big};
`;

const Bg = styled.img`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: -1;

  ${media('desktop')} {
    bottom: -5rem;
  }
`;

const Landing = () => {
  return (
    <Section justifyContent="center" alignItems="center" fullscreen={true}>
      <Bg src={getRelativePath('/static/images/bg-ball-stream.svg')} />
      <LogoWrapper animateIn="fadeInUp">
        <Logo src={getRelativePath('/static/images/home-logo-v.svg')} />
      </LogoWrapper>
      <ScrollAnimation
        style={{ width: '100%', textAlign: 'center' }}
        animateIn="fadeInUp"
        delay={400}
      >
        <Title>體驗，極致完美</Title>
      </ScrollAnimation>
      <ScrollAnimation
        style={{ width: '100%', textAlign: 'center' }}
        animateIn="fadeInUp"
        delay={600}
      >
        <Description>利用人工智能，改善資訊設計到產品體驗</Description>
      </ScrollAnimation>
    </Section>
  );
};

export default Landing;
