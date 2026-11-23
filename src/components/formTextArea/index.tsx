import type { ComponentProps } from 'react'
import { Controller, useFormContext, type UseFormReturn } from 'react-hook-form'

type FormInputProps = Omit<ComponentProps<'textarea'>, 'name'> & {
  required?: boolean
  name?: string
  label?: string
  error?: string
}

const BaseInput = ({ label, error, className, required, ...props }: FormInputProps) => {
  const id = props.id ?? props.name

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className={`text-sm font-medium ${error ? 'text-red-500' : ''}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={`flex w-full flex-row rounded border border-gray-400 py-1 duration-300 ${error ? 'border-red-500' : 'focus:border-blue-500'}`}
      >
        <textarea
          id={id}
          aria-invalid={!!error}
          className={`max-h-48 min-h-16 w-full px-2 outline-none ${className ?? ''}`}
          {...props}
        ></textarea>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

const FormInput = ({ name, error, ...props }: FormInputProps) => {
  const form = useFormContext() as UseFormReturn | null

  if (!form || !name) {
    return <BaseInput name={name} error={error} {...props} />
  }

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <BaseInput
          {...props}
          {...field}
          value={field.value ?? ''}
          error={fieldState.error?.message ?? error}
        />
      )}
    />
  )
}

export default FormInput
