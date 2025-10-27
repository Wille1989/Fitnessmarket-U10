import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/navbar/Register';
import AdminDashboard from './pages/admin/Dashboard';
import SalesDashboard from './pages/sales/SalesDashboard';
import GetUsersList from './pages/admin/UserList';
import UserById from './pages/admin/ShowUser';
import MyAccount from './pages/customer/MyAccount';
import ProductPage from './pages/product/ProductPage';
import CreateCategory from './pages/product/CreateCategory';
import CreateProduct from './pages/product/CreateProduct';
import CompareProducts from './pages/product/CompareProducts';
import Checkout from './pages/order/CreateOrder';
import Layout from './components/layout/Layout';
import Logout from './pages/auth/Logout';
import EditProduct from './pages/product/EditProduct';
import { CreateUserAccount } from './pages/admin/AdminCreate';

function App() {

  return (
  <Layout>
      <Routes>

        {/* HOME ROUTES */}
        <Route path='/' element={< Home />}/>

        {/* AUTH ROUTES */}
        <Route path='/login' element={< Login />}/>
        <Route path='/logout' element={< Logout />} />
        <Route path='/register' element={< Register /> }/>

        {/* CUSTOMER & SALES ROUTES */}
        <Route path='myprofile' element={< MyAccount />}/>
        <Route path='sales' element={< SalesDashboard />}/>

        {/* ADMIN ROUTES */}
        <Route path='/admin' element={< AdminDashboard />}/>
        <Route path='/admin/user/:id' element={< UserById />}/>
        <Route path='/admin/users' element={< GetUsersList />}/>
        <Route path='/admin/users/create' element={< CreateUserAccount />}/>
        <Route path='/admin/product/:id' element={< EditProduct />}/>
        
        {/* PRODUCT ROUTES */}
        <Route path='/product' element={< ProductPage />} />
        <Route path='/category/create' element={< CreateCategory />}/>
        <Route path='/product/create' element={< CreateProduct />}/>
        <Route path='/product/compare' element={< CompareProducts />} />
        <Route path='checkout' element={< Checkout />}/>
                   
      </Routes>
  </Layout>
  )
}

export default App