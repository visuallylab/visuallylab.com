import { NextPage } from 'next';
import DemoLayout from '@/layouts/Demo';
import { SITE_TITLE, i18nNamespace } from '@/constants';
import Map from '@/components/demo/Traffic/Map';

const Traffic: NextPage = () => {
  return (
    <DemoLayout title={'AI City Dashboard |' + SITE_TITLE}>
      <Map />
    </DemoLayout>
  );
};

Traffic.getInitialProps = async () => ({
  namespacesRequired: Object.values(i18nNamespace),
});
export default Traffic;
