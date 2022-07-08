import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import ConfirmAccount from './pages/ConfirmAccount';
import ForgotPass from './pages/ForgotPass';
import Login from './pages/Login';
import NewPass from './pages/NewPass';
import Register from './pages/Register';
import {AuthProvider} from './context/AuthProvider';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout/>}>
            <Route index element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='forgot-password' element={<ForgotPass/>}/>
            <Route path='forgot-password/:token' element={<NewPass/>}/>
            <Route path='confirm/:id' element={<ConfirmAccount/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
