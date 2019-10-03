import ScrollAnimation from 'react-animate-on-scroll';
import { media } from '@/utils/theme';
import Section from '../Section';
import styled from 'styled-components';
import Title from '../Title';
import ContactUsButton from '../ContactUsButton';

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
  background-image: linear-gradient(to right, #2b670f, #ffcc00);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default () => (
  <Section fullscreen={true} alignItems="center" justifyContent="center">
    <Wrapper>
      <ScrollAnimation animateIn="pulse" initiallyVisible={true}>
        <StyledTitle>
          我們擅長把您的資料轉化成精準的視覺呈現，客製化您的情境圖表。並且開發「智慧商業決策系統」一鍵管理內部數據流，幫助傳統企業節省成本超過50%！
        </StyledTitle>
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeInUp" delay={500}>
        <ContactUsButton />
      </ScrollAnimation>
    </Wrapper>
  </Section>
);
