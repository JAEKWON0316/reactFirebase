import React, { useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { AuthProvider } from './context/AuthProvider'
import Login from './pages/Login'
import ChatLobby from './pages/ChatLobby'
import ChatRoom from './pages/ChatRoom'
import JoinA from './pages/JoinA'
import JoinB from './pages/JoinB'
 
const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [nick, setNick] = useState("");
  const[userIcon, setUserIcon] = useState("");

  const waitForAuthCahnge = () => {
    return new Promise(resolve => { //promise의 결과값을 일부러 만듦
      const unsub = onAuthStateChanged(auth, (user) => {
        if(user){
          setIsLogged(true); //ture false확인해서 나눠준다.
          setEmail(user.email);
          setNick(user.displayName);
          setUserIcon(user.photoURL);
          resolve(); //사용자 인증 성공이면 Promis에 값을 담고 해결
        }
      });
      return () => unsub(); //컴포넌트가 언마운트 될 때 구독을 해제
    });
  }
  
  //인증상태 해결
  const handleAuthChange = async() => {
    try{
      await waitForAuthCahnge();
      console.log("사용자 인증이 되어있습니다.");
    } 
    catch(error){
      console.error("오류가 발생했습니다.", error);
    }
  }
  useEffect(()=>{
    handleAuthChange();
  }, []);
  return (
    <Router>
      <AuthProvider value={{email, nick, userIcon}}>
          <Routes>
            {
              isLogged ? (
                <Route exact path='/' element={<ChatLobby />}/> //isLogged가 true일 시(로그인 완료 채팅창으로) 
              ) : (
                <Route exact path='/' element={<Login />}/>  //isLogged가 false일 시(로그인창으로)
              )
            }
            <Route path="/chat/:id" element={<ChatRoom />} />
            <Route exact path="login" element={<Login />}/>
            <Route path='joina' element={<JoinA />} />
            <Route path='joinb' element={<JoinB />} />
          </Routes>
      </AuthProvider> {/*AuthProvider로 여기 하위에 있는 모든 컴포넌트가 값을 똑같이 쓸 수 있게한다.*/}
    </Router>
  )
}

export default App