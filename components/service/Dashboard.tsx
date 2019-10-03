import { useSpring, animated } from 'react-spring';
import { useVideController } from '@/hooks/useVideController';
import styled from 'styled-components';
import Section from '../Section';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Description from '../Description';
import ContactUsButton from '../ContactUsButton';
import Video from './Video';

const ContentWrapper = styled.div`
  position: relative;
  width: 92%;
  padding-left: 50%;
`;

const VideoWrapper = styled.div<{ playing: boolean }>`
  position: absolute;
  width: ${p => (p.playing ? '100%' : '92%')};
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  transition: width 1.5s linear;
  z-index: 0;
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.35);
`;

const StyledDescription = styled(Description)`
  max-width: 90%;
`;

const Dashboard: React.FC = () => {
  const { isPlaying, container, player } = useVideController();
  const buttonStyle = useSpring({
    opacity: isPlaying ? 1 : 0,
    transform: isPlaying ? 'translateY(0px)' : 'translateY(30px)',
    config: { duration: 1000 },
    delay: 300,
  });
  return (
    <Section fullscreen={true} ref={container} focus={isPlaying}>
      <VideoWrapper playing={isPlaying}>
        {isPlaying && <Mask />}
        <Video ref={player} src="/static/videos/dashboard.mp4" muted={true} />
      </VideoWrapper>
      <ContentWrapper>
        <SubTitle focus={isPlaying}>管理者的省時最愛</SubTitle>
        <Title focus={isPlaying}>資料管理看板</Title>
        <StyledDescription focus={isPlaying}>
          處理企業內部的數據，使之成為一個統一的看板，只呈現重要資訊，隨時監控、定時回報。
        </StyledDescription>
        <animated.div style={buttonStyle}>
          <ContactUsButton />
        </animated.div>
      </ContentWrapper>
    </Section>
  );
};

export default Dashboard;
