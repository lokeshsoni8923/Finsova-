// React Imports
'use client'
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { Locale } from '@configs/i18n'

// Component Imports
import AddCommissionDrawer from './AddCommissionModal'
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { Snackbar, Alert } from '@mui/material'
import { CommissionType } from '.'
import { GetAllCommissions, DeleteCommission } from '@/app/api/master/commissionMaster/commissionMaster'
import TableFilters from '../../user/list/TableFilters'
import CommissionFilters from './CommissionFilters'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type CommissionTypeWithAction = CommissionType & {
  action?: string
}

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const CommissionListTable = ({ tableData }: { tableData?: CommissionType[] }) => {
  // States
  const [addCommissionOpen, setAddCommissionOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<CommissionType[]>([])
  const [filteredData, setFilteredData] = useState<CommissionType[]>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [successState, setSuccessState] = useState<{ popmessage: string } | null>(null)
  const [errorState, setErrorState] = useState<{ popmessage: string } | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  })

  // Hooks
  const { lang: locale } = useParams()

  // Fetch commissions data
  const fetchCommissions = async (page = 1, limit = 10) => {
    try {
      const res = await GetAllCommissions({ page, limit })

      if (res?.data?.commissions) {
        const list = res.data.commissions || []
        setData(list)
        setFilteredData(list)

        // Store pagination if needed
        setPagination(res.data.pagination)
      }
    } catch (error) {
      console.error('Failed to fetch commissions:', error)
    }
  }

  useEffect(() => {
    fetchCommissions()
  }, [])

  const handleDeleteCommission = async (id: string) => {
    try {
      const res = await DeleteCommission(id)
      if (res.success) {
        setSuccessState({ popmessage: res.message ?? 'Commission deleted successfully' })
        fetchCommissions()
      } else {
        setErrorState({ popmessage: res.message ?? 'Failed to delete commission' })
      }
    } catch (error) {
      setErrorState({ popmessage: 'Something went wrong' })
      console.error('Failed to delete commission:', error)
    }
  }

  // Column Definitions
  const columnHelper = createColumnHelper<CommissionTypeWithAction>()

  const columns = useMemo<ColumnDef<CommissionTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('service', {
        header: 'Service',
        cell: ({ row }) => (
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {row.original.service}
            </Typography>
            {row.original.serviceName && <Typography variant='body2'>{row.original.serviceName}</Typography>}
          </div>
        )
      }),
      columnHelper.accessor('operatorName', {
        header: 'Operator',
        cell: ({ row }) => <Typography>{row.original.operatorName || '-'}</Typography>
      }),
      columnHelper.accessor(row => `${row.minAmount} - ${row.maxAmount}`, {
        header: 'Amount Range',
        cell: ({ row }) => (
          <Typography>
            {row.original.minAmount ? `${row.original.minAmount} - ${row.original.maxAmount}` : 'Any'}
          </Typography>
        )
      }),
      columnHelper.accessor(row => row.commissionPercent ?? row.commission, {
        id: 'commission',
        header: 'Commission %',
        cell: ({ row }) => <Typography>{row.original.commissionPercent ?? row.original.commission}%</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          const statusValue = String(row.original.status).toLowerCase()
          const isActive = statusValue === 'active' || statusValue === 'true'
          return (
            <Chip
              label={isActive ? 'Active' : 'Inactive'}
              color={isActive ? 'success' : 'secondary'}
              size='small'
              variant='tonal'
            />
          )
        }
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton onClick={() => handleDeleteCommission(row.original._id)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton>
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Edit',
                  icon: 'tabler-edit',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => {
                      // Handle edit action
                    }
                  }
                }
              ]}
            />
          </div>
        ),
        enableSorting: false
      })
    ],
    [data, filteredData]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <CommissionFilters setData={setFilteredData} tableData={data} />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Commission'
              className='max-sm:is-full'
            />
            <Button
              color='secondary'
              variant='tonal'
              startIcon={<i className='tabler-upload' />}
              className='max-sm:is-full'
            >
              Export
            </Button>
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddCommissionOpen(!addCommissionOpen)}
              className='max-sm:is-full'
            >
              Add New Commission
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <i className='tabler-chevron-up text-xl' />,
                              desc: <i className='tabler-chevron-down text-xl' />
                            }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                          </div>
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => {
                    return (
                      <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    )
                  })}
              </tbody>
            )}
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => {
            table.setPageIndex(page)
          }}
        />
      </Card>
      <AddCommissionDrawer
        open={addCommissionOpen}
        handleClose={() => setAddCommissionOpen(!addCommissionOpen)}
        commissionData={data}
        setData={setData}
        onSuccess={fetchCommissions}
      />
      <Snackbar
        open={!!successState}
        autoHideDuration={3000}
        onClose={() => setSuccessState(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessState(null)} severity='success' variant='filled'>
          {successState?.popmessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!errorState}
        autoHideDuration={3000}
        onClose={() => setErrorState(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setErrorState(null)} severity='error' variant='filled'>
          {errorState?.popmessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default CommissionListTable
