import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateOrder from './Components/LoginFormulario/CreateServiceOrden';





function App() {
  return (
    <div>
     <CreateOrder/>
    </div>
    
  );
}

export default App;
