import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SalesDashboard from './pages/SalesDashboard';

function App() {

  return (

    <Router>
      <Routes>

        <Route path='/' element={< Home />}/>
        <Route path='/login' element={< Login />}/>
        <Route path='/register' element={< Register /> }/>

        {/* CUSTOMER ROUTES */}
        <Route path='profile' element={< CustomerDashboard />}/>

        {/* SALES ROUTES */}
        <Route path='salesDashboard' element={< SalesDashboard />}/>

        {/* ADMIN ROUTES */}
        <Route path='adminDashboard' element={< AdminDashboard />}/>
        {/*<Route path='admin/updateUser' element={< AdminUpdateUser />} /> */}
        

      </Routes>
    </Router>

  )
}

export default App