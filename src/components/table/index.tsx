import { useMemo } from 'react'

import FormCheckbox from '~/components/formCheckbox'
import FormSelect from '~/components/formSelect'

import { IoReloadOutline } from "react-icons/io5"

type TCell = {
  label?: string
  width?: string
  children: React.ReactNode
}

type TColumn<T> = {
  id: string
  header: string
  value: string
  width?: {
    value: number
    type: 'px' | '%' | 'rem'
  }
  customRender?: (value: any, row: T, index: number) => React.ReactNode
}

type TChecked = {
  uniqueKey: string
  list: string[]
}

type TPagination = {
  checkedData?: TChecked
  onChecked?: (uniqueKey: string[]) => void
  page: number
  limit: number
  totalData: number
  totalPage: number
  hasPrevPage: boolean
  hasNextPage: boolean
}

type TTable<T> = {
  withIncrement?: boolean
  withCheckbox?: boolean
  withFooter?: boolean
  checkedData?: TChecked
  onChecked?: (rows: T[], checked: boolean) => void
  columns: TColumn<T>[]
  actionColumn?: (row: T, index: number) => React.ReactNode
  actionHeader?: string
  data: T[]
  pagination?: TPagination
  onPageChange?: (page: number) => void
  onLimitChange?: (limit: number) => void
  isLoading?: boolean
  disabled?: boolean
  loadingText?: string
}

const getValue = (row: any, path: string) =>
  path.split('.').reduce((acc, key) => acc?.[key], row)

const cell =
  'flex items-center gap-3 px-4 py-2 border-b border-gray-200 last:border-b-0 ' +
  'lg:table-cell lg:border lg:border-gray-300 lg:last:border-b lg:whitespace-nowrap lg:align-middle'

const Table = <T extends Record<string, any>>({
  withIncrement = false,
  withCheckbox = false,
  withFooter = false,
  checkedData,
  onChecked,
  columns,
  actionColumn,
  actionHeader = 'Action',
  data,
  pagination,
  onPageChange,
  onLimitChange,
  isLoading = false,
  disabled = false,
  loadingText = undefined,
}: TTable<T>) => {
  const uniqueKey = checkedData?.uniqueKey ?? 'id'
  const checkedSet = new Set(checkedData?.list ?? [])

  const gridCols = data.length === 1 ? 'md:grid-cols-1' : 'md:grid-cols-2'

  const getId = (row: T) => String(row[uniqueKey])
  const isChecked = (row: T) => checkedSet.has(getId(row))

  const isAllChecked = data.length > 0 && data.every(isChecked)

  const toggleAll = () => onChecked?.(data, !isAllChecked)
  const toggleRow = (row: T) => onChecked?.([row], !isChecked(row))

  const getWidth = (col: TColumn<T>) =>
    col.width ? `${col.width.value}${col.width.type}` : undefined

  const getNumber = (index: number) =>
    pagination ? (pagination.page - 1) * pagination.limit + index + 1 : index + 1

  const getRange = () => {
    if (!pagination || pagination.totalData === 0) return { from: 0, to: 0 }
    const from = (pagination.page - 1) * pagination.limit + 1
    const to = Math.min(pagination.page * pagination.limit, pagination.totalData)
    return { from, to }
  }

  const getPages = useMemo(() => {
    if (pagination?.page && pagination?.totalPage) {
      const { totalPage } = pagination
      const pages = []
      for (let i = 1; i <= totalPage; i++) {
        pages.push({
          value: Number(i),
          label: String(i)
        })
      }

      return pages
    }

    return []
  }, [pagination])

  const limitValue = useMemo(() => {
    if (pagination?.limit) {
      return pagination?.limit
    }
    return null
  }, [pagination])

  const pageValue = useMemo(() => {
    if (pagination?.page) {
      return pagination?.page
    }
    return null
  }, [pagination])

  const renderHeaderData = () =>
    columns.map((col) => (
      <div key={col.id} className={cell} style={{ width: getWidth(col) }}>
        {col.header}
      </div>
    ))

  const renderHeader = () => {
    return (
      <div className="table-row">
        {withIncrement && <div className={cell}><div className="w-full h-full flex items-center justify-center">No</div></div>}
        {withCheckbox && (
          <div className={cell}>
            <div className="w-full flex items-center justify-center">
              <FormCheckbox disabled={disabled} checked={isAllChecked} onChange={toggleAll} />
            </div>
          </div>
        )}
        {renderHeaderData()}
        {actionColumn && (
          <div className={cell} style={{ width: '1px' }}>
            <div className="w-full flex items-center justify-center">{actionHeader}</div>
          </div>
        )}
      </div>
    )
  }

  const renderRows = () =>
    data.map((row, index) => (
      <div
        key={`table-${index}`}
        className="flex flex-col overflow-hidden rounded border border-gray-300 hover:bg-gray-50
                 lg:table-row lg:overflow-visible lg:rounded-none lg:border-0"
      >
        {withIncrement && (
          <Cell label="No" width="1px">
            <div className="flex justify-center">{getNumber(index)}</div>
          </Cell>
        )}
        {withCheckbox && (
          <Cell label="Select" width="1px">
            <div className="flex justify-center">
              <FormCheckbox disabled={disabled} checked={isChecked(row)} onChange={() => toggleRow(row)} />
            </div>
          </Cell>
        )}
        {columns.map((col) => {
          const value = getValue(row, col.value)
          return (
            <Cell key={col.id} label={col.header} width={getWidth(col)}>
              <div className="text-right lg:text-left">
                {col.customRender ? col.customRender(value, row, index) : value}
              </div>
            </Cell>
          )
        })}
        {actionColumn && (
          <Cell width="1px">{actionColumn(row, index)}</Cell>
        )}
      </div>
    ))

  const renderPagination = () => {
    if (pagination) {
      const { from, to } = getRange()
      return (
        <div className="flex flex-col md:flex-row justify-between py-3 text-sm gap-3 md:gap-0">
          <span className="w-full md:w-fit flex flex-row justify-center md:justify-start">
            Showing {from} to {to} of {pagination.totalData} Data
          </span>

          <div className="w-full md:w-fit flex flex-col gap-3 md:gap-1">
            <div className="w-full flex flex-row gap-1 items-center justify-center md:justify-end">
              <span>Select</span>
              <div className="min-w-25 w-25">
                <FormSelect
                  options={[
                    { value: 10, label: '10' },
                    { value: 20, label: '20' },
                    { value: 30, label: '30' },
                    { value: 40, label: '40' },
                    { value: 50, label: '50' },
                    { value: 60, label: '60' },
                    { value: 70, label: '70' },
                    { value: 80, label: '80' },
                    { value: 90, label: '90' },
                    { value: 100, label: '100' },
                  ]}
                  optionPosition="top"
                  value={limitValue}
                  onChange={(value) => {
                    const parseValue = Number(value)
                    onLimitChange?.(parseValue)
                  }}
                  searchable
                />
              </div>
              <span>row data</span>
            </div>

            <div className="w-full flex flex-row gap-1 items-center justify-center md:justify-end">
              <span>Select Page</span>
              <div className="min-w-25 w-25">
                <FormSelect
                  options={getPages}
                  optionPosition="top"
                  value={pageValue}
                  onChange={(value) => {
                    const parseValue = Number(value)
                    onPageChange?.(parseValue)
                  }}
                  searchable
                />
              </div>
              <span>of {pagination?.totalPage} {pagination?.totalPage > 1 ? 'pages' : 'page'}</span>
            </div>
          </div>
        </div>
      )
    }

    return null
  }

  const Cell = ({ label, width, children }: TCell) => (
    <div
      className={`${cell} ${label ? 'justify-between' : 'justify-end'} ${width ? 'lg:w-(--col-w)' : ''
        }`}
      style={width ? ({ '--col-w': width } as React.CSSProperties) : undefined}
    >
      {label && <span className="font-semibold text-gray-500 lg:hidden">{label}</span>}
      {children}
    </div>
  )

  return (
    <div className={`w-full max-w-full relative ${disabled ? 'pointer-events-none' : ''}`}>
      <div className="overflow-x-auto no-scrollbar">
        <div className={`grid grid-cols-1 gap-3 ${gridCols} lg:table lg:w-full lg:border-collapse lg:border lg:border-gray-300`}>
          <div className="hidden lg:table-header-group bg-gray-100 font-semibold">
            {renderHeader()}
          </div>

          <div className="contents lg:table-row-group">{renderRows()}</div>

          {withFooter && (
            <div className="hidden lg:table-footer-group bg-gray-100 font-semibold">
              {renderHeader()}
            </div>
          )}
        </div>
      </div>

      {data.length === 0 && (
        <div className="py-6 text-center text-gray-500">No data available</div>
      )}

      {renderPagination()}

      {isLoading && (
        <div className="w-full h-full absolute top-0 left-0 rounded backdrop-blur flex flex-row gap-1 items-center justify-center">
          <IoReloadOutline className="animate-spin" />
          <span>{loadingText ?? 'Loading...'}</span>
        </div>
      )}
    </div>
  )
}

export default Table