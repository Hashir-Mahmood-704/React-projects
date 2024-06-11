import {
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { sanityClient } from "./sanityClient"
import { SanityUserResponseType } from "./types"
import { sanityUserFetchingQuery } from "./utils/sanityQueries"

const userContext = createContext<null | {
  userData: SanityUserResponseType | null
}>(null)

export const useUserContext = () => useContext(userContext)

const AppContext = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    console.log("Running appContext useEffect")
    const query = sanityUserFetchingQuery()
    sanityClient.fetch(query).then((res) => {
      console.log(res)
      setUserData(res[0])
    })
  }, [])
  return (
    <userContext.Provider value={{ userData }}>{children}</userContext.Provider>
  )
}

export default AppContext
