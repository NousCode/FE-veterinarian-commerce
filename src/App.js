import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsForm from './components/ProductsForm';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import ProductsList from './components/ProductsList';


export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Container>
        <Routes>
          <Route path='/' element={<ProductsList/>} />
          <Route path='/products/new'element={<ProductsForm/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
