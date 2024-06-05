import React, {useState, useEffect} from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'; 
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [useremail, setUseremail] = useState("");  //위에 userState를 import안했으면 React.useState();를 써도 똑같다!
  const [userpass, setUserpass] = useState("");
  const nav = useNavigate();

  useEffect(()=>{
    if(auth.currentUser){
      nav("/");  //로그인이 되어 있다면 바로 메인으로 넘김.
    }
  }, [nav]);

  const handleLogin = async (e) => { //리액트는 페이지를 옮기지 않는다 async 비동기!
    e.preventDefault(); //먼저 submit을 막아놓고
    if(!useremail){
      alert("이름을 입력하세요.");
      return;
    }
    else if(!userpass){
      alert("비밀번호를 입력하세요.");
      return;
    }
    else{
      try{
      const res = await signInWithEmailAndPassword(auth, useremail, userpass); //회원가입을 하면 넘겨주는 정보들
      console.log(res);
      const user = auth.currentUser; //결과값을 담아준다.

      if(user.displayName){
          nav("/");
      }
      else{  //1단계만 인증되고 2단계는 인증을 못했다 (프로필 사진이 없으니까)
          alert("회원가입이 완료되지 않았습니다. \n 회원가입을 완료해 주세요.");
          nav("/joinb");
        }

      }
      catch(err){
        alert("아이디, 또는 비밀번호가 틀렸습니다.");
        setUseremail("");
        setUserpass("");
        console.error("회원로그인 도중 에러발생", err);
        return;
     
    }

    }
  }
  return (
    <div className='container'>
      <div className="row justify-content-center my-5">
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-md-6 col-lg-5">
          <div className="shadow-lg p-3 mb-5 bg-white roundbox">
            <div className="login-wrap icon">
              <span><FaUserLarge /></span>
              <h1 className='mt-3'>LOGIN</h1>
            </div>
            <form className="login-form" onSubmit={handleLogin}>
              <input type="text"
                     className='form-control'
                     placeholder='userid' 
                     name='useremail'
                     value={useremail}
                     onChange={(e)=>setUseremail(e.target.value)}
              />
              <input type="password" 
                     className='form-control' 
                     placeholder='userpass'
                     name='userpass'
                     value={userpass}
                     onChange={(e)=>setUserpass(e.target.value)} 
              />
              <button type='submit' 
                      className='btn btn-primary rounded submit'>
                        로그인
              </button>
              <Link to="/joina" className='btn btn-link link'>회원가입</Link>  {/*리액트에서 link 쓰는법 위에 import해줘야한다! a태그와 같지만 페이지이동X*/}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login