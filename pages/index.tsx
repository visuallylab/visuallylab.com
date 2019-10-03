import { NextPage } from 'next';

import HomeLayout from '@/layouts/Home';
import Landing from '@/components/home/Landing';
import Design from '@/components/home/Design';
import Experience from '@/components/home/Experience';
import Platform from '@/components/home/Platform';
import Collaboration from '@/components/home/Collaboration';
import Team from '@/components/home/Team';
import Show from '@/components/home/Show';
import { i18nNamespace } from '@/constants';

const Index: NextPage = () => {
  return (
    <HomeLayout mode="light">
      <Landing />
      <Design />
      <Experience />
      <Platform />
      <Collaboration />
      <Team />
      <Show />
    </HomeLayout>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: Object.values(i18nNamespace),
});

export default Index;
