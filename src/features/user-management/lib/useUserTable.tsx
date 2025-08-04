import { User } from '@/entities/user/model/types';
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} from '@/entities/user/api/userApiSlice';
import { Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState, useMemo } from 'react';
import { useAsyncModal } from '@/components/AsyncModal';
import { COUNTRIES } from '@/constants/countries';
import { validatePhoneNumber } from '@/shared/utils/phoneValidation';

const userSchema = yup.object({
  name: yup.string().required('Name is required'),
  age: yup
    .number()
    .nullable()
    .transform((value, originalValue) => {
      // Transform empty string to null
      return originalValue === '' ? null : value;
    })
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be a whole number')
    .min(1, 'Age must be at least 1')
    .max(120, 'Age must be less than 120'),
  phone: yup
    .string()
    .required('Phone number is required')
    .test('phone-validation', 'Invalid phone number format', validatePhoneNumber),
  country: yup
    .string()
    .required('Country is required')
});

export enum ModalType {
  CREATE = 'create',
  EDIT = 'edit'
}

const useUserTable = () => {
  const { confirm } = useAsyncModal();

  // RTK Query hooks
  const { data: users = [], isLoading: loading } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUserMutation] = useUpdateUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.CREATE);
  const [currentEditingUser, setCurrentEditingUser] = useState<User | null>(null);

  const userFormMethods = useForm({
    defaultValues: {
      name: '',
      age: undefined,
      phone: '',
      country: ''
    },
    resolver: yupResolver(userSchema),
    mode: 'all'
  });

  const handleCancel = useCallback(() => {
    userFormMethods.reset({
      name: '',
      age: undefined,
      phone: '',
      country: ''
    });
    setCurrentEditingUser(null);
    setIsModalOpen(false);
    setTimeout(() => {
      setModalType(ModalType.CREATE);
    }, 0);
  }, [userFormMethods]);

  const handleOpenCreateModal = useCallback(() => {
    userFormMethods.reset({
      name: '',
      age: undefined,
      phone: '',
      country: ''
    });
    setModalType(ModalType.CREATE);
    setIsModalOpen(true);
  }, [userFormMethods]);

  const handleOpenEditModal = useCallback((user: User) => {
    userFormMethods.reset({
      name: user.name,
      age: user.age,
      phone: user.phone,
      country: user.country
    });
    setCurrentEditingUser(user);
    setModalType(ModalType.EDIT);
    setIsModalOpen(true);
  }, [userFormMethods]);

  const addUser = async (user: Omit<User, 'key'>) => {
    await createUser(user).unwrap();
  };

  const deleteUser = async (key: string) => {
    await deleteUserMutation(key).unwrap();
  };

  const updateUser = async (user: User) => {
    const { key, ...userData } = user;
    await updateUserMutation({ key, ...userData }).unwrap();
  };

  const editRow = (record: User) => {
    handleOpenEditModal(record);
  };

  // Separate create user function
  const handleCreateUser = useCallback(
    async (values: Omit<User, 'key'>) => {
      setActionLoading(true);
      try {
        console.log('Creating user with data:', values);
        await addUser(values);
        handleCancel();
      } catch (error) {
        console.error('Error creating user:', error);
      } finally {
        setActionLoading(false);
      }
    },
    [addUser, handleCancel]
  );

  // Separate edit user function - needs the key for updating
  const handleEditUser = useCallback(
    async (values: Omit<User, 'key'>, currentUser: User) => {
      setActionLoading(true);
      try {
        const updatedUser: User = {
          key: currentUser.key,
          ...values
        };
        console.log('Updating user with data:', updatedUser);
        await updateUser(updatedUser);
        handleCancel();
      } catch (error) {
        console.error('Error updating user:', error);
      } finally {
        setActionLoading(false);
      }
    },
    [updateUser, handleCancel]
  );

  // Main submit handler that depends on modalType
  const handleSubmit = useCallback(
    async (values: Omit<User, 'key'>) => {
      if (modalType === ModalType.CREATE) {
        await handleCreateUser(values);
      } else if (modalType === ModalType.EDIT && currentEditingUser) {
        await handleEditUser(values, currentEditingUser);
      }
    },
    [modalType, handleCreateUser, handleEditUser, currentEditingUser]
  );

  const deleteRow = useCallback(async (key: string) => {
    const user = users.find((u: User) => u.key === key);
    if (!user) return;

    const confirmed = await confirm(
      `Are you sure you want to delete "${user.name}"? This action cannot be undone.`,
      'Delete User'
    );

    if (confirmed) {
      try {
        await deleteUser(key);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }, [users, confirm, deleteUser]);

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      render: (country: string) => {
        const countryData = COUNTRIES.find((c: { value: string; label: string }) => c.value === country);
        return countryData ? countryData.label : country;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: User) => (
        <Space>
          <EditOutlined
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() => editRow(record)}
          />
          <DeleteOutlined
            style={{ cursor: 'pointer', color: '#ff4d4f' }}
            onClick={() => deleteRow(record.key)}
          />
        </Space>
      )
    }
  ], [editRow, deleteRow]);

  return {
    users,
    loading,
    addUser,
    deleteUser,
    updateUser,
    editRow,
    deleteRow,
    columns,
    userFormMethods,
    handleSubmit,
    handleCreateUser,
    handleEditUser,
    handleCancel,
    handleOpenCreateModal,
    handleOpenEditModal,
    isModalOpen,
    actionLoading,
    modalType,
    currentEditingUser
  };
};

export { useUserTable };
export default useUserTable;
