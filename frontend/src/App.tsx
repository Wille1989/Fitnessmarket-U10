import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import SalesDashboard from './pages/SalesDashboard';
import GetUsersList from './pages/admin/UserList';
import UserById from './pages/admin/UserById';
import MyAccount from './pages/customer/MyAccount';
import ProductPage from './pages/product/ProductDashboard';
import CreateCategory from './pages/product/CreateCategory';

function App() {

  return (

    <Router>
      <Routes>

        <Route path='/' element={< Home />}/>
        <Route path='login' element={< Login />}/>
        <Route path='/register' element={< Register /> }/>

        {/* CUSTOMER ROUTES */}
        <Route path='profile' element={< MyAccount />}/>

        {/* PRODUCT ROUTES */}
        <Route path='productDashboard' element={< ProductPage />} />
        <Route path='productDashboard/createCategory' element={< CreateCategory />}/>

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