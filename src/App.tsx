import React, { lazy, Suspense, useRef, useCallback } from 'react';
import { Button, Skeleton } from 'antd';
import useUserTable, { ModalType } from './features/user-management/lib/useUserTable';
import CreateUserForm from './features/user-management/ui/CreateUserForm';
import UserTable from './features/user-management/ui/UserTable';
import { AsyncModalProvider } from './shared/UI/AsyncModal';
import { ButtonContainer, Container, CustomButton } from './styles';
import FullScreenSpinner from './shared/UI/FullScreenSpinner';
const CustomFormModal = lazy(() => import('./shared/UI/CustomFormModal'));

const App: React.FC = () => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const {
    users,
    loading,
    columns,
    userFormMethods,
    handleSubmit,
    handleCancel,
    handleOpenCreateModal,
    isModalOpen,
    actionLoading,
    modalType,
    deleteRow
  } = useUserTable();

  // UserTable now has built-in async modal support

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
        {modalType === ModalType.CREATE ? 'Create' : 'Update'}
      </Button>
    </ButtonContainer>
  ), [loading, actionLoading, handleCancel, userFormMethods.formState.isValid, modalType]);

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
        <CustomButton onClick={handleOpenCreateModal} type="primary">
          Create User
        </CustomButton>
      </ButtonContainer>

      <Suspense fallback={<FullScreenSpinner loading={true} />}>
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
