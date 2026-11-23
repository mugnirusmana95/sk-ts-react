import type { ComponentProps } from 'react'
import { Controller, useFormContext, type UseFormReturn } from 'react-hook-form'

type FormInputProps = Omit<ComponentProps<'input'>, 'name'> & {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  onClickIconLeft?: () => void
  onClickIconRight?: () => void
  required?: boolean
  name?: string
  label?: string
  error?: string
}

const BaseInput = ({
  iconLeft,
  iconRight,
  onClickIconLeft,
  onClickIconRight,
  label,
  error,
  className,
  required,
  ...props
}: FormInputProps) => {
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
        {iconLeft && (
          <button
            type="button"
            onClick={onClickIconLeft}
            className={`flex w-7 shrink-0 items-center justify-center ${onClickIconLeft ? 'cursor-pointer' : ''} ${error ? 'text-red-500' : ''}`}
          >
            {iconLeft}
          </button>
        )}

        <input
          id={id}
          aria-invalid={!!error}
          className={`w-full px-2 outline-none ${className ?? ''}`}
          {...props}
        />

        {iconRight && (
          <button
            type="button"
            onClick={onClickIconRight}
            className={`flex w-7 shrink-0 items-center justify-center ${onClickIconRight ? 'cursor-pointer' : ''} ${error ? 'text-red-500' : ''}`}
          >
            {iconRight}
          </button>
        )}
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
