import DemoLayout from '@/layouts/Demo';
import Realtime from '@/components/demo/Electricity/Realtime';
import { SITE_TITLE, i18nNamespace } from '@/constants';

const Electricity = () => {
  return (
    <DemoLayout title={'Electricity |' + SITE_TITLE}>
      <Realtime />
    </DemoLayout>
  );
};

Electricity.getInitialProps = () => ({
  namespacesRequired: Object.values(i18nNamespace),
});

export default Electricity;
