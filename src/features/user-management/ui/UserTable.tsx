import React, { memo } from 'react';
import { Table, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { User } from '@/entities/user/model/types';

interface UserTableProps {
  users: User[];
  loading: boolean;
  columns: any[];
}

// Memoized empty state component with optimized LCP
const EmptyUserState = memo(() => (
  <Empty
    image={
      <UserOutlined
        style={{
          fontSize: 48, // Reduced size to avoid being LCP
          color: '#d9d9d9',
          marginBottom: 12
        }}
      />
    }
    description={
      <div style={{ color: '#999', fontSize: '13px', maxWidth: '200px', margin: '0 auto' }}>
        No users yet. Start building your team!
      </div>
    }
  />
));

const UserTable: React.FC<UserTableProps> = ({ users, loading, columns }) => {
  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={loading && users.length > 0} // Only show table loading when updating existing data
      locale={{ emptyText: <EmptyUserState /> }}
      pagination={{ pageSize: 5 }}
      size="middle" // Better performance than default size
    />
  );
};

// Memoize the UserTable component to prevent unnecessary re-renders
export default memo(UserTable);
