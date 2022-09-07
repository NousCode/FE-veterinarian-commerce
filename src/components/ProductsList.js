import { useEffect, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Label } from '@mui/icons-material';

export default function ProductsList() {
  const [product, setProduct] = useState([]);

  const loadProducts = async () => {
    const response = await fetch('http://localhost:4000/products');
    const data = await response.json();
    setProduct(data);
  };
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <h1>ProductsList</h1>
      {product.map((product) => (
        <Card
          style={{
            marginBottom: '0.8rem',
          }}
        >
          <CardContent
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <div style={{ marginRight: "3rem" }}>
                <h3 style={{ marginBottom: "0" }}>Producto</h3>
                <Typography>{product.name}</Typography>
                <h3 style={{ marginBottom: "0" }}>Cantidad</h3>
                <Typography>{product.quantity}</Typography>
              </div>
              <div>
                <h3 style={{ marginBottom: "0" }}>Tienda</h3>
                <Typography>{product.store}</Typography>
                <h3 style={{ marginBottom: "0" }}>En bodega</h3>
                <Typography>{product.warehouse.toString()}</Typography>
              </div>
            </div>

            <div style={{ alignSelf: "center" }}>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => console.log('edit')}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="warning"
                onClick={() => console.log('delete')}
                style={{ marginLeft: "0.8rem" }}
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
