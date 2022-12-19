import './App.css';
import Home from './pages/Home';
import Map from './pages/Maps'
import { BrowserRouter as Router, Route, Routes,Link } from "react-router-dom";


function App() {
  return (
    <div className="App">  <Router>
    <div className="navbar">
      <div className="links">
        <Link to="/"> Home Page</Link>
        <Link to="/maps"> Map Page</Link>
      </div>
    </div>
    <Routes>
      <Route path="/" exact element={<Home/>} />
      <Route path="/maps" exact element={<Map/>} />
    </Routes>
  </Router>
    </div>
  );
}

export default App;