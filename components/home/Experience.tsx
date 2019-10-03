import styled from 'styled-components';
import Section from '@/components/Section';
import ContactUsButton from '@/components/ContactUsButton';
import { getRelativePath } from '@/utils';
import theme from '@/themes/theme';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Description from '../Description';
import ScrollAnimation from 'react-animate-on-scroll';

const Wrapper = styled.div`
  position: relative;
  width: 92%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSub = styled(SubTitle)`
  color: ${p => p.theme.colors.grey};
`;

const IdeaImg = styled.img`
  width: 40%;
  max-height: 50%;
`;

const InfoWrapper = styled.div`
  width: 60%;
  padding: 0 10px 0 10%;
`;

const Experience = () => {
  return (
    <Section justifyContent="center" alignItems="center" fullscreen={true}>
      <Wrapper>
        <IdeaImg src={getRelativePath('/static/images/idea.svg')} />
        <InfoWrapper>
          <ScrollAnimation animateIn="fadeInUp">
            <StyledSub>完善的使用體驗</StyledSub>
            <Title>
              注重每一個細節，
              <br />
              從裡到外完善使用體驗。
            </Title>
            <Description>
              規劃完資訊脈絡之後，我們會一起放到介面設計圖上討論，一起檢視我們的使用故事與流程，快速做出相對應原型，實際測試與體驗。讓您的產品再也不會有理不出頭緒的惱人設計。
            </Description>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" delay={300}>
            <ContactUsButton color={theme.colors.lightBlack} />
          </ScrollAnimation>
        </InfoWrapper>
      </Wrapper>
    </Section>
  );
};

export default Experience;
