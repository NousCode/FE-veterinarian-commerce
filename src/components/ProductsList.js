import { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ProductsList() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {
    const response = await fetch('http://localhost:4000/products');
    const data = await response.json();
    setProduct(data);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/products/${id}`, {
      method: 'DELETE',
    });
    setProduct(product.filter((product) => product.id !== id));
    alert('El producto se ha eliminado satisfactoriamente.');
  };

  const handleAlert = async(id) => {
    const response = await fetch(`http://localhost:4000/products/${id}`);
    const data = await response.json();
    if (data.quantity > 0 && data.warehouse == true) {
      alert('Gracias por comprar con nosotros. Su producto se demora 16min 📦️.');
    }else if ((parseInt(data.quantity) == 0)&& data.warehouse == true) {
      alert('Por ahora no tenemos el producto en la tienda, pero si tenemos en la bodega. Su producto se demora 1 hora 📦️.');
    }else {
      alert('No tenemos existencias de ese producto. Dentro de 15 días reabasteceremos existencias.');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <h1>Lista de Productos</h1>
      {product.map((product) => (
        <Card
          style={{
            marginBottom: '0.8rem',
          }}
          key={product.id}
        >
          <CardContent style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ marginRight: '3rem' }}>
                <h3 style={{ marginBottom: '0' }}>Producto</h3>
                <Typography>{product.name}</Typography>
                <h3 style={{ marginBottom: '0' }}>Cantidad</h3>
                <Typography>{product.quantity}</Typography>
              </div>
              <div>
                <h3 style={{ marginBottom: '0' }}>Tienda</h3>
                <Typography>{product.store}</Typography>
                <h3 style={{ marginBottom: '0' }}>En bodega</h3>
                <Typography>{product.warehouse.toString()}</Typography>
              </div>
            </div>

            <div style={{ alignSelf: 'center' }}>
              <Button
                style={{ marginRight: '0.8rem' }}
                variant="contained"
                color="success"
                onClick={() => handleAlert(product.id)}
              >
                Comprar
              </Button>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate(`/products/${product.id}/edit`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(product.id)}
                style={{ marginLeft: '0.8rem' }}
              >
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
