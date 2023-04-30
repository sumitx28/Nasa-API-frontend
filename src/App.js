import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const user = localStorage.getItem('token');
  return (
    <Routes>
      {user && <Route path='/' exact element={<Main />} />}
      <Route path='/signup' exact element={<Signup />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/' exact element={<Navigate replace to='/Login' />} />
    </Routes>
  );
}

export default App;
