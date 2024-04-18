/* frontend/src/App.js */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import Login from './components/reg_and_login/Login';
import Register from './components/reg_and_login/Register';
import { Navbar } from './components/navbar/Navbar';
import './App.css';
import { FullPetsCard } from './components/fullPetsCard/FullPetsCard';
import { AddNewPet } from './pages/AddNewPet';
import { UpdatePet } from './pages/UpdatePet';
import { AuthProvider } from './context/AuthContext';
import { FavoritePetProvider } from './context/FavoritePetContext';
import FavoritePets from './pages/FavoritePets';

import ProtectedRoute from './components/ProtectedRoute';






function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {" "}
          {/*wrap everything in AuthProvider*/}
          <FavoritePetProvider>
            <Navbar />
            <div className="PaGes">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/api/auth/login" element={<Login />} />
                <Route path="/api/auth/register" element={<Register />} />
                <Route path="/api/pets/:id" element={<ProtectedRoute><FullPetsCard /></ProtectedRoute>} />
                <Route path="/api/pets" element={<ProtectedRoute><AddNewPet /></ProtectedRoute>} />
                <Route path="/api/pets/update/:id" element={<ProtectedRoute><UpdatePet /></ProtectedRoute>} />
                <Route path="/favorite-pets" element={<ProtectedRoute><FavoritePets /></ProtectedRoute>} />
              </Routes>
            </div>
          </FavoritePetProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
