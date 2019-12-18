import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { getRelativePath } from '@/utils';
import Section from '../Section';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Description from '../Description';
import ContactUsButton from '../ContactUsButton';
import { useVideController } from '../../hooks/useVideController';
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
  background-color: rgba(0, 0, 0, 0.2);
`;

const StyledDescription = styled(Description)`
  max-width: 80%;
  ${media('pad')} {
    max-width: 50%;
  }
`;

const Traffic: React.FC = () => {
  const { isPlaying, container, player } = useVideController();
  const buttonStyle = useSpring({
    opacity: isPlaying ? 1 : 0,
    transform: isPlaying ? 'translateY(0px)' : 'translateY(30px)',
    config: { duration: 1000 },
    delay: 300,
  });
  return (
    <Section fullscreen ref={container} focus={isPlaying}>
      <ContentWrapper>
        <SubTitle focus={isPlaying}>自動化系統處理與回報</SubTitle>
        <Title focus={isPlaying}>
          即時動態分析
          <br />
          掌握最新狀況。
        </Title>
        <StyledDescription focus={isPlaying}>
          即時、動態式資料分析呈現，系統自動回報警示，協助企業在第一時間掌握情況。
        </StyledDescription>
        <animated.div style={buttonStyle}>
          <ContactUsButton />
        </animated.div>
      </ContentWrapper>
      <VideoWrapper playing={isPlaying}>
        {isPlaying && <Mask />}
        <Video
          ref={player}
          src={getRelativePath('/static/videos/traffic.mp4')}
          muted
        />
      </VideoWrapper>
    </Section>
  );
};

export default Traffic;
