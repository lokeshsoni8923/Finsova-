'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  IconButton
} from '@mui/material'

interface Product {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'FIN mATM',
    price: 1600.0,
    image: '/images/product/fin-matm.webp',
    quantity: 1
  },
  {
    id: '2',
    name: 'Mantra MFS 110 L1',
    price: 3200.0,
    image: '/images/product/MFS110.png',
    quantity: 1
  },
  {
    id: '3',
    name: 'MATM DEVICE',
    price: 2000.0,
    image: '/images/product/payment_terminal_01.jpg',
    quantity: 1
  },
  {
    id: '4',
    name: 'AXIS CDM-CARD',
    price: 50.0,
    image: '/images/product/Axis.jpg',
    quantity: 1
  },
  {
    id: '5',
    name: 'COMBO mATM+MANTRA',
    price: 4000.0,
    image: '/images/product/BIO-MATM.png',
    quantity: 1
  }
]

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [cart, setCart] = useState<Product[]>([])

  const updateQuantity = (productId: string, increment: boolean) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === productId
          ? {
              ...product,
              quantity: increment
                ? product.quantity + 1
                : Math.max(1, product.quantity - 1)
            }
          : product
      )
    )
  }

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id)
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      }
      return [...prevCart, { ...product }]
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Product / Buy Product
      </Typography>

      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 3
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'contain', p: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  align="center"
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="center"
                  sx={{ mb: 2 }}
                >
                  Price: ₹{product.price.toFixed(2)}
                </Typography>

                {/* Quantity Controls */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(product.id, false)}
                    sx={{ border: '1px solid', borderColor: 'divider' }}
                  >
                    <i className="tabler-minus" />
                  </IconButton>
                  <Typography>{product.quantity}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(product.id, true)}
                    sx={{ border: '1px solid', borderColor: 'divider' }}
                  >
                    <i className="tabler-plus" />
                  </IconButton>
                </Box>

                {/* Add to Cart */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => addToCart(product)}
                    sx={{
                      bgcolor: 'primary.light',
                      '&:hover': { bgcolor: 'primary.main' }
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Cart Section */}
      {cart.length > 0 && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            🛒 Your Cart
          </Typography>
          {cart.map(item => (
            <Card
              key={item.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                mb: 2,
                boxShadow: 2
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 80, height: 80, objectFit: 'contain', mr: 2 }}
                image={item.image}
                alt={item.name}
              />
              <Box sx={{ flex: 1 }}>
                <Typography>{item.name}</Typography>
                <Typography variant="body2">Qty: {item.quantity}</Typography>
                <Typography variant="body2">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            </Card>
          ))}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: ₹
            {cart
              .reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )
              .toFixed(2)}
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default ProductPage
