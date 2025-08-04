import React, { lazy, Suspense, useRef, useCallback } from 'react';
import { Button, Skeleton } from 'antd';
import useUserTable from './features/user-management/lib/useUserTable';
import CreateUserForm from './features/user-management/ui/CreateUserForm';
import UserTable from './features/user-management/ui/UserTable';
import { ButtonContainer, Container, CustomButton } from './styles';
import FullScreenSpinner from './shared/UI/FullScreenSpinner';

const CustomFormModal = lazy(() => import('./shared/UI/CustomFormModal'));

// Fallback for modal loading - smaller than FullScreenSpinner for better LCP
const ModalFallback = () => (
  <div style={{ padding: '20px' }}>
    <Skeleton active paragraph={{ rows: 2 }} />
  </div>
);

const App: React.FC = () => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const {
    users,
    loading,
    columns,
    userFormMethods,
    handleSubmit,
    handleCancel,
    handleOpenModal,
    isModalOpen,
    actionLoading
  } = useUserTable();

  const renderModalFooter = useCallback(() => (
    <ButtonContainer
      style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}
    >
      <Button
        disabled={loading || actionLoading}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button
        disabled={
          loading || actionLoading || !userFormMethods.formState.isValid
        }
        type="primary"
        htmlType="submit"
        onClick={() => submitRef.current?.click()}
      >
        Create
      </Button>
    </ButtonContainer>
  ), [loading, actionLoading, handleCancel, userFormMethods.formState.isValid]);

  const renderForm = useCallback((methods: any) => (
    <form onSubmit={methods.handleSubmit(handleSubmit)}>
      <div style={{ margin: '20px 0' }}>
        <CreateUserForm />
        {/* Hidden submit button */}
        <button
          type="submit"
          style={{ display: 'none' }}
          ref={submitRef}
        />
      </div>
    </form>
  ), [handleSubmit]);

  return (
    <Container>
      <ButtonContainer>
        <CustomButton onClick={handleOpenModal} type="primary">
          Create User
        </CustomButton>
      </ButtonContainer>

      <Suspense fallback={<ModalFallback />}>
        <CustomFormModal
          title="Create User"
          open={isModalOpen}
          onCancel={handleCancel}
          method={userFormMethods}
          footer={renderModalFooter()}
        >
          {renderForm}
        </CustomFormModal>
      </Suspense>

      <UserTable
        users={users}
        loading={loading}
        columns={columns}
      />
    </Container>
  );
};

export default App;
