import { useVideController } from '@/hooks/useVideController';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import Section from '../Section';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Description from '../Description';
import ContactUsButton from '../ContactUsButton';
import Video from './Video';
import { media } from '@/utils/theme';

const ContentWrapper = styled.div`
  position: relative;
  width: 92%;
  padding-left: 4rem;
  margin-bottom: 10%;
  z-index: 1;
  ${media('desktop')} {
    margin-bottom: 0;
  }
`;

const VideoWrapper = styled.div<{ playing: boolean }>`
  position: relative;
  width: ${p => (p.playing ? '100%' : '92%')};
  ${media('desktop')} {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    transition: width 1.5s linear;
    z-index: 0;
  }
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const StyledDescription = styled(Description)`
  max-width: 80%;
  ${media('pad')} {
    max-width: 50%;
  }
`;

const Solutions: React.FC = () => {
  const { isPlaying, container, player } = useVideController();
  const buttonStyle = useSpring({
    opacity: isPlaying ? 1 : 0,
    transform: isPlaying ? 'translateY(0px)' : 'translateY(30px)',
    config: { duration: 1000 },
    delay: 300,
  });
  return (
    <Section
      style={{ minHeight: '100vh', height: 'auto' }}
      ref={container}
      focus={isPlaying}
    >
      <ContentWrapper>
        <SubTitle focus={isPlaying}>語音智能助理</SubTitle>
        <Title focus={isPlaying}>語音解決方案：Hey! Jarvis!</Title>
        <StyledDescription focus={isPlaying}>
          透過語音掌控你的所有動作與決策看板，不再需要動手指。一切皆在幾句話之間完成所有操作。
        </StyledDescription>
        <animated.div style={buttonStyle}>
          <ContactUsButton />
        </animated.div>
      </ContentWrapper>
      <VideoWrapper playing={isPlaying}>
        <Mask />
        <Video src="/static/videos/jarvis.mp4" muted ref={player} />
      </VideoWrapper>
    </Section>
  );
};

export default Solutions;
