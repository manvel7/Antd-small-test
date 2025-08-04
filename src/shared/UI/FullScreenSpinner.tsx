import React from 'react';
import {Spin} from 'antd';

interface FullScreenSpinnerProps {
  tip?: React.ReactNode;
  size?: 'small' | 'default' | 'large';
  children?: (loading: boolean) => React.ReactNode;
  loading?: boolean;
}

const FullScreenSpinner: React.FC<FullScreenSpinnerProps> = ({
  tip = '',
  size = 'large',
  children,
  loading = true
}) => {
  return (
    <div className="full-screen-spinner">
      <Spin size={size} spinning={loading}>
        {children ? children(loading) : <div style={{minHeight: '200px'}} />}
      </Spin>
    </div>
  );
};

export default FullScreenSpinner;
