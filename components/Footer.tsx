import { FC } from 'react';
import styled from 'styled-components';
import Section from './Section';
import Title from './Title';
import SubTitle from './SubTitle';
import ContactUsButton from './ContactUsButton';
import { getRelativePath } from '@/utils';
import { media } from '@/utils/theme';
import ScrollAnimation from 'react-animate-on-scroll';

const StyledSection = styled(Section)`
  background-color: ${p => p.theme.backgroundColor};
  color: ${p => p.theme.colors.white};
`;

const StyledSubTitle = styled(SubTitle)`
  color: ${p => p.theme.colors.white};
`;

const Ul = styled.ul`
  margin-top: 3rem;
`;

const Li = styled(ScrollAnimation)`
  font-size: ${p => p.theme.fontSize.bigger};
  font-weight: 400;
  letter-spacing: 0.51px;
  padding: 0;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  border: solid 1px white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: 70%;
    height: 70%;
  }
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: -1;
`;

const Ball = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  ${media('desktop')} {
    width: 474px;
  }
`;

const Footer: FC<{ mode: 'light' | 'dark' }> = ({ mode }) => {
  const isLight = mode === 'light';
  return (
    <StyledSection
      fullscreen={true}
      as="footer"
      src={
        isLight ? getRelativePath('/static/images/bg-footer.jpg') : undefined
      }
    >
      {isLight && <Mask />}
      <ScrollAnimation animateIn="fadeInUp" style={{ textAlign: 'center' }}>
        <Title>我們期許自己打造的是更貼近人心的產品</Title>
        <StyledSubTitle>
          我們的技術將用來傳遞更多溫暖、更多價值，打造人性化的科技產品。
        </StyledSubTitle>
      </ScrollAnimation>
      <Ul>
        <Li animateIn="fadeInUp" delay={300}>
          <IconWrapper>
            <img src={getRelativePath('/static/images/home.svg')} />
          </IconWrapper>
          <p>台北市基隆路一段186號3樓之6</p>
        </Li>
        <Li animateIn="fadeInUp" delay={500}>
          <IconWrapper>
            <img src={getRelativePath('/static/images/mail.svg')} />
          </IconWrapper>
          <a href="contact@visuallylab.com">contact@visuallylab.com</a>
        </Li>
        <Li animateIn="fadeInUp" delay={700}>
          <IconWrapper>
            <img src={getRelativePath('/static/images/fb.svg')} />
          </IconWrapper>
          <a href="https://www.facebook.com/visuallylab/" target="_blank">
            @visuallylab
          </a>
        </Li>
      </Ul>
      <ScrollAnimation animateIn="fadeInUp" delay={800}>
        <ContactUsButton color="white" />
      </ScrollAnimation>
      {!isLight && (
        <Ball src={getRelativePath('/static/images/footer-ball.svg')} />
      )}
    </StyledSection>
  );
};

export default Footer;
