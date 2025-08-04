import { User } from '../../../entities/user/model/types';
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} from '../../../entities/user/api/userApiSlice';
import { Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';
import { useAsyncModal } from '../../../shared/UI/AsyncModal';

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
    .test('phone-validation', 'Invalid phone number format', function (value) {
      if (!value) return false;

      // Remove all non-digit characters except +
      const cleanNumber = value.replace(/[^\d+]/g, '');

      // Must start with + for international format
      if (!cleanNumber.startsWith('+')) return false;

      // Extract country code and number
      const numberWithoutPlus = cleanNumber.slice(1);

      // Common country codes and their expected lengths
      const countryRules: { [key: string]: number[] } = {
        '374': [8], // Armenia: +374 XX XXX XXX
        '1': [10],   // US/Canada: +1 XXX XXX XXXX
        '44': [10, 11], // UK: +44 XXXX XXX XXX
        '49': [10, 11, 12], // Germany: varies
        '33': [9, 10], // France: +33 X XX XX XX XX
        '39': [9, 10, 11], // Italy: varies
        '7': [10], // Russia: +7 XXX XXX XXXX
        '81': [10, 11], // Japan: varies
        '86': [11], // China: +86 XXX XXXX XXXX
        '91': [10], // India: +91 XXXXX XXXXX
      };

      // Check if it matches any known country pattern
      for (const [countryCode, validLengths] of Object.entries(countryRules)) {
        if (numberWithoutPlus.startsWith(countryCode)) {
          const phoneLength = numberWithoutPlus.length - countryCode.length;
          if (validLengths.includes(phoneLength)) {
            return true;
          }
        }
      }

      // Fallback: general international format validation
      // Should be between 8-15 digits total (including country code)
      return numberWithoutPlus.length >= 8 && numberWithoutPlus.length <= 15;
    })
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
      phone: ''
    },
    resolver: yupResolver(userSchema),
    mode: 'all'
  });

  const handleCancel = useCallback(() => {
    userFormMethods.reset({
      name: '',
      age: undefined,
      phone: ''
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
      phone: ''
    });
    setModalType(ModalType.CREATE);
    setIsModalOpen(true);
  }, [userFormMethods]);

  const handleOpenEditModal = useCallback((user: User) => {
    userFormMethods.reset({
      name: user.name,
      age: user.age,
      phone: user.phone
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

  const columns = [
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
  ];

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
