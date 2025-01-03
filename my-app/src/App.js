import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationPanel from './Components/LoginFormulario/GestionNotificaciones';





function App() {
  return (
    <div>
     <NotificationPanel/>
    </div>
    
  );
}

export default App;
