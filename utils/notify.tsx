import cogoToast from 'cogo-toast';
import Button from '@/components/demo/Button';
import './toast.css';

type TNotifyProps = {
  msg: string;
  btnText: string;
  action: () => void;
};

export default ({ msg, action, btnText }: TNotifyProps) =>
  cogoToast.info(msg, {
    onClick: hide => {
      action();
      // @ts-ignore
      hide();
    },
    hideAfter: 1500,
    position: 'top-left',
    bar: {
      size: '0px',
    },
    renderIcon: () => (
      <Button color={'rgba(0, 217, 255, 0.8)'}>{btnText}</Button>
    ),
  });
