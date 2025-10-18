import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/admin/Dashboard';
import SalesDashboard from './pages/SalesDashboard';
import GetUsersList from './pages/admin/UserList';
import UserById from './pages/admin/UserById';

function App() {

  return (

    <Router>
      <Routes>

        <Route path='/' element={< Home />}/>
        <Route path='login' element={< Login />}/>
        <Route path='/register' element={< Register /> }/>

        {/* CUSTOMER ROUTES */}
        <Route path='profile' element={< CustomerDashboard />}/>

        {/* SALES ROUTES */}
        <Route path='salesDashboard' element={< SalesDashboard />}/>

        {/* ADMIN ROUTES */}
        <Route path='adminDashboard' element={< AdminDashboard />}/>
        <Route path='adminDashboard/users' element={< GetUsersList />}/>
        <Route path='/adminDashboard/update/:id' element={< UserById />}/>
        
      </Routes>
    </Router>

  )
}

export default App