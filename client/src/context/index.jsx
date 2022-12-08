import { createContext, useContext} from 'react'

const AppStateContext = createContext()

export const useUpdateAppState = () => useContext(AppStateContext)

export default AppStateContext