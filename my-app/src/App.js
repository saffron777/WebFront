import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TemporalKey from './Components/LoginFormulario/TemporalKey';
import LoginForm from './Components/LoginFormulario/LoginForm';
import Sidebar from './Components/LoginFormulario/sidebar';




function App() {
  return (
    <div>
     <Sidebar/>
    </div>
    
  );
}

export default App;
