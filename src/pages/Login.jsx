import React from 'react'
import { FaUserLarge } from "react-icons/fa6";
import { Link } from 'react-router-dom'; 

const Login = () => {
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
            <form className="login-form">
              <input type="text" className='form-control' placeholder='userid' />
              <input type="password" className='form-control' placeholder='userpass' />
              <button type='submit' className='btn btn-primary rounded submit'>로그인</button>
              <Link to="/joina" className='btn btn-link link'>회원가입</Link>  {/*리액트에서 link 쓰는법 위에 import해줘야한다! a태그와 같지만 페이지이동X*/}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login