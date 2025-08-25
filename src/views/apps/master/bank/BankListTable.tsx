// React Imports
'use client'
import { useEffect, useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'

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
import type { ThemeColor } from '@core/types'
import type { UsersType } from '@/types/apps/userTypes'
import type { Locale } from '@configs/i18n'

import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { DeleteUser, GetAllUser } from '@/app/api/user/user'
import { Snackbar, Alert } from '@mui/material'
import { useUserStore } from '@/store/useUserStore'
import { BankType } from '.'
import BankFilters from './BankFilters'
import AddBankModal, { BankForm } from './AddBankModal'
import { GetAllBanks, UpdateBank } from '@/app/api/master/bankMaster/bankMaster'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type UsersTypeWithAction = BankType & {
  action?: string
}

type UserRoleType = {
  [key: string]: { icon: string; color: string }
}

type UserStatusType = {
  [key: string]: ThemeColor
}

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
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
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// Column Definitions
const columnHelper = createColumnHelper<UsersTypeWithAction>()

const BankListTable = ({ tableData }: any) => {
  const [rowSelection, setRowSelection] = useState({})
  const [filteredData, setFilteredData] = useState(tableData)
  const [globalFilter, setGlobalFilter] = useState('')
  const [successState, setSuccessState] = useState<{ popmessage: string } | null>(null)
  const [errorState, setErrorState] = useState<{ popmessage: string } | null>(null)
  const [open, setOpen] = useState(false)
  const [banks, setBanks] = useState<BankType[]>([])
  const [filtered, setFiltered] = useState<BankType[]>([])
  const [editingBank, setEditingBank] = useState<BankType | null>(null)

  // Hooks
  const { lang: locale } = useParams()

  const columns = useMemo<ColumnDef<UsersTypeWithAction, any>[]>(
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
      columnHelper.accessor('bankName', {
        header: 'Bank',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.bankName}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('paymentType', {
        header: 'Payment Type',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.paymentType}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('accountHolder', {
        header: 'Holder',
        cell: ({ row }) => {
          const holder = row.original.accountHolderName
          return <div className='flex items-center gap-2'>{holder}</div>
        }
      }),
      columnHelper.accessor('accountType', {
        header: 'Account Type',
        cell: ({ row }) => {
          const type = row.original.accountType
          return <div className='flex items-center gap-2'>{type}</div>
        }
      }),
      columnHelper.accessor('ifsc', {
        header: 'IFSC',
        cell: ({ row }) => <Typography>{row.original.ifsc}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          // Normalize status value to boolean
          const status = row.original.status
          const isActive = status === 'Active' || status === 'true'

          return (
            <Chip
              label={isActive ? 'Active' : 'Inactive'}
              color={isActive ? 'success' : 'warning'}
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
            <OptionMenu
              iconButtonProps={{ size: 'medium' }}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Download',
                  icon: 'tabler-download',
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
                },
                {
                  text: 'Edit',
                  icon: 'tabler-edit',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: () => {
                      setEditingBank(row.original)
                      setOpen(true)
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
    [banks, filteredData]
  )

  const table = useReactTable({
    data: filteredData as UsersType[],
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
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
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

  const getAvatar = (params: Pick<UsersType, 'avatar' | 'name'>) => {
    const { avatar, name } = params

    if (avatar) {
      return <CustomAvatar src={avatar} size={34} />
    } else {
      return <CustomAvatar size={34}>{getInitials(name as string)}</CustomAvatar>
    }
  }

  const fetchBanks = async () => {
    try {
      const res = await GetAllBanks()
      if (!res.success || !res.data) {
        throw new Error('No Data Found')
      }

      const bankList = res.data.banks // ✅ just the array
      setBanks(bankList)
      setFiltered(bankList)
      setFilteredData(bankList)

      // If you want pagination info in state:
      // setPagination(res.data.pagination);
    } catch (err) {
      console.error(err)
      setErrorState({ popmessage: 'Failed to load saved banks' })
    }
  }

  useEffect(() => {
    fetchBanks()
  }, [])

  const handleAdd = (newBank: BankForm) => {
    const now = new Date().toISOString()
    const bank: Omit<BankType, '_id' | 'createdAt' | 'updatedAt'> & {
      _id: string
      createdAt: string
      updatedAt: string
    } = {
      _id: String(Date.now()), // use _id as in backend schema
      bankName: newBank.bankName,
      accountNumber: newBank.accountNumber,
      accountHolder: newBank.accountHolder,
      ifsc: newBank.ifsc,
      accountHolderName: newBank.accountHolder,
      nickname: newBank.nickname,
      accountType: newBank.accountType as 'Savings' | 'Current' | 'Other',
      paymentType: newBank.paymentType as 'Cash Deposit' | 'Online Transfer',
      status: newBank.isActive ? 'Active' : 'Inactive',
      isActive: newBank.isActive,
      createdAt: now,
      updatedAt: now
    }
    const updated = [...banks, bank]
    setBanks(updated)
    setFiltered(updated)
    setOpen(false)
  }

  const handleUpdate = async (updatedBank: BankForm) => {
    if (!editingBank) return

    const res = await UpdateBank(editingBank._id, {
      bankName: updatedBank.bankName,
      accountNumber: updatedBank.accountNumber,
      ifsc: updatedBank.ifsc,
      accountHolderName: updatedBank.accountHolder,
      nickname: updatedBank.nickname,
      accountType: updatedBank.accountType as 'Savings' | 'Current' | 'Other',
      paymentType: updatedBank.paymentType as 'Cash Deposit' | 'Online Transfer',
      status: updatedBank.isActive ? 'Active' : 'Inactive'
    })

    if (res.success) {
      fetchBanks()
      setOpen(false)
      setEditingBank(null)
    } else {
      // handle error here if needed
      console.error('Update failed')
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <BankFilters setData={setFilteredData} tableData={banks} />
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
            {/* <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search User'
              className='max-sm:is-full'
            /> */}
            {/* <Button
              color='secondary'
              variant='tonal'
              startIcon={<i className='tabler-upload' />}
              className='max-sm:is-full'
            >
              Export
            </Button> */}
            <Button variant='contained' onClick={() => setOpen(true)}>
              Add Bank
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
      <AddBankModal
        open={open}
        handleClose={() => {
          setOpen(false)
          setEditingBank(null)
        }}
        initialData={editingBank || undefined}
        onSubmit={editingBank ? handleUpdate : handleAdd}
        onSuccess={() => {
          fetchBanks()
          setOpen(false)
          setEditingBank(null)
        }}
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

export default BankListTable
