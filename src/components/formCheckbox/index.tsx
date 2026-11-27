
import type { ComponentProps } from 'react'
import { Controller, useFormContext, type UseFormReturn } from 'react-hook-form'
import { HiOutlineCheck } from 'react-icons/hi'

type FormCheckboxProps = Omit<ComponentProps<'input'>, 'type' | 'name' | 'checked' | 'onChange'> & {
  name?: string
  label?: string
  error?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
}

const BaseCheckbox = ({
  name,
  label,
  error,
  checked = false,
  disabled = false,
  required = false,
  onChange,
  className,
  ...props
}: FormCheckboxProps) => {
  const id = props.id ?? name

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className={`flex w-fit items-center gap-2 ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
      >
        <div className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded border duration-300 ${checked
            ? 'border-red-500 bg-red-500'
            : 'border-gray-300 bg-white hover:border-red-500'
          } ${disabled ? 'opacity-50' : ''} ${error ? 'border-red-500' : ''}`}>
          <HiOutlineCheck
            className={`text-white duration-300 ${checked ? 'opacity-100' : 'opacity-0'}`}
          />

          <input
            {...props}
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            required={required}
            onChange={(e) => onChange?.(e.target.checked)}
            className={`absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-default ${className ?? ''}`}
          />
        </div>

        {label && (
          <span className={`text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700'}`}>
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        )}
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

const FormCheckbox = ({ name, error, ...props }: FormCheckboxProps) => {
  const form = useFormContext() as UseFormReturn | null

  if (!form || !name) {
    return <BaseCheckbox name={name} error={error} {...props} />
  }

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <BaseCheckbox
          {...props}
          name={name}
          checked={!!field.value}
          onChange={field.onChange}
          error={fieldState.error?.message ?? error}
        />
      )}
    />
  )
}

export default FormCheckbox
