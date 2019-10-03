import styled from 'styled-components';
import Section from '@/components/Section';
import { getRelativePath } from '@/utils';

const StyledSection = styled(Section)`
  background-color: ${p => p.theme.colors.lightGrey};
  padding: 3.5rem 0 7rem;
`;

const Title = styled.h2`
  letter-spacing: 1.2px;
  font-size: ${p => p.theme.fontSize.big};
  margin-bottom: 3rem;
`;

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const LogoWrapper = styled.div`
  width: 21%;
  display: flex;
  justify-content: center;
`;

const Logo = styled.img<{ scale?: number }>`
  width: 90%;
  transform: ${p => `scale(${p.scale || 1})`};
`;

const Collaboration = () => {
  return (
    <StyledSection>
      <Title>合作夥伴</Title>
      <Wrapper>
        {/* <LogoWrapper>
          <Logo src={getRelativePath('/static/images/logo-ncku.png')} />
        </LogoWrapper> */}
        <LogoWrapper>
          <Logo
            src={getRelativePath('/static/images/logo-sense-life.svg')}
            scale={0.6}
          />
        </LogoWrapper>
        <LogoWrapper>
          <Logo
            src={getRelativePath('/static/images/logo-biilabs.png')}
            scale={0.9}
          />
        </LogoWrapper>
        <LogoWrapper>
          <Logo
            src={getRelativePath('/static/images/logo-poseidonnetwork.png')}
            scale={1.25}
          />
        </LogoWrapper>
        <LogoWrapper>
          <Logo
            src={getRelativePath('/static/images/logo-zoetech.png')}
            scale={0.7}
          />
        </LogoWrapper>
      </Wrapper>
    </StyledSection>
  );
};

export default Collaboration;
