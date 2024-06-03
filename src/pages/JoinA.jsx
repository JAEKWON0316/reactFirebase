import React, {useState} from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import { Alert}  from 'react-bootstrap';
import { auth } from '../config/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

const JoinA = () => {
  const initalValues = {
    email: "",
    pass: "",
    repass: ""
  }
  const [formValues, setFormValues] = useState(initalValues);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("에러");
  const nav = useNavigate();
  
  const handleChanges = (e) => {   //여기 부분은 잘 아는게 좋다 자주쓰이는 로직.
    const { name, value } = e.target;
    setFormValues({...formValues, [name]:value});  //name값에 맞는 value값으로 바꿔라!!  
  }
  
  //검증식
  const validate = (values) => {
    let formError = true;
    const regex = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/i; //모든영문자 숫자 가능 그리고 + @꼭있어야한다  

    if(!values.email){
      formError = false;
      setError("이메일 주소를 입력 하세요.");
      setShow(true);
    }
    else if(!regex.test(values.email)){ //정규식 검증할 때 test를 써주면 된다.
      formError = false;
      setError("이메일 형식이 아닙니다.");
      setShow(true);
    }
    else if(!values.pass){
      formError = false;
      setError("비밀번호를 입력하세요.");
      setShow(true);
    }
    else if(values.pass.length < 4){
      formError = false;
      setError("비밀번호는 4자 이상이어야 합니다.");
      setShow(true);
    }
    else if(values.pass !== values.repass){ //react 에서는 === !== 이런식으로 3개를 써줘야함.
      formError = false;
      setError("비밀번호가 일치하지 않습니다.");
      setShow(true);
    }
    return formError;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validate(formValues)){
      try{
        await createUserWithEmailAndPassword(auth, formValues.email, formValues.pass);
        nav('/joinb');
      }
      catch(error){
        console.error('에러가 발생했습니다.', error);
      }
    }
  }

  console.log(formValues);

  return (
    <div className='container'>
      {
        /* 폼에러 검증 */
        show && <Alert variant="danger" onClose={()=>setShow(false)} dismissible>
        <Alert.Heading> {error} </Alert.Heading></Alert>
      }
      <div className="row justify-content-center my-5">
      </div>
      <div className="row justify-content-center mt-3">
        <div className="col-md-6 col-lg-5">
          <div className="shadow-lg p-3 mb-5 bg-white roundbox">
            <div className="login-wrap icon">
              <span><FaUserLarge /></span>
              <h1 className='mt-3'>회원가입 1단계</h1>
            </div>
            <form className="login-form" method='post'>
              <input type="text" 
                      className='form-control' 
                      placeholder='이메일'
                      name="email"
                      value={formValues.email}
                      onChange={handleChanges} 
              />
              <input type="password" 
                      className='form-control' 
                      placeholder='비밀번호' 
                      name="pass"
                      onChange={handleChanges} 
                      />
              <input type="password" 
                      className='form-control' 
                      placeholder='비밀번호확인'
                      name="repass"
                      onChange={handleChanges} 
                      />
              <button type='submit' 
                      className='btn btn-primary rounded submit'
                      onClick={handleSubmit}>다음단계</button>
              <Link to="/" className='btn btn-link link'>회원로그인</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinA