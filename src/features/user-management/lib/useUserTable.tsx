import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { User } from '../../../entities/user/model/types';
import {
  addUser as addUserAction,
  deleteUser as deleteUserAction,
  updateUser as updateUserAction
} from '../../../entities/user/model/slice';
import {
  getUsers,
  getUsersLoading
} from '../../../entities/user/model/selectors';
import { Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useState } from 'react';

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
    .max(120, 'Age must be less than 120')
});

export enum ModalType {
  CREATE = 'create',
  EDIT = 'edit'
}

const useUserTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector(getUsersLoading);
  const users = useSelector(getUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.CREATE);
  const [currentEditingUser, setCurrentEditingUser] = useState<User | null>(null);

  const userFormMethods = useForm({
    defaultValues: {
      name: '',
      age: undefined
    },
    resolver: yupResolver(userSchema),
    mode: 'all'
  });

  const handleCancel = useCallback(() => {
    userFormMethods.reset({
      name: '',
      age: undefined
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
      age: undefined
    });
    setModalType(ModalType.CREATE);
    setIsModalOpen(true);
  }, [userFormMethods]);

  const handleOpenEditModal = useCallback((user: User) => {
    userFormMethods.reset({
      name: user.name,
      age: user.age
    });
    setCurrentEditingUser(user);
    setModalType(ModalType.EDIT);
    setIsModalOpen(true);
  }, [userFormMethods]);

  const addUser = (user: Omit<User, 'key'>) => dispatch(addUserAction(user));

  const deleteUser = (key: string) => dispatch(deleteUserAction(key));

  const updateUser = (user: User) => dispatch(updateUserAction(user));

  const editRow = (record: User) => {
    handleOpenEditModal(record);
  };

  // Separate create user function
  const handleCreateUser = useCallback(
    async (values: Omit<User, 'key'>) => {
      setActionLoading(true);
      try {
        console.log('Creating user with data:', values);
        addUser(values);
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
        updateUser(updatedUser);
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

  const deleteRow = (key: string) => {
    deleteUser(key);
  };

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
