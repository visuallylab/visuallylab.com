import { SFC, useMemo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Button from '@/components/Button';
import { media } from '@/utils/theme';

import LogoTitle from './LogoTitle';
import useWindowScroll from '@/hooks/useWindowScroll';

const Container = styled.header<{ hideUp: boolean; mode: 'light' | 'dark' }>`
  will-change: transform;
  position: fixed;
  z-index: ${p => p.theme.z.high};
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  padding: 5px 4%;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 0.5px
    ${p => (p.mode === 'dark' ? 'rgba(255,255,255,.4)' : 'rgba(0,0,0,.4)')};
  background-color: ${p => p.theme.backgroundColor};
  transition: all 0.3s ease-in;
  transform: ${p => (p.hideUp ? 'translateY(-100%)' : 'none')};

  ${media('desktop')} {
    height: 54px;
  }
  ${media('largeDesktop')} {
    height: 60px;
  }
`;

const RightWrapper = styled.ul<{ mode: 'light' | 'dark' }>`
  display: flex;
  align-items: center;
  color: ${p =>
    p.mode === 'light' ? p.theme.colors.primary : p.theme.colors.white};
`;

const Li = styled.li<{ mobileHide?: boolean; desktopHide?: boolean }>`
  display: ${p => (p.mobileHide ? 'none' : 'block')};
  cursor: pointer;
  margin-right: 1rem;
  letter-spacing: 0.51px;
  &:hover {
    font-weight: 400;
  }

  > a {
    text-decoration: none;
  }

  ${media('desktop')} {
    display: ${p => (p.desktopHide ? 'none' : 'block')};
  }
`;

type TProps = {
  mode?: 'dark' | 'light';
};

const Header: SFC<TProps> = ({ mode = 'light' }) => {
  const { y, oldY } = useWindowScroll();
  const hideUp = y > 0 && y > oldY;

  const MemoHeader = useMemo(
    () => (
      <Container hideUp={hideUp} mode={mode}>
        <LogoTitle mode={mode} />
        <RightWrapper mode={mode}>
          <Li desktopHide>
            <Link href="/service">
              <Button style={{ width: '9rem' }}>智慧決策方案</Button>
            </Link>
          </Li>
          <Li mobileHide>
            <Link href="/service">
              <a>智慧決策方案</a>
            </Link>
          </Li>
          <Li mobileHide>
            <Link href="/demo">
              <Button>體驗</Button>
            </Link>
          </Li>
        </RightWrapper>
      </Container>
    ),
    [hideUp],
  );

  return MemoHeader;
};

export default Header;
