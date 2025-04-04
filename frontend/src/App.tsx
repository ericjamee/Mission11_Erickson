import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './ProjectList';
import CartPage from './pages/CartPage';
import AdminBooks from './pages/AdminBooks';
import BookForm from './pages/BookForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/adminbooks" element={<AdminBooks />} />
        <Route path="/adminbooks/add" element={<BookForm />} />
        <Route path="/adminbooks/edit/:id" element={<BookForm />} />
      </Routes>
    </Router>
  );
}

export default App;
