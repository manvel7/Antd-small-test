import { Input, InputRef, Select } from 'antd';
import CustomTextInput from '@/shared/UI/CustomTextInput';
import CustomSelect from '@/shared/UI/CustomSelect';
import { memo, useCallback } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { COUNTRIES, PREFERRED_COUNTRIES } from '@/constants/countries';

// Static styles - no need to recreate
const PHONE_BASE_STYLES = {
  containerStyle: {
    width: '100%'
  },
  dropdownStyle: {
    textAlign: 'left' as const
  }
};



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

  // Memoized phone input styles factory - only dynamic styles
  const getPhoneInputStyles = useCallback((hasError: boolean) => ({
    inputStyle: {
      width: '100%',
      height: '40px',
      fontSize: '14px',
      border: hasError ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
      borderRadius: '6px',
      paddingLeft: '48px',
      outline: 'none',
      transition: 'all 0.2s'
    },
    buttonStyle: {
      border: hasError ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
      borderRight: 'none',
      borderRadius: '6px 0 0 6px',
      backgroundColor: '#fafafa'
    }
  }), []);

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

      <CustomTextInput name="phone">
        {({ value, onChange, onBlur, hasError }) => {
          const dynamicStyles = getPhoneInputStyles(hasError);

          return (
            <PhoneInput
              country={'us'}
              value={typeof value === 'string' ? value : ''}
              onChange={(phone) => onChange(phone || '')}
              onBlur={onBlur}
              inputStyle={dynamicStyles.inputStyle}
              buttonStyle={dynamicStyles.buttonStyle}
              containerStyle={PHONE_BASE_STYLES.containerStyle}
              dropdownStyle={PHONE_BASE_STYLES.dropdownStyle}
              enableSearch={true}
              searchPlaceholder="Search countries..."
              specialLabel=""
              placeholder="Enter phone number"
              autoFormat={true}
              preferredCountries={PREFERRED_COUNTRIES}
            />
          );
        }}
      </CustomTextInput>

      <CustomSelect name="country" >
        {({ value, onChange, onBlur, hasError }) => (
          <Select
            size="large"
            value={value || undefined}
            onChange={onChange}
            onBlur={onBlur}
            status={hasError ? 'error' : ''}
            placeholder="Select your country"
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={COUNTRIES}
            style={{ width: '100%' }}
          />
        )}
      </CustomSelect>
    </>
  );
};

export default memo(CreateUserForm);
