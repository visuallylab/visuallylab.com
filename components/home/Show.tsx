import styled from 'styled-components';
import Section from '@/components/Section';
import Title from '../Title';
import { getRelativePath } from '@/utils';
import { media } from '@/utils/theme';
import ContactUsButton from '../ContactUsButton';
import theme from '@/themes/theme';
import ScrollAnimation from 'react-animate-on-scroll';

const Wrapper = styled.div`
  position: relative;
  width: 92%;
  display: flex;
  flex-direction: column;

  ${media('desktop')} {
    width: 80%;
  }
`;

const StyledTitle = styled(Title)`
  margin-bottom: 2rem;
  background-image: ${p =>
    `linear-gradient(to right, ${p.theme.colors.primary}, #ffcc00)`};
  line-height: normal;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BG = styled.img`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
`;

const Show = () => {
  return (
    <Section alignItems="center" justifyContent="center" fullscreen={true}>
      <Wrapper>
        <ScrollAnimation animateIn="pulse" initiallyVisible={true}>
          <StyledTitle>
            資視科技擅長打造以「體驗」出發的核心應用。我們為您的產品客製化適合的解決方案。顯示精準資訊，讓您的產品一舉吸睛。
          </StyledTitle>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={500}>
          <ContactUsButton color={theme.colors.primary} />
        </ScrollAnimation>
      </Wrapper>
      <BG src={getRelativePath('/static/images/grey-ball.svg')} />
    </Section>
  );
};

export default Show;
