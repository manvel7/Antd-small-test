import {Modal} from 'antd';
import {memo} from 'react';
import {FormProvider, UseFormReturn} from 'react-hook-form';

interface CustomFormModalProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  method: UseFormReturn<any>;
  footer: React.ReactNode;
  children: (methods: UseFormReturn<any>) => React.ReactNode;
}

const CustomFormModal = ({
  title,
  open,
  onCancel,
  children,
  method,
  footer
}: CustomFormModalProps) => {
  return (
    <FormProvider {...method}>
      <Modal title={title} open={open} onCancel={onCancel} footer={footer}>
        {children(method)}
      </Modal>
    </FormProvider>
  );
};

export default memo(CustomFormModal);
