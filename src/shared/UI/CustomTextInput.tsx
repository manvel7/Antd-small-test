import React from 'react';
import { Form } from 'antd';
import {
  Controller,
  useFormContext,
  FieldError,
  FieldErrors,
} from 'react-hook-form';
import get from 'lodash/get';

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

function CustomTextInput<TRef = unknown>({
  name,
  label,
  maxWidth = '100%',
  children
}: CustomTextInputProps<TRef>) {
  const { control, formState } = useFormContext();
  const error = get(formState.errors, name);
  const hasError = Boolean(error);

  return (
    <Form.Item
      label={label}
      validateStatus={hasError ? 'error' : undefined}
      help={hasError ? error?.message?.toString() : undefined}
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
            hasError,
            error
          }) as React.ReactElement;
        }}
      />
    </Form.Item>
  );
}

export default CustomTextInput;
