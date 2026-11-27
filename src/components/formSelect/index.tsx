import { useEffect, useRef, useState } from 'react'
import { Controller, useFormContext, type UseFormReturn } from 'react-hook-form'
import { IoChevronDown, IoCloseOutline } from 'react-icons/io5'

import FormInput from '~/components/formInput'

type FormSelectProps<T, V = unknown> = {
  options?: T[]
  optionPosition?: 'top' | 'bottom'
  name?: string
  label?: string
  error?: string
  placeholder?: string
  value?: V | null
  onChange?: (value: V | null, item: T | null) => void
  onSearch?: (value: string) => void
  debounceMs?: number
  loading?: boolean
  setLabel?: (item: T) => string | number
  setValue?: (item: T) => V
  setDisabled?: (item: T) => boolean
  clearable?: boolean
  searchable?: boolean
  disabled?: boolean
}

const defaultLabel = (item: any) => String(item?.label ?? '')
const defaultValue = (item: any) => item?.value
const defaultDisabled = (item: any) => !!item?.disabled

const BaseSelect = <T, V = unknown>({
  options = [],
  optionPosition = 'bottom',
  label,
  error,
  placeholder = 'Select Item',
  value,
  onChange,
  onSearch,
  debounceMs = 500,
  loading = false,
  setLabel = defaultLabel,
  setValue = defaultValue,
  setDisabled = defaultDisabled,
  clearable = false,
  searchable = false,
  disabled = false,
}: Omit<FormSelectProps<T, V>, 'name'>) => {
  const [inner, setInner] = useState<V | null>(null)
  const [selectedItem, setSelectedItem] = useState<T | null>(null)
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const rootRef = useRef<HTMLDivElement>(null)
  const onSearchRef = useRef(onSearch)
  const lastSearchRef = useRef('')

  const current = value !== undefined ? value : inner

  const found = current == null ? null : (options.find((o) => setValue(o) === current) ?? null)
  const remembered =
    current != null && selectedItem !== null && setValue(selectedItem) === current
      ? selectedItem
      : null
  const selected = found ?? remembered

  const keyword = searchValue.trim().toLowerCase()
  const filtered =
    onSearch || !keyword
      ? options
      : options.filter((o) => String(setLabel(o)).toLowerCase().includes(keyword))

  const showSearch = searchable || !!onSearch

  const close = () => {
    setOpen(false)
    setSearchValue('')
    if (lastSearchRef.current !== '') {
      lastSearchRef.current = ''
      onSearchRef.current?.('')
    }
  }

  const toggle = () => {
    if (disabled) return
    if (open) close()
    else setOpen(true)
  }

  const closeRef = useRef(close)
  useEffect(() => {
    onSearchRef.current = onSearch
    closeRef.current = close
  })

  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) closeRef.current()
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [open])

  useEffect(() => {
    if (!open || !onSearchRef.current) return
    if (searchValue === lastSearchRef.current) return

    const timer = setTimeout(() => {
      lastSearchRef.current = searchValue
      onSearchRef.current?.(searchValue)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [searchValue, open, debounceMs])

  const handleSelect = (item: T) => {
    const v = setValue(item)
    setInner(v)
    setSelectedItem(item)
    onChange?.(v, item)
    close()
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setInner(null)
    setSelectedItem(null)
    onChange?.(null, null)
  }

  return (
    <div ref={rootRef} className="flex w-full flex-col gap-1">
      {label && <span className="text-sm font-medium">{label}</span>}

      <div className="relative">
        <div
          role="combobox"
          aria-expanded={open}
          aria-invalid={!!error}
          tabIndex={disabled ? -1 : 0}
          className={`flex h-9 w-full flex-row items-stretch overflow-hidden rounded border ${error ? 'border-red-500' : 'border-gray-400'
            } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          onClick={toggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              toggle()
            }
            if (e.key === 'Escape') close()
          }}
        >
          <span className="flex min-w-0 flex-1 items-center pl-2">
            <span className={`truncate ${selected ? 'text-black' : 'text-gray-400'}`}>
              {selected ? setLabel(selected) : placeholder}
            </span>
          </span>

          {clearable && selected && !disabled && (
            <span
              role="button"
              aria-label="Clear"
              className="flex w-7 shrink-0 items-center justify-center"
              onClick={handleClear}
            >
              <IoCloseOutline />
            </span>
          )}

          <span className="flex w-7 shrink-0 items-center justify-center">
            <IoChevronDown className={open ? 'rotate-180' : ''} />
          </span>
        </div>

        {open && (
          <div
            className={`absolute ${optionPosition === 'top' ? 'bottom-full mb-1' : 'top-full'} left-0 z-10 mt-1 flex max-h-56 w-full flex-col gap-2 rounded border border-gray-400 bg-white p-2 shadow`}
            onKeyDown={(e) => {
              if (e.key === 'Escape') close()
            }}
          >
            {showSearch && (
              <FormInput
                placeholder="Search"
                value={searchValue}
                autoFocus
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.preventDefault()
                }}
              />
            )}

            <div
              role="listbox"
              className={`no-scrollbar flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto ${loading ? 'opacity-60' : ''
                }`}
            >
              {filtered.length > 0 ? (
                filtered.map((item, i) => {
                  const isDisabled = setDisabled(item)
                  const isSelected = item === selected

                  return (
                    <div
                      key={`${String(setValue(item))}-${i}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={isDisabled}
                      className={`rounded border p-2 duration-300 ${isDisabled
                        ? 'bg-gray-200 text-gray-400 select-none'
                        : 'cursor-pointer hover:border-blue-500 hover:bg-gray-200'
                        } ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => {
                        if (!isDisabled) handleSelect(item)
                      }}
                    >
                      {setLabel(item)}
                    </div>
                  )
                })
              ) : (
                <span className="flex w-full items-center justify-center py-2 text-xs italic">
                  {loading ? 'Loading...' : 'No Option Available'}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}

function FormSelect<T, V = unknown>({ name, error, ...props }: FormSelectProps<T, V>) {
  const form = useFormContext() as UseFormReturn | null

  if (!form || !name) {
    return <BaseSelect<T, V> {...props} error={error} />
  }

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <BaseSelect<T, V>
          {...props}
          value={(field.value ?? null) as V | null}
          onChange={(v) => field.onChange(v)}
          error={fieldState.error?.message ?? error}
        />
      )}
    />
  )
}

export default FormSelect
