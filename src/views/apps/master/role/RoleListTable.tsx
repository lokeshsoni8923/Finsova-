'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Chip,
  IconButton,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  TablePagination,
  TextFieldProps
} from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  ColumnDef,
  createColumnHelper,
  FilterFn,
  ColumnFiltersState,
  flexRender
} from '@tanstack/react-table'
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils'
import { styled } from '@mui/material/styles'

import { RoleType, PermissionType, StatusType } from '@/views/apps/master/role'
import AddRoleModal from './AddRoleModal'
import { GetAllRoles, DeleteRole, CreateRole, UpdateRole } from '@/app/api/master/roleMaster/roleMaster'
import CustomTextField from '@/@core/components/mui/TextField'

type RoleListTableProps = {
  tableData?: RoleType[]
}

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type RolesTypeWithAction = RoleType & {
  action?: string
}

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
} & Omit<TextFieldProps, 'onChange' | 'value'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return (
    <CustomTextField
      {...props}
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  )
}
const columnHelper = createColumnHelper<RolesTypeWithAction>()

const RoleListTable = ({ tableData }: RoleListTableProps) => {
  // States
  const [data, setData] = useState<RoleType[]>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [addRoleOpen, setAddRoleOpen] = useState(false)
  const [editData, setEditData] = useState<RoleType | null>(null)
  const [successState, setSuccessState] = useState<{ message: string } | null>(null)
  const [errorState, setErrorState] = useState<{ message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  // Fetch roles data
  const fetchRoles = async () => {
    setIsLoading(true)
    try {
      const res = await GetAllRoles()
      if (res?.success && res.data) {
        setData(res.data)
      } else {
        setErrorState({ message: 'Failed to fetch roles' }) // Removed res.message
      }
    } catch (err) {
      setErrorState({ message: 'Failed to fetch roles' }) // Generic error
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [tableData])

  // Handle delete role
  const handleDeleteRole = async (id: string) => {
    try {
      const res = await DeleteRole(id)
      if (res.success) {
        setSuccessState({ message: res.message || 'Role deleted successfully' })
        fetchRoles()
      } else {
        setErrorState({ message: res.message || 'Failed to delete role' })
      }
    } catch (err: any) {
      setErrorState({ message: err.message || 'Failed to delete role' })
    }
  }

  // Handle add role
  const handleCreateRole = useCallback(
    async (data: {
      roleName: string
      description?: string
      roleCode: string
      status?: 'Active' | 'Inactive'
      permissions: PermissionType[]
    }) => {
      const res = await CreateRole(data)
      return { success: res.success }
    },
    []
  )

  // Handle edit role
  const handleEditRole = (role: RoleType) => {
    setEditData(role)
    setAddRoleOpen(true)
  }

  // Handle view role
  const handleViewRole = (id: string) => {
    router.push(`/apps/master/role/view/${id}`)
  }

  // Columns definition
  const columns = useMemo<ColumnDef<RolesTypeWithAction, any>[]>(
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
      columnHelper.accessor('roleName', {
        header: 'Role Name',
        cell: ({ row }) => (
          <Typography variant='body2' fontWeight={500}>
            {row.original.roleName}
          </Typography>
        )
      }),
      columnHelper.accessor('roleCode', {
        header: 'Role Code',
        cell: ({ row }) => <Chip label={row.original.roleCode} size='small' variant='tonal' color='primary' />
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: ({ row }) => (
          <Typography variant='body2' noWrap sx={{ maxWidth: 200 }}>
            {row.original.description || '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.status}
            color={row.original.status === 'Active' ? 'success' : 'secondary'}
            size='small'
            variant='tonal'
          />
        )
      }),
      columnHelper.accessor('action', {
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            {/* <IconButton onClick={() => handleViewRole(row.original._id)}>
              <VisibilityIcon fontSize='small' />
            </IconButton> */}
            <IconButton onClick={() => handleEditRole(row.original)}>
              <EditIcon fontSize='small' />
            </IconButton>
            <IconButton onClick={() => handleDeleteRole(row.original._id)}>
              <DeleteIcon fontSize='small' color='error' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    []
  )

  // Table instance
  const table = useReactTable({
    data,
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
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  // Handle modal close
  const handleModalClose = () => {
    setAddRoleOpen(false)
    setEditData(null)
    fetchRoles()
  }

  return (
    <>
      <Card>
        <CardHeader title='Roles Management' />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-b gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:w-full sm:w-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>
          <div className='flex flex-col sm:flex-row max-sm:w-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search roles...'
              className='max-sm:w-full'
            />
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={() => setAddRoleOpen(true)}
              className='max-sm:w-full'
            >
              Add Role
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <TableCell key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center ${
                            header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽'
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columns.length} className='text-center'>
                    Loading...
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columns.length} className='text-center'>
                    No roles found
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {table.getRowModel().rows.map(row => (
                  <TableRow key={row.id} hover>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
        <TablePagination
          component={() => (
            <div className='flex items-center justify-between p-4'>
              <Typography variant='body2'>
                Showing {table.getRowModel().rows.length} of {data.length} entries
              </Typography>
              <div className='flex gap-2'>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          count={table.getRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      </Card>

      <AddRoleModal
        open={addRoleOpen}
        handleClose={handleModalClose}
        onSuccess={fetchRoles}
        createRoleApi={handleCreateRole}
        updateRoleApi={async data => {
          const res = await UpdateRole(editData?._id || '', data) // Pass the ID from editData
          return {
            success: res.success
          }
        }}
        editData={editData}
      />

      <Snackbar
        open={!!successState}
        autoHideDuration={6000}
        onClose={() => setSuccessState(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity='success' onClose={() => setSuccessState(null)}>
          {successState?.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorState}
        autoHideDuration={6000}
        onClose={() => setErrorState(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity='error' onClose={() => setErrorState(null)}>
          {errorState?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default RoleListTable
