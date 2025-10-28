import { Routes, Route } from 'react-router-dom';
import { MessageProvider } from './context/MessageProvider'
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SalesDashboard from './pages/sales/SalesDashboard';
import GetUsersList from './pages/admin/UserList';
import UserById from './pages/admin/ShowUser';
import MyAccount from './pages/customer/MyAccount';
import ProductPage from './pages/product/ProductPage';
import CreateProduct from './pages/product/CreateProduct';
import CompareProducts from './pages/product/CompareProducts';
import Layout from './components/layout/Layout';
import Logout from './pages/auth/Logout';
import EditProduct from './pages/product/EditProduct';
import { CreateUserAccount } from './pages/admin/AdminCreate';
import IndexOrder from './pages/order/IndexOrder';
import AdminIndexOrder from './pages/order/AdminIndexOrder';

function App() {
console.log("App.tsx is rendering");
  return (
  <MessageProvider>
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
          <Route path='/admin' element={< Home />}/>
          <Route path='/admin/user/:id' element={< UserById />}/>
          <Route path='/admin/users' element={< GetUsersList />}/>
          <Route path='/admin/users/create' element={< CreateUserAccount />}/>
          <Route path='/admin/product/:id' element={< EditProduct />}/>
          <Route path='/admin/user/orders/:id' element={< AdminIndexOrder />}/>
          
          {/* PRODUCT ROUTES */}
          <Route path='/product' element={< ProductPage />} />
          <Route path='/product/create' element={< CreateProduct />}/>
          <Route path='/product/compare' element={< CompareProducts />} />

          {/* ORDER ROUTES */}
          <Route path='/myOrders' element={< IndexOrder />}/>
        </Routes>
    </Layout>
  </MessageProvider>
  )
}

export default App