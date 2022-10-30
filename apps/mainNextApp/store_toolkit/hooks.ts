import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import type { RootAdminState, AdminDispatch } from './adminStore'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAdminDispatch = () => useDispatch<AdminDispatch>()
export const useAdminSelector: TypedUseSelectorHook<RootAdminState> = useSelector