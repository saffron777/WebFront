import React from 'react';
import './LoginForm.css';
import './TemporalKey.css'
import { FaEnvelope, FaUser, FaVoicemail } from "react-icons/fa";
import loginImage from '../Assets/icon-image.png';

const TemporalKey = () => {
  return (
    
    <div className='wrapper'>
      {/* Imagen añadida */}
      <div className="image-container">
        <img src={loginImage} alt="Logo o imagen representativa" className="login-image" />
      </div>

      <form action="">
        <h2>Ingresa tu correo</h2>
        <h6>Te enviaremos un codigo de seguridad al correo asociado a tu cuenta, porfavor ingresa tu correo: </h6>
        <div className="input-box">
          <input type="text" placeholder='Username' required />
          <FaEnvelope className='icon' />
        </div>

        <button type="submit"></button>
      </form>
    </div>
  );
}

export default TemporalKey;
