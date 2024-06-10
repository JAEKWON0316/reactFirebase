import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { query, updateDoc, getDocs, addDoc,collection, where, doc, increment } from 'firebase/firestore'
import { db } from '../config/firebase'
import { getAuth } from 'firebase/auth'

const ChatRoom = () => {
  const { id:roomId } = useParams();
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return ()=>unsubscribe();
  }, [auth]);

  const enterChatRoom = async() => {
     if(!roomId || !user) return;
     const qry = query(
                   collection(db, "mchat"), 
                   where("roomId", "==", roomId),
                   where("userId", "==", user.uid));
     const snapshot = await getDocs(qry);               
    
     if(snapshot.empty){ //이미 정보가 등록되지 않은 경우에만 업데이트
       //chatroom에 회원수 1증가
       const roomRef = doc(db, 'chatroom', roomId);
       await updateDoc(roomRef, {
           memcount: increment(1)
       });

       //mchat에 대화방 참가자 추가
       const mchatRef = collection(db, 'mchat');
       await addDoc(mchatRef, {
          userid: user.uid,
          roomId: roomId,
          nick: user.displayName,
          email: user.email,
          uicon: user.photoURL
       })

       //채팅방 입장
       const chatsRef = collection(db, 'chats');
       await addDoc(chatsRef, {
           roomId: roomId,
           message: `${user.displayName}님이 입장하셨습니다.`,
           timestamp: new Date()
       })
     }              
  }
  
  useEffect(()=>{
     enterChatRoom();
  }, [roomId, user, enterChatRoom]);

  return (
    <div>{user.displayName}</div>
  )
}

export default ChatRoom