import { NextPage } from 'next';
import styled from 'styled-components';

import HomeLayout from '@/layouts/Home';
import { i18nNamespace } from '@/constants';
import Section from '@/components/Section';
import { getRelativePath } from '@/utils';
import { media } from '@/utils/theme';

const QRImage = styled.img`
  cursor: pointer;
  width: 90%;
  ${media('desktop')} {
    width: 50%;
  }
`;

const Contact: NextPage = () => {
  return (
    <HomeLayout mode="light" footer={false}>
      <Section fullscreen={true}>
        <QRImage
          onClick={() => window.open('https://www.facebook.com/visuallylab/')}
          src={getRelativePath('/static/images/qr-code.png')}
        />
      </Section>
    </HomeLayout>
  );
};

Contact.getInitialProps = async () => ({
  namespacesRequired: Object.values(i18nNamespace),
});

export default Contact;
