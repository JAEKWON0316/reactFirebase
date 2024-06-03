import React, { useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './config/firebase'

import Login from './pages/Login'
import ChatLobby from './pages/ChatLobby'
import ChatRoom from './pages/ChatRoom'
import JoinA from './pages/JoinA'
import JoinB from './pages/JoinB'
 
const App = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path='joina' element={<JoinA />} />
        <Route path='joinb' element={<JoinB />} />
 /    </Routes>
    </Router>
  )
}

export default App