import { createContext, useContext } from 'react'

export type GlobalContent = {
  activeCategory: string
  setActiveCategory: (c: string) => void
}

export const SelectedCategory = createContext<GlobalContent>({
  activeCategory: 'general',
  setActiveCategory: () => undefined,
})

export const useGlobalContext = () => useContext(SelectedCategory)
