import styled from 'styled-components';
import Section from '@/components/Section';
import Title from '../Title';
import { getRelativePath } from '@/utils';
import { useRef, useEffect, useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const Wrapper = styled.div`
  width: 92%;
  height: calc(100% - 10rem);
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled(Title)`
  margin-top: 1rem;
  text-align: center;
`;

const ImageWrapper = styled.div`
  height: 100%;
  position: relative;
`;

const Img = styled.img`
  height: 100%;
`;

const DeskWrapper = styled(ScrollAnimation)<{ width: number }>`
  position: absolute;
  left: ${p => (p.width ? `calc(50% - ${p.width / 2}px)` : '50%')};
  height: 100%;
  bottom: 0;
  transform: translateX(-50%);
`;

const PhoneWrapper = styled(ScrollAnimation)<{ x: number }>`
  position: absolute;
  bottom: 0;
  left: ${p => (p.x ? `${p.x - 50}px` : '15%')};
  height: 50%;
  transform: translateX(-50%);
`;

const TabWrapper = styled(ScrollAnimation)<{ x: number }>`
  position: absolute;
  bottom: 0;
  height: 70%;
  left: ${p => (p.x ? `${p.x}px` : '80%')};
  transform: translateX(-50%);
`;

const Platform = () => {
  const desktopRef = useRef<HTMLImageElement | null>(null);
  const tabRef = useRef<HTMLImageElement | null>(null);
  const phoneRef = useRef<HTMLImageElement | null>(null);
  const [position, setPosition] = useState({
    desktopWidth: 0,
    phoneX: 0,
    tabX: 0,
  });

  useEffect(() => {
    const handlePosition = () => {
      if (desktopRef.current && phoneRef.current && tabRef.current) {
        setPosition({
          desktopWidth: desktopRef.current.offsetWidth,
          phoneX:
            desktopRef.current.getBoundingClientRect().left -
            phoneRef.current.offsetWidth / 2,
          tabX:
            desktopRef.current.getBoundingClientRect().right -
            tabRef.current.offsetWidth / 2,
        });
      }
    };
    handlePosition();
    window.addEventListener('resize', handlePosition);
    return () => {
      window.removeEventListener('resize', handlePosition);
    };
  }, []);

  return (
    <Section alignItems="center" justifyContent="center" fullscreen={true}>
      <Wrapper>
        <ScrollAnimation animateIn="fadeInUp">
          <StyledTitle>
            跨平台、全適應裝置應用
            <br />
            讓您的產品隨心所欲地發布
          </StyledTitle>
        </ScrollAnimation>
        <ImageWrapper>
          <DeskWrapper
            animateIn="fadeInUp"
            width={position.desktopWidth}
            delay={400}
          >
            <Img
              ref={desktopRef}
              src={getRelativePath('/static/images/desktop.png')}
            />
          </DeskWrapper>
          <PhoneWrapper animateIn="fadeInLeft" x={position.phoneX} delay={500}>
            <Img
              ref={phoneRef}
              src={getRelativePath('/static/images/phone.png')}
            />
          </PhoneWrapper>
          <TabWrapper x={position.tabX} animateIn="fadeInRight" delay={500}>
            <Img ref={tabRef} src={getRelativePath('/static/images/tab.png')} />
          </TabWrapper>
        </ImageWrapper>
      </Wrapper>
    </Section>
  );
};

export default Platform;
