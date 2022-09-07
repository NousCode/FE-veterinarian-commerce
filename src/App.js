import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsForm from './components/ProductsForm';
import Stores from './components/Stores';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Stores/>} />
        <Route path='/products/new'element={<ProductsForm/>} />
      </Routes>
    </BrowserRouter>
  )
}
