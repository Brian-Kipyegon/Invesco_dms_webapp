import './App.css';
import Login from './components/Login';
import Adminpanel from './components/Adminpanel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminpanel" element={<Adminpanel />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
