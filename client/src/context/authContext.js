import axios from 'axios'
import { createContext, useEffect, useState } from 'react'


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user') || null)
    )
    const [status, setStatus] = useState(false)
    
    
    const login = async (input) => {
        try {
            const res = await axios.post('/api/auth/login', input,{withCredentials: true,})
            const data = res.data

            if(Object.keys(data).includes('error')){
                return (data.error)
            }
            setCurrentUser(data)
            
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(()=> {
        localStorage.setItem('user', JSON.stringify(currentUser))
        setCurrentUser(currentUser)
    },[currentUser])

    return (
        <AuthContext.Provider value={{currentUser, login}}>
            {children}
        </AuthContext.Provider>
    )
}