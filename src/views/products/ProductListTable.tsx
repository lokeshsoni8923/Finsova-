// React Imports
'use client'
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
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

// Component Imports
import TableFilters from './TableFilters'
import AddUserDrawer from './AddProduct'
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
import { string } from 'valibot'
import { useUserStore } from '@/store/useUserStore'
import router from 'next/navigation'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type UsersTypeWithAction = ProductType & {
  action?: string
}

type UserRoleType = {
  [key: string]: { icon: string; color: string }
}

type UserStatusType = {
  [key: string]: ThemeColor
}


type ProductType = {
  sNo: string
    productId: string
  productName: string
  productQuantity: number
    productPrice: number
  totalAnount: number
  newPaybleAmount: string
  orderId: string
  status: string
  remarks: string
  date:string
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

// Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'tabler-crown', color: 'error' },
  author: { icon: 'tabler-device-desktop', color: 'warning' },
  editor: { icon: 'tabler-edit', color: 'info' },
  maintainer: { icon: 'tabler-chart-pie', color: 'success' },
  user: { icon: 'tabler-user', color: 'primary' }
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// Column Definitions
const columnHelper = createColumnHelper<UsersTypeWithAction>()

const ProductlistTable = ({ tableData }:any) => {
  // States
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(...[tableData])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [refresh, setRefresh] = useState(false)
    const [successState, setSuccessState] = useState<{ popmessage: string } | null>(null)
    const [errorState, setErrorState] = useState<{ popmessage: string } | null>(null)

  // Hooks
  const { lang: locale } = useParams()


  // ✅ Fetch updated data from server
const fetchUsers = async () => {
  try {
    const res = await GetAllUser();
    if (res?.data) {
      setData(res.data);
      setFilteredData(res.data);
    }
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
};

useEffect(() => {
  fetchUsers();
}, []);

const handleDeleteUser  = async (email: string) => {
  try {
    const res = await DeleteUser(email);
    if (res.success) {
      setSuccessState({ popmessage: res.message ?? 'Operation successful' })
      fetchUsers();
    }else {
      setErrorState({ popmessage: 'User Not Deleted' })
    }
  } catch (error) {
    setErrorState({ popmessage: 'Something went wrong' })
    console.error('Failed to fetch users:', error);
  }
};
const router = useRouter()
const handleViewUser = (email: string) => {
  useUserStore.getState().setSelectedEmail(email)
  router.push('/apps/user/view')
}


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
      columnHelper.accessor('sNo', {
        header: 'S.NO.',
        cell: ({ row }) => {
          const role = row.original.sNo || 'unknown'

          return (
            <div className='flex items-center gap-2'>
            
              <Typography className='capitalize' color='text.primary'>
                {role || 'unknown'}
              </Typography>
            </div>
          )
        }
      }),
      columnHelper.accessor('productId', {
        header: 'Product Id',
        cell: ({ row }) =>
          <Typography>{row.original.productId}</Typography>
      }),
      columnHelper.accessor('productName', {
        header: 'Product Name',
        cell: ({ row }) => (
          <Typography>{row.original.productName}</Typography>
        )
      }),
      columnHelper.accessor('productQuantity', {
        header: 'Product Quantity',
        cell: ({ row }) => (
          <Typography>{row.original.productQuantity}</Typography>
        )
      }),
      columnHelper.accessor('productPrice', {
        header: 'Product Price',
        cell: ({ row }) => (
          <Typography>{row.original.productPrice}</Typography>
        )
      }),
       columnHelper.accessor('totalAnount', {
        header: 'Total Anount',
        cell: ({ row }) => (
          <Typography>{row.original.totalAnount || 'N/A'}</Typography>
        )
      }),
       columnHelper.accessor('newPaybleAmount', {
        header: 'New Payble Amount',
        cell: ({ row }) => (
          <Typography>{row.original.newPaybleAmount || 'N/A'}</Typography>
        )
      }),
      columnHelper.accessor('orderId', {
        header: 'Order Id',
        cell: ({ row }) => (
          <Typography>{row.original.orderId || 'N/A'}</Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Typography>{row.original.status || 'N/A'}</Typography>
        )
      }),
      columnHelper.accessor('date', {
        header: 'date',
        cell: ({ row }) => (
          <Typography>{row.original.date || 'N/A'}</Typography>
        )
      }),
      columnHelper.accessor('remarks', {
        header: 'Remarks',
        cell: ({ row }) => (
          <Typography>{row.original.remarks || 'N/A'}</Typography>
        )
      }),
      
        
      
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            {/* <IconButton onClick={() => handleDeleteUser(row.original.email)}>
              <i className='tabler-trash text-textSecondary' />
            </IconButton> */}
            {/* <Link href={getLocalizedUrl('/apps/user/view', locale as Locale)} className='flex'></Link> */}
            {/* <IconButton onClick={() => handleViewUser(row.original.email)}>
                <i className='tabler-eye text-textSecondary' />
            </IconButton> */}
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
                  menuItemProps: { className: 'flex items-center gap-2 text-textSecondary' }
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

  // Totals for footer row based on filtered data
  const totalCredit = useMemo(() => {
    return (filteredData || []).reduce((sum: number, row: any) => sum + (row?.creditAmount || 0), 0)
  }, [filteredData])

  const totalDebit = useMemo(() => {
    return (filteredData || []).reduce((sum: number, row: any) => sum + (row?.debitAmount || 0), 0)
  }, [filteredData])

  const totalBalance = useMemo(() => {
    return (filteredData || []).reduce((sum: number, row: any) => sum + (row?.currentBalance || 0), 0)
  }, [filteredData])

  const formatINR = (value: number) => `₹ ${Number(value || 0).toLocaleString('en-IN')}`

  return (
    <>
      <Card>
        <CardHeader title='Filters' className='pbe-4' />
        <TableFilters setData={setFilteredData} tableData={data} />
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
            
            <Button
              variant='contained'
              onClick={() => setAddUserOpen(!addUserOpen)}
              className='max-sm:is-full'
            >
              Download
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
            <tfoot>
              <tr>
                {/* Empty cell for select column */}
                <td></td>
                {/* Merge Date + Mobile + Company under TOTAL label */}
                <td colSpan={3}>
                  <Typography variant='subtitle2'>TOTAL</Typography>
                </td>
                {/* Totals for Credit, Debit, Current Balance */}
                <td>
                  <Typography variant='subtitle2'>{formatINR(totalCredit)}</Typography>
                </td>
                <td>
                  <Typography variant='subtitle2'>{formatINR(totalDebit)}</Typography>
                </td>
                <td>
                  <Typography variant='subtitle2'>{formatINR(totalBalance)}</Typography>
                </td>
                {/* Remarks column */}
                <td></td>
                {/* Action column */}
                <td></td>
              </tr>
            </tfoot>
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
      <AddUserDrawer
        open={addUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        userData={data}
        setData={setData}
        onSuccess={fetchUsers}
      />
      <Snackbar
            open={!!successState}
            autoHideDuration={3000}
            onClose={() => setSuccessState(null)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
              <Alert onClose={() => setSuccessState(null)} severity="success" variant="filled">
                {successState?.popmessage}
              </Alert>
            </Snackbar>
            <Snackbar
              open={!!errorState}
              autoHideDuration={3000}
              onClose={() => setErrorState(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert onClose={() => setErrorState(null)} severity="error" variant="filled">
                {errorState?.popmessage}
              </Alert>
            </Snackbar>
    </>
  )
}

export default ProductlistTable
