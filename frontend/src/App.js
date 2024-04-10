import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { Navbar } from './components/navbar/Navbar';
import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='PaGes'>
          <Routes>
            <Route
              path='/'
              element={ <Home /> } />
          </Routes>
      </div>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
