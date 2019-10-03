import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Button from '@/components/Button';
import { media } from '@/utils/theme';

const StyledButton = styled(Button)`
  margin-top: 1rem;
  border-width: 2px;
  font-size: ${p => p.theme.fontSize.big};
  padding: 0.5rem 0;
  width: 130px;

  ${media('desktop')} {
    width: 160px;
  }
`;

type TProps = {
  className?: string;
  color?: string;
};

const ContactUsButton: FC<TProps> = ({ className, color = 'white' }) => {
  return (
    <Link href="/contact-us">
      <StyledButton className={className} outline={true} color={color}>
        聯絡我們
      </StyledButton>
    </Link>
  );
};

export default ContactUsButton;
