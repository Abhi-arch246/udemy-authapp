import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Verifyemail from './pages/Verifyemail';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<PublicRoutes> <Login /> </PublicRoutes>} />
          <Route path='/register' element={<PublicRoutes> <Register /> </PublicRoutes>} />
          <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
          <Route path='/verify/:token' element={<PublicRoutes><Verifyemail /> </PublicRoutes>} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;

export function ProtectedRoutes({ children }) {
  const auth = localStorage.getItem('data')
  if (auth) {
    return children
  } else {
    return <Navigate to="/" />
  }
}

export function PublicRoutes({ children }) {
  const auth = localStorage.getItem('data')
  if (auth) {
    return <Navigate to='/dashboard' />
  } else {
    return children
  }
}