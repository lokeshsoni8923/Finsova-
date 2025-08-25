'use client'
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardHeader,
  Button,
  Typography,
  Chip,
  Checkbox,
  IconButton,
  TablePagination,
  Snackbar,
  Alert,
  MenuItem
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Add as AddIcon } from '@mui/icons-material'
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
  getSortedRowModel,
  FilterFn,
  Table,
  Row
} from '@tanstack/react-table'
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils'
import classnames from 'classnames'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'
import { GetAllServiceProviders, DeleteServiceProvider } from '@/app/api/master/serviceProviderMaster/serviceMaster'
import { ServiceProviderType } from '.'
import AddServiceProviderModal from './AddServiceModal'
import ServiceProviderTableFilters from './TableFilters'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type ServiceProviderTypeWithAction = ServiceProviderType & {
  action?: string
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const columnHelper = createColumnHelper<ServiceProviderTypeWithAction>()

const ServiceProviderListTable = ({ tableData }: { tableData?: ServiceProviderType[] }) => {
  // States
  const [data, setData] = useState<ServiceProviderType[]>(tableData || [])
  const [filteredData, setFilteredData] = useState<ServiceProviderType[]>(tableData || [])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editData, setEditData] = useState<ServiceProviderType | null>(null)
  const [successState, setSuccessState] = useState<{ message: string } | null>(null)
  const [errorState, setErrorState] = useState<{ message: string } | null>(null)

  const router = useRouter()

  // Fetch data
  const fetchServiceProviders = async () => {
    try {
      const res = await GetAllServiceProviders()
      console.log('Service Providers Response:', res) // Debug log

      if (!res.success || !res.data?.providers) {
        throw new Error('No provider data received')
      }

      const providerList = res.data.providers // Direct array access
      setData(providerList)
      setFilteredData(providerList)

      // If you need pagination later:
      // setPagination(res.data.pagination);
    } catch (err) {
      console.error('Fetch error:', err)
      setErrorState({ message: 'Failed to load service providers' })
    }
  }

  // Usage in useEffect
  useEffect(() => {
    fetchServiceProviders()
  }, [tableData])

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const res = await DeleteServiceProvider(id)
      if (res.success) {
        setSuccessState({ message: 'Deleted successfully' })
        // Refresh data
        const newRes = await GetAllServiceProviders()
        if (newRes?.success && newRes.data?.providers) {
          setData(newRes.data.providers)
          setFilteredData(newRes.data.providers)
        }
      } else {
        setErrorState({ message: 'Delete failed' })
      }
    } catch (err) {
      setErrorState({ message: 'Network error' })
    }
  }

  // Columns definition
  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }: { table: Table<ServiceProviderType> }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }: { row: Row<ServiceProviderType> }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
      columnHelper.accessor('providerName', {
        header: 'Provider Name',
        cell: ({ row }) => (
          <Typography variant='body2' fontWeight={500}>
            {row.original.providerName}
          </Typography>
        )
      }),
      columnHelper.accessor('serviceType', {
        header: 'Service Type',
        cell: ({ row }) => <Typography variant='body2'>{row.original.serviceType}</Typography>
      }),
      columnHelper.accessor('operatorCode', {
        header: 'Operator Code',
        cell: ({ row }) => <Chip label={row.original.operatorCode} size='small' variant='tonal' color='primary' />
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
            <IconButton
              onClick={() => {
                setEditData(row.original)
                setAddModalOpen(true)
              }}
            >
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
            <IconButton onClick={() => handleDelete(row.original._id)}>
              <i className='tabler-trash text-textSecondary' />
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
        <ServiceProviderTableFilters setData={setFilteredData} tableData={data} />
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
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
            <Button
              variant='contained'
              startIcon={<AddIcon />}
              onClick={() => {
                setEditData(null)
                setAddModalOpen(true)
              }}
              className='max-sm:w-full'
            >
              Add Service Provider
            </Button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='border-collapse w-full'>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className='p-4 text-left'>
                      {header.isPlaceholder ? null : (
                        <div
                          className={classnames('flex items-center', {
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl ml-1' />,
                            desc: <i className='tabler-chevron-down text-xl ml-1' />
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id} className='hover:bg-actionHover'>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className='p-4'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className='p-4 text-center'>
                    No service providers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <TablePagination
          component={() => <TablePaginationComponent table={table as unknown as Table<unknown>} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      </Card>

      <AddServiceProviderModal
        open={addModalOpen}
        handleClose={() => {
          setAddModalOpen(false)
          setEditData(null)
        }}
        onSuccess={() => {
          fetchServiceProviders()
          setAddModalOpen(false)
        }}
        editData={editData}
      />

      <Snackbar
        open={!!successState}
        autoHideDuration={3000}
        onClose={() => setSuccessState(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='success' onClose={() => setSuccessState(null)}>
          {successState?.message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!errorState}
        autoHideDuration={3000}
        onClose={() => setErrorState(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity='error' onClose={() => setErrorState(null)}>
          {errorState?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default ServiceProviderListTable
