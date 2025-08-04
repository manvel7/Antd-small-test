import React, { useMemo } from 'react';
import { Form } from 'antd';
import {
  Controller,
  useFormContext,
  FieldError,
  FieldErrors,
} from 'react-hook-form';

// Narrow FormValue (no null)
type FormValue = string | number | string[] | undefined;
type FormError = FieldError | FieldErrors | undefined;

interface RenderPropParams<TRef = unknown> {
  value: FormValue;
  onChange: (value: FormValue) => void;
  onBlur: () => void;
  ref: React.Ref<TRef>;
  hasError: boolean;
  error?: FormError;
}

interface CustomTextInputProps<TRef = unknown> {
  name: string;
  label?: string;
  maxWidth?: string;
  children: (props: RenderPropParams<TRef>) => React.ReactNode;
}

// Helper function to get nested property without lodash
const getNestedProperty = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

function CustomTextInput<TRef = unknown>({
  name,
  label,
  maxWidth = '100%',
  children
}: CustomTextInputProps<TRef>) {
  const { control, formState } = useFormContext();

  // Memoize error calculation to avoid unnecessary re-calculations
  const errorInfo = useMemo(() => {
    const error = getNestedProperty(formState.errors, name);
    return {
      error,
      hasError: Boolean(error)
    };
  }, [formState.errors, name]);

  return (
    <Form.Item
      label={label}
      validateStatus={errorInfo.hasError ? 'error' : undefined}
      help={errorInfo.hasError ? errorInfo.error?.message?.toString() : undefined}
      style={{ maxWidth }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { value, onChange, onBlur, ref } = field;

          return children({
            value: value ?? '',
            onChange,
            onBlur,
            ref,
            hasError: errorInfo.hasError,
            error: errorInfo.error
          }) as React.ReactElement;
        }}
      />
    </Form.Item>
  );
}

export default CustomTextInput;
