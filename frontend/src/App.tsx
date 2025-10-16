import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import SalesPage from './pages/SalesPage';

function App() {

  return (

    <Router>
      <Routes>

        <Route path='/' element={< HomePage />}/>
        <Route path='/login' element={< LoginPage />}/>
        <Route path='register' element={< RegisterPage /> }/>
        <Route path='profile' element={< ProfilePage />}/>
        <Route path='admin' element={< AdminPage />}/>
        <Route path='sales' element={< SalesPage />}/>
        

      </Routes>
    </Router>

  )
}

export default App