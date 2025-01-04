import React from 'react'
import './LoginForm.css'
import './TemporalKey.css'
import loginImage from '../Assets/icon-image.png';
import { FaUser,FaLock } from "react-icons/fa";

const LoginForm = () => {
  return (
    
    
        <div className='wrapper'>
      {/* Imagen añadida */}
      <div className="image-container">
        <img src={loginImage} alt="Logo o imagen representativa" className="login-image" />
      </div>
        <form action="">
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder='Username'required />
                <FaUser className='icon'/>
            </div>
            <div className="input-box">
                <input type="password" placeholder='Password'required />
                <FaLock className='icon' />
            </div>

            <div className="remember-forgot">
               <label><input type="checkbox" />Recuerdame</label>
               <a href="">Forgot Password?</a>
            </div>

            <button type="submit">Login</button>
            
            <div className="register-link">
                <p>No te has registrado? <a href="">Registrar</a></p>
            </div>
          
        </form>
    </div>
    
  )
}

export default LoginForm