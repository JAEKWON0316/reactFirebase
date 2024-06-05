import React, {useState, useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthValue } from '../context/AuthProvider'
import { db, auth } from '../config/firebase'  //firebase 데이터베이스 변수 받아오기
import { addDoc, collection, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const ChatLobby = () => {   //provider에서 바로 뿌려주는것이다. 
  const [roomname, setRoomname] = useState("");
  const [roomList, setRoomList] = useState([]); //useState 배열 타입이다. []은 배열 {}는 오브젝트
  const { nick, userIcon, email } = useAuthValue();
  const nav = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(()=>{  //promise와 똑같다.
        nav("/login");
      })
      .catch((err) => console.error('로그아웃하다가 삑사리', err));
  }
  
  //db의 chatroom에서 읽기
  const getRoom = () => {
    const sql = query(collection(db, 'chatroom'), orderBy("timestamp", "desc"));
    onSnapshot(sql, (res) => {
      const rooms = res.docs.map(doc => ({
        ...doc.data()
      }));
      setRoomList(rooms);
    });
  }

  useEffect(()=>{
    getRoom();
  }, []);

  //db의 chatroom이라는 테이블에 쓰기(insert)
  const handleMakeRoom = async (e) => {
    e.preventDefault();
    const dbref = collection(db, 'chatroom');
      await addDoc(dbref,{
        timestamp: serverTimestamp(),
        title: roomname,
        master:nick,
        email
      });
      setRoomname("");
  }

  return (
    <div className="container">
       <div className="header text-center">
           <img src={userIcon} alt={nick} className="usericon"/>
           <h2 className="text-center">{nick}님 환영합니다.</h2>
           <button type="button" onClick={logout} className="btn btn-warning">로그아웃</button>
       </div>
       <form className="makechat my-4" method="post" onSubmit={handleMakeRoom}>
           <h2 className="text-center">채팅방개설</h2>
           <input 
               type="text"
               placeholder="채팅룸이름을 쓰세요"
               name="roomname"
               value={roomname}
               onChange={(e)=>setRoomname(e.target.value)}
           />
           <button type="submit"
                   className="btn btn-primary"
            >채팅방만들기</button>           
       </form>

       <div className="row">
        {
          (roomList) &&
            roomList.map((rs, index) => (
              <div className="col-3" key={index}> {/*반복되는 부분은 반드시 key를 만들어서 따로따로 구분되게 해야한다.*/}
                <Link to={`/chat/${rs.id}`}>{rs.title}</Link>
                <p>(방장: {rs.master}님)</p>
              </div>
            ))
        }
       </div>
    </div>
  )
}


export default ChatLobby