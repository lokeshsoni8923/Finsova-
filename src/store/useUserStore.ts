import { create } from 'zustand'

interface UserStore {
  selectedEmail: string | null
  setSelectedEmail: (email: string) => void
  clearSelectedEmail: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  selectedEmail: null,
  setSelectedEmail: (email) => set({ selectedEmail: email }),
  clearSelectedEmail: () => set({ selectedEmail: null })
}))


interface UserFormState {
  formData: {
    name: string
    username: string
    email: string
    contact: string
    password: string
  }
  setFormData: (data: Partial<UserFormState['formData']>) => void
  resetFormData: () => void
}

const defaultFormData = {
  name: '',
  username: '',
  email: '',
  contact: '',
  password: ''
}

export const useUserFormStore = create<UserFormState>((set) => ({
  formData: defaultFormData,
  setFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data
      }
    })),
  resetFormData: () => set({ formData: defaultFormData })
}))
