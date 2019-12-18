import styled from 'styled-components';
import Section from '../Section';
import { media } from '@/utils/theme';

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
  padding: 2rem 0;
`;

const Row = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
`;
const Icon = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
`;

const IconWrapper = styled.a`
  width: 70%;
  text-align: center;
  margin-bottom: 10%;
  ${media('pad')} {
    width: 25%;
  }
`;

const Title = styled.h2`
  letter-spacing: 1.2px;
  font-size: ${p => p.theme.fontSize.big};
  margin-bottom: 3rem;
`;

export default () => (
  <Section>
    <ContentWrapper>
      <Title>社會影響力專案</Title>
      <Row>
        <IconWrapper
          href="https://www.taiwanstat.com/vp-tainan/index.html"
          target="_blank"
        >
          <Icon srcSet="/static/images/tainan-stat.png 1x, /static/images/tainan-stat@2x.png 2x, /static/images/tainan-stat@3x.png 3x" />
          <p>用數據看台南</p>
        </IconWrapper>
        <IconWrapper href="https://www.taiwanstat.com/" target="_blank">
          <Icon srcSet="/static/images/taiwan-stat.png 1x, /static/images/taiwan-stat@2x.png 2x, /static/images/taiwan-stat@3x.png 3x" />
          <p>用數據看台灣</p>
        </IconWrapper>
        <IconWrapper href="https://minedia.info/" target="_blank">
          <Icon srcSet="/static/images/minedia.png 1x, /static/images/minedia@2x.png 2x, /static/images/minedia@3x.png 3x" />
          <p>媒礦</p>
        </IconWrapper>
        <IconWrapper
          href="https://chrome.google.com/webstore/detail/instants/fghfkeajhcmoohfcfmdkajambdcanmob?hl=zh-TW"
          target="_blank"
        >
          <Icon srcSet="/static/images/instants.png 1x, /static/images/instants@2x.png 2x, /static/images/instants@3x.png 3x" />
          <p>Instants</p>
        </IconWrapper>
      </Row>
    </ContentWrapper>
  </Section>
);
