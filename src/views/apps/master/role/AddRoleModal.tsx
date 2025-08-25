// import { useState } from 'react'
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   IconButton
// } from '@mui/material'
// import { useForm, Controller } from 'react-hook-form'
// import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'
// import { PermissionType } from '.'

// type AddRoleFormValues = {
//   roleName: string
//   description?: string
//   status: boolean
// }

// type AddRoleModalProps = {
//   open: boolean
//   handleClose: () => void
//   onSuccess: () => void
//   createRoleApi: (data: any) => Promise<void>
// }

// const defaultPermissionRow: PermissionType = {
//   module: '',
//   menu: '',
//   all: false,
//   add: false,
//   view: false,
//   edit: false,
//   delete: false,
//   upload: false,
//   download: false,
//   status: true,
//   id: Math.random().toString()
// }

// export default function AddRoleModal({ open, handleClose, onSuccess, createRoleApi }: AddRoleModalProps) {
//   const { control, handleSubmit, reset } = useForm<AddRoleFormValues>({
//     defaultValues: {
//       roleName: '',
//       description: '',
//       status: true
//     }
//   })

//   const [permissions, setPermissions] = useState<PermissionType[]>([defaultPermissionRow])

//   const handleCheckboxChange = (rowIndex: number, field: keyof PermissionType, value: boolean) => {
//     const updated = [...permissions]
//     updated[rowIndex] = { ...updated[rowIndex], [field]: value }

//     if (field === 'all') {
//       updated[rowIndex] = {
//         ...updated[rowIndex],
//         add: value,
//         view: value,
//         edit: value,
//         delete: value,
//         upload: value,
//         download: value
//       }
//     }
//     setPermissions(updated)
//   }

//   const handleFieldChange = (rowIndex: number, field: keyof PermissionType, value: string) => {
//     const updated = [...permissions]
//     updated[rowIndex] = { ...updated[rowIndex], [field]: value }
//     setPermissions(updated)
//   }

//   const addRow = () => {
//     setPermissions([...permissions, { ...defaultPermissionRow, id: Math.random().toString() }])
//   }

//   const removeRow = (id: string) => {
//     setPermissions(permissions.filter(row => row.id !== id))
//   }

//   const onSubmit = async (formData: AddRoleFormValues) => {
//     const payload = {
//       roleName: formData.roleName,
//       description: formData.description,
//       status: formData.status ? 'Active' : 'Inactive',
//       permissions: permissions.map(({ id, ...rest }) => rest)
//     }
//     await createRoleApi(payload)
//     onSuccess()
//     reset()
//     setPermissions([defaultPermissionRow])
//     handleClose()
//   }

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth='lg' fullWidth>
//       <DialogTitle>Add Role</DialogTitle>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <DialogContent className='space-y-4'>
//           <div className='grid grid-cols-3 gap-4 items-center'>
//             <Controller
//               name='roleName'
//               control={control}
//               rules={{ required: 'Role name is required' }}
//               render={({ field, fieldState }) => (
//                 <TextField
//                   {...field}
//                   label='Role Name'
//                   size='small'
//                   error={!!fieldState.error}
//                   helperText={fieldState.error?.message}
//                   fullWidth
//                 />
//               )}
//             />
//             <Controller
//               name='description'
//               control={control}
//               render={({ field }) => <TextField {...field} label='Description' size='small' fullWidth />}
//             />
//             <Controller
//               name='status'
//               control={control}
//               render={({ field }) => (
//                 <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label='Active' />
//               )}
//             />
//           </div>

//           <Table size='small'>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Module</TableCell>
//                 <TableCell>Menu</TableCell>
//                 <TableCell>All</TableCell>
//                 <TableCell>Add</TableCell>
//                 <TableCell>View</TableCell>
//                 <TableCell>Edit</TableCell>
//                 <TableCell>Delete</TableCell>
//                 <TableCell>Upload</TableCell>
//                 <TableCell>Download</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {permissions.map((row, rowIndex) => (
//                 <TableRow key={row.id}>
//                   <TableCell>
//                     <TextField
//                       value={row.module}
//                       size='small'
//                       onChange={e => handleFieldChange(rowIndex, 'module', e.target.value)}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <TextField
//                       value={row.menu}
//                       size='small'
//                       onChange={e => handleFieldChange(rowIndex, 'menu', e.target.value)}
//                     />
//                   </TableCell>
//                   {['all', 'add', 'view', 'edit', 'delete', 'upload', 'download', 'status'].map(field => (
//                     <TableCell key={field}>
//                       <Checkbox
//                         checked={row[field as keyof PermissionType] as boolean}
//                         onChange={e => handleCheckboxChange(rowIndex, field as keyof PermissionType, e.target.checked)}
//                       />
//                     </TableCell>
//                   ))}
//                   <TableCell>
//                     <IconButton size='small' onClick={() => removeRow(row.id)}>
//                       <DeleteIcon fontSize='small' />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//               <TableRow>
//                 <TableCell colSpan={11}>
//                   <Button size='small' startIcon={<AddIcon />} onClick={addRow}>
//                     Add Permission
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} variant='outlined'>
//             Cancel
//           </Button>
//           <Button type='submit' variant='contained' color='primary'>
//             Save
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   )
// }

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Snackbar,
  Alert,
  Box,
  MenuItem,
  Select
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'
import { PermissionType, RoleType } from '.' // Assuming these are imported from your types
import { menuConfig } from '@/configs/menuConfig'
import en from '@/data/dictionaries/en.json'
import Close from '@/@menu/svg/Close'

type AddRoleFormValues = {
  roleName: string
  description?: string
  status: boolean
}

type AddRoleModalProps = {
  open: boolean
  handleClose: () => void
  onSuccess: () => void
  createRoleApi: (data: any) => Promise<{ success: boolean; message?: string }>
  updateRoleApi?: (data: any) => Promise<{ success: boolean; message?: string }>
  editData?: RoleType | null
}

const defaultPermissionRow: PermissionType = {
  module: '',
  menu: '',
  all: false,
  add: false,
  view: false,
  edit: false,
  delete: false,
  upload: false,
  download: false,
  status: true,
  id: Math.random().toString()
}

export default function AddRoleModal({
  open,
  handleClose,
  onSuccess,
  createRoleApi,
  updateRoleApi,
  editData
}: AddRoleModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AddRoleFormValues>({
    defaultValues: {
      roleName: '',
      description: '',
      status: true
    }
  })

  const [permissions, setPermissions] = useState<PermissionType[]>([])
  const [successState, setSuccessState] = useState<{ message: string } | null>(null)
  const [errorState, setErrorState] = useState<{ message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form when editData changes OR prefill all modules/submenus for "create"
  useEffect(() => {
    if (!open) return

    if (editData) {
      // If editing, keep the existing role's permissions (preserve previous behavior)
      reset({
        roleName: editData.roleName,
        description: editData.description,
        status: editData.status === 'Active'
      })

      setPermissions(
        editData.permissions.map(p => ({
          ...p,
          id: Math.random().toString()
        }))
      )
      return
    }

    // Create-mode: prefill all modules and all their submenus with permissions = true
    reset({
      roleName: '',
      description: '',
      status: true
    })

    const prefilled: PermissionType[] = []
    menuConfig.forEach(group => {
      group.submenus.forEach(sub => {
        prefilled.push({
          module: group.labelKey,
          menu: sub.labelKey,
          all: true,
          add: true,
          view: true,
          edit: true,
          delete: true,
          upload: true,
          download: true,
          status: true,
          id: Math.random().toString()
        })
      })
    })

    setPermissions(prefilled)
  }, [editData, reset])

  const handleCheckboxChange = (rowIndex: number, field: keyof PermissionType, value: boolean) => {
    const updated = [...permissions]
    updated[rowIndex] = { ...updated[rowIndex], [field]: value }

    if (field === 'all') {
      updated[rowIndex] = {
        ...updated[rowIndex],
        add: value,
        view: value,
        edit: value,
        delete: value,
        upload: value,
        download: value
      }
    }
    setPermissions(updated)
  }

  const handleFieldChange = (rowIndex: number, field: keyof PermissionType, value: string) => {
    const updated = [...permissions]
    updated[rowIndex] = { ...updated[rowIndex], [field]: value }
    setPermissions(updated)
  }

  const addRow = () => {
    setPermissions([
      ...permissions,
      {
        ...defaultPermissionRow,
        id: Math.random().toString()
      }
    ])
  }

  const removeRow = (id: string) => {
    if (permissions.length > 1) {
      setPermissions(permissions.filter(row => row.id !== id))
    } else {
      setErrorState({ message: 'At least one permission is required' })
    }
  }

  const validatePermissions = (perms: PermissionType[]) => {
    return perms.every(p => p.module.trim() && p.menu.trim())
  }

  const onSubmit = async (formData: AddRoleFormValues) => {
    if (!formData.roleName.trim()) {
      setErrorState({ message: 'Role name is required' })
      return
    }

    if (!validatePermissions(permissions)) {
      setErrorState({ message: 'Please complete Module and Menu for all permissions' })
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        roleName: formData.roleName.trim(),
        description: formData.description?.trim(),
        status: formData.status ? 'Active' : 'Inactive',
        permissions: permissions.map(({ id, ...rest }) => rest)
      }

      if (editData && updateRoleApi) {
        // For update, use the existing roleCode and call update API
        const res = await updateRoleApi({
          ...payload,
          roleCode: editData.roleCode // Keep the original roleCode
        })
        if (res?.success) {
          setSuccessState({ message: 'Role updated successfully' })
          onSuccess()
          handleClose()
        }
      } else {
        // For new role, generate roleCode and use create API
        const res = await createRoleApi({
          ...payload,
          roleCode: `${formData.roleName.trim().replace(/\s+/g, '').toUpperCase()}_${Math.floor(1000 + Math.random() * 9000)}`
        })
        if (res?.success) {
          setSuccessState({ message: 'Role created successfully' })
          onSuccess()
          handleClose()
        }
      }
    } catch (err) {
      setErrorState({ message: 'An error occurred' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleModalClose = () => {
    reset()
    setPermissions([defaultPermissionRow])
    handleClose()
  }

  const navigation = en.navigation as Record<string, string>

  return (
    <>
      <Dialog open={open} onClose={handleModalClose} maxWidth='lg' fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {editData ? 'Edit Role' : 'Add New Role'}
          <IconButton onClick={handleModalClose}>
            <Close fontSize='small' />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3, mb: 4 }}>
              <Controller
                name='roleName'
                control={control}
                rules={{ required: 'Role name is required' }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Role Name'
                    size='small'
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />

              <Controller
                name='description'
                control={control}
                render={({ field }) => <TextField {...field} label='Description' size='small' fullWidth />}
              />

              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Switch {...field} checked={field.value} color='success' />}
                    label={field.value ? 'Active' : 'Inactive'}
                    sx={{ ml: 0 }}
                  />
                )}
              />
            </Box>
            <Box sx={{ maxHeight: 400, overflow: 'auto', border: '1px solid', borderColor: 'divider' }}>
              <Table size='small' sx={{ border: '1px solid', borderColor: 'divider' }}>
                <TableHead sx={{ backgroundColor: 'action.hover' }}>
                  <TableRow>
                    {['Module', 'Menu', 'All', 'Add', 'View', 'Edit', 'Delete', 'Upload', 'Download', ''].map(
                      header => (
                        <TableCell key={header} sx={{ fontWeight: 600 }}>
                          {header}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {menuConfig.map(group =>
                    group.submenus.map((submenu, subIndex) => {
                      // find corresponding permission row (should exist because of the useEffect prefill)
                      const rowIndex = permissions.findIndex(
                        r => r.module === group.labelKey && r.menu === submenu.labelKey
                      )

                      // fallback row if not found (defensive)
                      const row =
                        rowIndex !== -1
                          ? permissions[rowIndex]
                          : {
                              module: group.labelKey,
                              menu: submenu.labelKey,
                              all: true,
                              add: true,
                              view: true,
                              edit: true,
                              delete: true,
                              upload: true,
                              download: true,
                              status: true,
                              id: `tmp-${group.key}-${submenu.key}`
                            }

                      return (
                        <TableRow key={`${group.labelKey}-${submenu.labelKey}`}>
                          {/* Module name shown once per group using rowSpan */}
                          {subIndex === 0 && (
                            <TableCell rowSpan={group.submenus.length}>
                              {navigation[group.labelKey] || group.labelKey}
                            </TableCell>
                          )}

                          {/* Submenu name */}
                          <TableCell>{navigation[submenu.labelKey] || submenu.labelKey}</TableCell>

                          {/* Individual permission toggles for this submenu */}
                          {['all', 'add', 'view', 'edit', 'delete', 'upload', 'download'].map(field => {
                            return (
                              <TableCell key={field}>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={!!row[field as keyof PermissionType]}
                                      onChange={e => {
                                        // if permission row was missing (defensive), add it; otherwise update
                                        if (rowIndex === -1) {
                                          const newRow = {
                                            ...row,
                                            [field]: e.target.checked,
                                            id: Math.random().toString()
                                          } as PermissionType
                                          setPermissions(prev => [...prev, newRow])
                                        } else {
                                          handleCheckboxChange(
                                            rowIndex,
                                            field as keyof PermissionType,
                                            e.target.checked
                                          )
                                        }
                                      }}
                                      size='small'
                                      color='primary'
                                    />
                                  }
                                  label=''
                                  sx={{ ml: 0.5 }}
                                />
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </Box>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button onClick={handleModalClose} variant='outlined' color='secondary'>
              Cancel
            </Button>
            <Button type='submit' variant='contained' disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

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
