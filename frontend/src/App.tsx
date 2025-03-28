import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './ProjectList';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
