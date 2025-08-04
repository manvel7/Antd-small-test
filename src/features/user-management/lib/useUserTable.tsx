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
  key: yup.string(),
  name: yup.string().required('Name is required'),
  age: yup.number().required('Age is required').nullable()
});

const useUserTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const loading = useSelector(getUsersLoading);
  const users = useSelector(getUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const userFormMethods = useForm({
    defaultValues: {
      key: '',
      name: '',
      age: null
    },
    resolver: yupResolver(userSchema),
    mode: 'all'
  });

  const handleCancel = useCallback(() => {
    userFormMethods.reset({
      key: '',
      name: '',
      age: null
    });
    setIsModalOpen(false);
  }, [userFormMethods]);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const addUser = (user: Omit<User, 'key'>) => dispatch(addUserAction(user));

  const deleteUser = (key: string) => dispatch(deleteUserAction(key));

  const updateUser = (user: User) => dispatch(updateUserAction(user));

  const editRow = (record: User) => {
    // For now, just show an alert. You can implement a modal for editing later
    alert(`Edit clicked: ${record.name}`);
  };

  const handleSubmit = useCallback(
    async (values: User) => {
      setActionLoading(true);
      try {
        await addUser(values);
        handleCancel();
      } catch (error) {
        console.error(error);
      } finally {
        setActionLoading(false);
      }
    },
    [addUser, handleCancel]
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
    handleCancel,
    handleOpenModal,
    isModalOpen,
    actionLoading
  };
};

export { useUserTable };
export default useUserTable;
