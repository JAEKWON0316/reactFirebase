import React, { createContext, useContext } from 'react'

const AuthContext = createContext();

const AuthProvider = ({ children, value }) => { //내 자식들은 값을 모두 받아가라.
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

const useAuthValue = () => {
    return useContext(AuthContext);
}

export {AuthProvider, useAuthValue}