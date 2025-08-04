import React from 'react';
import { Form } from 'antd';
import {
  Controller,
  useFormContext,
  FieldError,
  FieldErrors
} from 'react-hook-form';
import get from 'lodash/get';

// Remove null from FormValue
type FormValue = string | number | string[] | undefined;
type FormError = FieldError | FieldErrors | undefined;

// Generic render prop for flexibility
interface SelectRenderPropParams<TRef = unknown> {
  value: FormValue;
  onChange: (value: FormValue) => void;
  onBlur: () => void;
  ref: React.Ref<TRef>;
  hasError: boolean;
  error?: FormError;
}

interface CustomSelectProps<TRef = unknown> {
  name: string;
  label?: string;
  maxWidth?: string;
  children: (props: SelectRenderPropParams<TRef>) => React.ReactNode;
}

function CustomSelect<TRef = unknown>({
  name,
  label,
  maxWidth = '100%',
  children
}: CustomSelectProps<TRef>) {
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
            value: value ?? undefined, // handle null fallback
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

export default CustomSelect;
