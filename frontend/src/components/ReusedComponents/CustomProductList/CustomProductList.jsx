import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Grid, Card, CardContent, CardMedia, Typography, Button, Breadcrumbs } from '@mui/material';
import './CustomProductList.css'; // Keep this for any additional styles

const CustomProductList = ({ productData }) => {
const { content, products } = productData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { enqueueSnackbar } = useSnackbar();

  const handleAddToCart = (product) => {
    const productWithQuantity = { ...product, quantity: 1 };
    enqueueSnackbar(`${product.productName} has been added to your cart!`, { variant: 'success' });
    dispatch(addToCart(productWithQuantity));
  };

  const handleBuyNow = (product) => {
    const productWithQuantity = { ...product, quantity: 1 };
    dispatch(addToCart(productWithQuantity));
    enqueueSnackbar(`${product.productName} has been added to your cart!`, { variant: 'success' });
    navigate('/checkout');
  };

  // Breadcrumbs logic
  const breadcrumbs = location.pathname
    .split('/')
    .filter((path) => path)
    .map((path, index, arr) => {
      const routePath = `/${arr.slice(0, index + 1).join('/')}`; // Build the path for the Link
      return { label: path.charAt(0).toUpperCase() + path.slice(1), path: routePath }; // Capitalize the label
    });

  return (
    <div className='product-container'>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" className='breadcrumbs' sx={{ marginBottom: 2 }}>
        {breadcrumbs.map((item, index) => (
          <Link key={index} to={item.path}>
            <Typography className="routes">{item.label}</Typography>
          </Link>
        ))}
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom className='productList-title'>
        {content.title}
      </Typography>
      <Card>
        <img
            src={content.image}
            alt={content.title}
            style={{ height: '150px', width: 'auto', objectFit: 'cover', margin: '0 auto'}}
          />
        
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {content.headLine}
          </Typography>
          <Typography variant="body1" paragraph>
            {content.shortDesc}
          </Typography>
          {
            content.youtubeVideo && <a href={content.youtubeVideo} target="_blank" rel="noopener noreferrer">
            Watch Video
          </a>
          }
          
        </CardContent>
      </Card>

      {/* Products List */}
      <Typography variant="h5" component="h2" gutterBottom className='produtList-title'>
        Products
      </Typography>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className='product-card-details'>
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="product-price">
                  Price: {product.price} | Contract: {product.contract}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.productDesc.join(', ')}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CustomProductList;
