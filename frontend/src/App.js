import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import { Navbar } from './components/navbar/Navbar';
import './App.css'
import { FullPetsCard } from './components/fullPetsCard/FullPetsCard';
import { AddNewPet } from './pages/AddNewPet';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="PaGes">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api/pets/:id" element={<FullPetsCard />} />
            <Route path="/api/pets" element={<AddNewPet />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
