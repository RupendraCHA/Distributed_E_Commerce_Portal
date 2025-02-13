import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import './AllProducts.css'; // Keep this for any additional styles
import axios from 'axios';

import {posetraProducts} from "../../../data/PosetraDataPage"

const AllProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { enqueueSnackbar } = useSnackbar();
  const [sapData, setSapData] = useState({});
  const [searchItem, setSearchItem] = useState("")
  const [productDataList, setDataList] = useState(posetraProducts)

  const server_Url = import.meta.env.VITE_API_SERVER_URL



  useEffect(() => {
    getSelectedItemsOnly(productNameInput)
  },[])


  const productNameInput = useSelector((state) => state.allProducts.searchName)
  // console.log("Product Name Input", productNameInput)

  const handleAddToCart = async (product) => {
    // console.log(product)
    const token = localStorage.getItem('token');
    const productWithQuantity = { ...product, quantity: 1 };
    dispatch(addToCart(productWithQuantity));
    try {
      const response = await axios.post(
        server_Url + '/api/v1/addToCart',
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

  const getSelectedItemsOnly = (value) => {
    // console.log("Search Items Here")
    if (value !== ""){
    setSearchItem(productNameInput)

      let productsDataList = posetraProducts.filter((product) =>
        product.productName.toLowerCase().includes(value.toLowerCase()) || 
    product.description.toLowerCase().includes(value.toLowerCase())

      );
      setDataList(productsDataList)
    }
    // else if (value === ""){
    //   let productsDataList = posetraProducts.filter((product) =>
    //     product.productName.toLowerCase().includes(searchItem.toLowerCase())
    //   );
    //   setDataList(productsDataList)
    // }
  }

  const getSelectedItemsFromSearch = () => {
    // setSearchItem(productNameInput)
    let productsDataList = posetraProducts.filter((product) =>
      product.productName.toLowerCase().includes(searchItem.toLowerCase()) ||
    product.description.toLowerCase().includes(searchItem.toLowerCase())

    );
    setDataList(productsDataList)
  }

  const handleInputChange = (e) => {
    setSearchItem(e.target.value)
    if (e.target.value === ""){

      setDataList(posetraProducts)
    }

  }

  const getAllProducts = () => {
    setDataList(posetraProducts)
    setSearchItem("")

  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter"){
      getSelectedItemsFromSearch()
    }
  }


  return (
    <div className="container product-container">
      {/* Breadcrumbs */}
      <div className='search-item-container'>
        <div>
          <div className='search-icon-input-container'>
            <input value={searchItem} className='search-item-input' id='searchItem' type='text'  onChange={handleInputChange} onKeyDown={handleKeyDown} placeholder='*Search Product...'/>
            <FaSearch className='search-icon-symbol' onClick={getSelectedItemsFromSearch}/>
          </div>
        </div>
          {searchItem && <div style={{textAlign: "right", marginLeft: "5px"}} onClick={getAllProducts}><button className='removing-input-text'>Clear</button></div>}
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
            {/* <Typography className="routes">{item.label}</Typography> */}
            {/* <Typography className="routes" style={{fontSize: "20px", backgroundColor: "#000", color: "#fff"}}>Available Products</Typography> */}
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
      {productDataList.length > 0  && <Grid container spacing={2}>
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
      </Grid>}
      {productDataList.length <= 0 &&
        <div className='no-items-text-container'>
          <div>
            <h1>There are no items available with the name you entered..</h1>
            <button onClick={getAllProducts}>View All Products</button>
          </div>
        </div>
      }
    </div>
  );
};

export default AllProducts;
posetraProducts.propTypes = {
  productList: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
