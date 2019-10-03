import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import useScrollOnElement from '@/hooks/useScrollOnElement';
import Section from '@/components/Section';
import ContactUsButton from '@/components/ContactUsButton';
import { getRelativePath } from '@/utils';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Description from '../Description';

const Wrapper = styled.div<{ src: string; focus: boolean }>`
  position: relative;
  width: ${p => (p.focus ? '100%' : '92%')};
  height: ${p => (p.focus ? '100%' : '90%')};
  background: url(${p => p.src}) no-repeat center/cover;
  color: white;
  transition: all 0.5s linear;
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const InfoWrapper = styled.div`
  will-change: transform;
  position: absolute;
  width: 50%;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
`;

const Design = () => {
  const { elementRef, isScrolledOn } = useScrollOnElement();
  const buttonStyle = useSpring({
    opacity: isScrolledOn ? 1 : 0,
    transform: isScrolledOn ? 'translateY(0px)' : 'translateY(30px)',
    config: { duration: 1000 },
    delay: 300,
  });
  return (
    <Section
      ref={elementRef}
      justifyContent="center"
      alignItems="center"
      fullscreen={true}
    >
      <Wrapper
        src={getRelativePath('/static/images/bg-design.jpg')}
        focus={isScrolledOn}
      >
        <Mask />
        <InfoWrapper>
          <SubTitle focus={isScrolledOn}>資訊脈絡設計</SubTitle>
          <Title focus={isScrolledOn}>
            規劃資訊脈絡圖，
            <br />
            幫助您精準呈現訊息。
          </Title>
          <Description focus={isScrolledOn}>
            討論前期，我們將會與您一起思考，確定策略與目標客群。然後以此基礎來規劃、構思產品的資訊脈絡圖，清楚了解每一項設計與產品的邏輯脈絡。精準呈現所有必要資訊。
          </Description>
          <animated.div style={buttonStyle}>
            <ContactUsButton />
          </animated.div>
        </InfoWrapper>
      </Wrapper>
    </Section>
  );
};

export default Design;
