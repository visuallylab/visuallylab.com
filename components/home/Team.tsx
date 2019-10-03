import styled from 'styled-components';
import Section from '@/components/Section';
import { getRelativePath } from '@/utils';
import { media } from '@/utils/theme';
import Title from '../Title';
import Member, { TMember } from './Member';

const Wrapper = styled.div`
  position: relative;
  width: 92%;
  min-height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div<{ src: string }>`
  margin-top: 3%;
  position: relative;
  background: url(${p => p.src}) center no-repeat/contain;
  width: 400px;
  height: 400px;
  ${media('largeDesktop')} {
    width: 470px;
    height: 470px;
  }
`;

const StyledTitle = styled(Title)`
  will-change: transform;
  white-space: nowrap;
  position: absolute;
  color: ${p => p.theme.colors.white};
  left: 50%;
  transform: translateX(-50%);
  top: 90px;
  ${media('largeDesktop')} {
    top: 104px;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  ${media('desktop')} {
    width: 90%;
    margin: 0 5%;
  }
`;

const team: TMember[] = [
  {
    name: '杭孟澤',
    avatar: getRelativePath('/static/images/mengtse.jpg'),
    title: '共同創辦人暨營運長',
    jobDescription: '專注使用體驗設計 / 資訊內容分析與策略 / 產品開發',
  },
  {
    name: '黃啟軒',
    avatar: 'https://avatars2.githubusercontent.com/u/4344253?s=400&v=4',
    title: '共同創辦人暨執行長',
    jobDescription:
      '資深產品開發經驗 / 雲端大架構式解決服務 / 軟體開發流程管理',
  },
  {
    name: '李至青',
    avatar: getRelativePath('/static/images/jhincing.jpg'),
    title: '共同創辦人暨\n資深產品經理',
    jobDescription: '擅於產品脈絡設計 / 軟體開發流程管理 / 資深軟體工程師',
  },
];

const Team = () => {
  return (
    <Section justifyContent="center" alignItems="center" fullscreen={true}>
      <Wrapper>
        <TitleWrapper src={getRelativePath('/static/images/logo-team.svg')}>
          <StyledTitle>專業團隊</StyledTitle>
        </TitleWrapper>
        <InfoWrapper>
          {team.map((m, i) => (
            <Member key={m.name} item={m} index={i} />
          ))}
        </InfoWrapper>
      </Wrapper>
    </Section>
  );
};

export default Team;
