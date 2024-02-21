import React, { useState } from 'react'
import UserContext from './UserContext.js'
function UserContextProvider({children}) {

  const [userEmail,setUserEmail]= useState('')
  const [userPassword,setUserPassword] = useState('')

  return (
   <UserContext.Provider value={{userEmail,setUserEmail,userPassword,setUserPassword}}>
     {children}
     
   </UserContext.Provider>
  )
}

export default UserContextProvider
