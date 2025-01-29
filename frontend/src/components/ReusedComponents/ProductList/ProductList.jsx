import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaSearch } from "react-icons/fa";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Breadcrumbs,
} from '@mui/material';
import './ProductList.css'; // Keep this for any additional styles
import axios from 'axios';

const ProductList = ({ productList, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { enqueueSnackbar } = useSnackbar();
  const [sapData, setSapData] = useState({});
  const [searchItem, setSearchItem] = useState("")
  const [productDataList, setDataList] = useState(productList)

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token');
    const productWithQuantity = { ...product, quantity: 1 };
    dispatch(addToCart(productWithQuantity));
    try {
      const response = await axios.post(
        'http://localhost:3002/addToCart',
        productWithQuantity,
        {
          headers: { Authorization: `Bearer ${token}` }, // Add token to headers
        }
      );

      if (response.status === 201 || response.status === 200) {
        enqueueSnackbar('Product successfully added to server cart!', {
          variant: 'success',
        });
      } else {
        console.error('Failed to sync with the server.', response.status);
        enqueueSnackbar('Failed to sync with the server.', {
          variant: 'warning',
        });
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      enqueueSnackbar(
        'An error occurred while adding the product to your cart.',
        { variant: 'error' }
      );
    }
  };

  const handleBuyNow = (product) => {
    const productWithQuantity = { ...product, quantity: 1 };
    dispatch(addToCart(productWithQuantity));
    enqueueSnackbar(`${product.productName} has been added to your cart!`, {
      variant: 'success',
    });
    navigate('/checkout');
  };
  const breadcrumbs = location.pathname
    .split('/')
    .filter((path) => path)
    .map((path, index, arr) => {
      const routePath = `/${arr.slice(0, index + 1).join('/')}`; // Build the path for the Link
      return {
        label: path.charAt(0).toUpperCase() + path.slice(1),
        path: routePath,
      }; // Capitalize the label
    });

  // Define the URL and credentials

  // Create a function to fetch data
  async function fetchData() {
    const url =
      'http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/ZMATERIAL_SRV/MaterialSet?$format=json';
    const username = 'NikhilA';
    const password = 'Nikhil@12345';
    // Encode the credentials in base64 for Basic Authentication
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

    try {
      // Make the request to the OData service
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      // Check if the response is okay
      if (response.ok) {
        const data = await response.json();
        console.log(data.d.results[0]); // Handle the data, perhaps display it on the frontend
        setSapData(data.d.results[0]);
      } else {
        console.error('Failed to fetch data', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Call the function to fetch data
  fetchData();

  async function fetchSapData() {
    const url =
      'http://52.38.202.58:8080/sap/opu/odata/VSHANEYA/ZMATERIAL_SRV/MaterialSet?$format=json';
    const username = 'NikhilA';
    const password = 'Nikhil@12345';
    // Encode the credentials in base64 for Basic Authentication
    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

    try {
      // Make the request to the OData service
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      // Check if the response is okay
      if (response.ok) {
        const data = await response.json();
        console.log(data.d.results[0]); // Handle the data, perhaps display it on the frontend
        setSapData(data.d.results[0]);
      } else {
        console.error('Failed to fetch data', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }



  // Call the function to fetch data
  fetchSapData();


  const getSelectedItemsOnly = () => {
    console.log("Search Items Here")
    let productsDataList = productList.filter((product) =>
      product.productName.toLowerCase().includes(searchItem.toLowerCase())
    );
    setDataList(productsDataList)
  }

  const getAllProducts = () => {
    setDataList(productList)
    setSearchItem("")

  }

  let categoryName = (productList[0].category).toUpperCase()


  return (
    <div className="product-container">
      {/* Breadcrumbs */}
      <div className='search-item-container'>
        <div>
          <label htmlFor='searchItem' className='search-input-label'>Search items related to <span style={{color: "#506bf2"}}>{categoryName}</span> here</label>
          <div className='search-icon-input-container'>
            <input value={searchItem} className='search-item-input' id='searchItem' type='text'  onChange={(e) => setSearchItem(e.target.value)} placeholder='Enter item name ...'/>
            <FaSearch className='search-icon-symbol' onClick={getSelectedItemsOnly}/>
          </div>
          <div style={{textAlign: "right"}} onClick={getAllProducts}><button className='removing-input-text'>Clear All</button></div>
        </div>
      </div>
      <Breadcrumbs
        aria-label="breadcrumb"
        className="breadcrumbs"
        // sx={{ marginBottom: 2 }}
      >
        {breadcrumbs.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography className="routes">{item.label}</Typography>
          </Link>
        ))}
      </Breadcrumbs>

      {/* <Typography
        variant="h5"
        component="h2"
        gutterBottom
        className="produtList-title"
      >
        {title}
      </Typography> */}
      {productDataList.length > 0 ? <Grid container spacing={2}>
        {productDataList.map((product, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className="product-card-section">
              <img
                src={product.image}
                alt={product.productName || product.saltName}
                // style={{ height: '150px', width: 'auto', objectFit: 'cover', margin: '0 auto' }}
                className="product-pic"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.productName || product.saltName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="product-price"
                >
                  Price: {product.price} | Weight: {product.weight}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  paragraph
                  style={{ color: 'white' }}
                >
                  {product.description}
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant="contained"
                    style={{ fontSize:"12px" }}
                    
                    color="success"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="outlined"
                    style={{ color: 'white',fontSize:"12px", border: '1px solid white' }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid> : (
        <div className='no-items-text-container'>
          <div>
            <h1>There are no items available with the name you entered..</h1>
            <button onClick={getAllProducts}>View All Products</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
ProductList.propTypes = {
  productList: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
