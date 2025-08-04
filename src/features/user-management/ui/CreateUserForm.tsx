import { Input, InputRef } from 'antd';
import CustomTextInput from '../../../shared/UI/CustomTextInput';
import { memo, useCallback } from 'react';

const CreateUserForm = () => {
  // Memoized handler for better performance
  const handleAgeChange = useCallback(
    (onChange: (value: any) => void) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
          onChange(undefined);
        } else {
          const numValue = Number(value);
          if (!isNaN(numValue) && numValue >= 0) {
            onChange(numValue);
          }
        }
      },
    []
  );

  return (
    <>
      <CustomTextInput name="name">
        {({ value, onChange, onBlur, ref, hasError }) => (
          <Input
            type="text"
            size="large"
            ref={ref as React.Ref<InputRef>}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            status={hasError ? 'error' : ''}
            placeholder="Enter your full name"
            maxLength={50}
          />
        )}
      </CustomTextInput>

      <CustomTextInput name="age">
        {({ value, onChange, onBlur, ref, hasError }) => (
          <Input
            type="number"
            size="large"
            ref={ref as React.Ref<InputRef>}
            value={value || ''}
            onChange={handleAgeChange(onChange)}
            onBlur={onBlur}
            status={hasError ? 'error' : ''}
            placeholder="Enter your age"
            min={0}
            max={120}
          />
        )}
      </CustomTextInput>
    </>
  );
};

export default memo(CreateUserForm);
