import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined, QuestionCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';

export type ModalType = 'confirm' | 'warning' | 'info' | 'error';

export interface AsyncModalOptions {
  title?: string;
  message: string;
  type?: ModalType;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  danger?: boolean;
}

interface ModalState extends AsyncModalOptions {
  visible: boolean;
  loading: boolean;
  resolve?: (value: boolean) => void;
}

interface AsyncModalContextType {
  showModal: (options: AsyncModalOptions) => Promise<boolean>;
  confirm: (message: string, title?: string) => Promise<boolean>;
  warning: (message: string, title?: string) => Promise<boolean>;
  info: (message: string, title?: string) => Promise<boolean>;
  error: (message: string, title?: string) => Promise<boolean>;
}

const AsyncModalContext = createContext<AsyncModalContextType | null>(null);

export const useAsyncModal = () => {
  const context = useContext(AsyncModalContext);
  if (!context) {
    throw new Error('useAsyncModal must be used within AsyncModalProvider');
  }
  return context;
};

const getModalIcon = (type: ModalType) => {
  switch (type) {
    case 'confirm':
      return <QuestionCircleOutlined style={{ color: '#1890ff' }} />;
    case 'warning':
      return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
    case 'error':
      return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
    case 'info':
    default:
      return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
  }
};

export const AsyncModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>({
    visible: false,
    loading: false,
    message: '',
    type: 'confirm'
  });

  const showModal = useCallback((options: AsyncModalOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setModalState({
        ...options,
        visible: true,
        loading: false,
        resolve,
        type: options.type || 'confirm',
        confirmText: options.confirmText || 'OK',
        cancelText: options.cancelText || 'Cancel',
        showCancel: options.showCancel !== false,
        danger: options.danger || false
      });
    });
  }, []);

  const confirm = useCallback((message: string, title = 'Confirm'): Promise<boolean> => {
    return showModal({ message, title, type: 'confirm', danger: false });
  }, [showModal]);

  const warning = useCallback((message: string, title = 'Warning'): Promise<boolean> => {
    return showModal({ message, title, type: 'warning', danger: true });
  }, [showModal]);

  const info = useCallback((message: string, title = 'Information'): Promise<boolean> => {
    return showModal({ message, title, type: 'info', showCancel: false });
  }, [showModal]);

  const error = useCallback((message: string, title = 'Error'): Promise<boolean> => {
    return showModal({ message, title, type: 'error', showCancel: false, danger: true });
  }, [showModal]);

  const handleConfirm = useCallback(async () => {
    setModalState(prev => ({ ...prev, loading: true }));

    // Simulate async operation (you can remove this in production)
    await new Promise(resolve => setTimeout(resolve, 100));

    if (modalState.resolve) {
      modalState.resolve(true);
    }

    setModalState(prev => ({
      ...prev,
      visible: false,
      loading: false,
      resolve: undefined
    }));
  }, [modalState.resolve]);

  const handleCancel = useCallback(() => {
    if (modalState.resolve) {
      modalState.resolve(false);
    }

    setModalState(prev => ({
      ...prev,
      visible: false,
      loading: false,
      resolve: undefined
    }));
  }, [modalState.resolve]);

  const contextValue: AsyncModalContextType = {
    showModal,
    confirm,
    warning,
    info,
    error
  };

  return (
    <AsyncModalContext.Provider value={contextValue}>
      {children}

      <Modal
        open={modalState.visible}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {getModalIcon(modalState.type || 'confirm')}
            {modalState.title}
          </div>
        }
        onCancel={handleCancel}
        footer={[
          modalState.showCancel && (
            <Button key="cancel" onClick={handleCancel} disabled={modalState.loading}>
              {modalState.cancelText}
            </Button>
          ),
          <Button
            key="confirm"
            type={modalState.danger ? 'primary' : 'default'}
            danger={modalState.danger}
            loading={modalState.loading}
            onClick={handleConfirm}
          >
            {modalState.confirmText}
          </Button>
        ].filter(Boolean)}
        closable={!modalState.loading}
        maskClosable={!modalState.loading}
      >
        <div style={{ marginTop: 16, fontSize: 14 }}>
          {modalState.message}
        </div>
      </Modal>
    </AsyncModalContext.Provider>
  );
};
