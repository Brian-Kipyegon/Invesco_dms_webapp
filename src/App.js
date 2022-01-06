import './App.css';
import Login from './components/Login';
import Adminpanel from './components/Adminpanel';
import Userpanel from './components/Userpanel';
import Admindashboard from './components/admindashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userpanel" element={<Userpanel />} />
          <Route path="/adminpanel" element={<Adminpanel />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
