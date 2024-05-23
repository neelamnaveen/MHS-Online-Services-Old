import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Services from './components/Services';
import InsertService from './components/InsertService'
import UpdateService from './components/UpdateService';
import About from './components/About';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';




function App() {
  return (
    <div className="App">
      <Navbar title="MHS Online Services" about="About"></Navbar>

      <Router>
        <Routes>
          <Route exact path="/" element={<Services />} />
          <Route path="/services" element={<Services />} />
          <Route path="/insertservice" element={<InsertService />} />
          <Route path="/updateservice/:id" element={<UpdateService />} />
          <Route path="/about" element={<About />} />

        </Routes>

      </Router>


    </div>
  );
}

export default App;
