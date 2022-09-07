import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProductsForm() {
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    store: '',
    warehouse: false,
  });

  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      await fetch(`http://localhost:4000/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
      navigate('/');
    } else {
      product.quantity = parseInt(product.quantity);
      if (product.warehouse === 'true') {
        product.warehouse = true;
      } else {
        product.warehouse = false;
      }
      await fetch('http://localhost:4000/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'Content-Type': 'application/json' },
      });
      navigate('/');

    }

  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const loadProducts = async (id) => {
    const res = await fetch(`http://localhost:4000/products/${id}`);
    const data = await res.json();
    setProduct({
      name: data.name,
      quantity: data.quantity,
      store: data.store,
      warehouse: data.warehouse,
    });
    setEditing(true);
  };
  useEffect(() => {
    if (params.id) {
      loadProducts(params.id);
    }
  }, [params.id]);
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{ padding: '1em' }}>
          <Typography variant="h5" textAlign="center">
            {editing ? "Editar Producto" : "Crear Producto"}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="filled"
                label="Escribe el nombre"
                sx={{ display: 'block', mt: 1 }}
                fullWidth
                name="name"
                value={product.name}
                onChange={handleChange}
              />

              <TextField
                variant="filled"
                label="Cantidad de Producto"
                sx={{ display: 'block', margin: '0.8rem 0' }}
                fullWidth
                name="quantity"
                value={product.quantity}
                type="number"
                onChange={handleChange}
              />

              <FormControl sx={{ margin: '0.8rem 0' }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Tienda
                </InputLabel>
                <NativeSelect
                  defaultValue={'default'}
                  inputProps={{
                    name: 'store',
                    id: 'uncontrolled-native',
                  }}
                  name="store"
                  value={product.store}
                  onChange={handleChange}
                >
                  <option value={'default'}>Eliga Tienda</option>
                  <option value={'Tienda A'}>Tienda A</option>
                  <option value={'Tienda B'}>Tienda B</option>
                </NativeSelect>
              </FormControl>

              <FormControl sx={{ margin: '0.8rem 1rem' }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  En bodega
                </InputLabel>
                <NativeSelect
                  defaultValue={'default'}
                  inputProps={{
                    name: 'warehouse',
                    id: 'uncontrolled-native2',
                  }}
                  name="warehouse"
                  value={product.warehouse}
                  onChange={handleChange}
                >
                  <option value={'default'}>Estado</option>
                  <option value={true}>Verdadero</option>
                  <option value={false}>Falso</option>
                </NativeSelect>
              </FormControl>

              <Button
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ display: 'block', margin: '0.8rem 0' }}
              >
                Guardar
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
