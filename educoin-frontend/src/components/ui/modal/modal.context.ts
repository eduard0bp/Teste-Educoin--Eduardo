'use client'

import { createContext } from 'react'

interface ModalContextProps {
  open: boolean
  setOpen: (value: boolean) => void
}

export const ModalContext = createContext<ModalContextProps>({
  open: false,
} as ModalContextProps)
