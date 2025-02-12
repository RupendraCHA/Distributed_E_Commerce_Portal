import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import { useNavigate, useLocation, Link, useParams } from 'react-router-dom';
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
import { categories } from '../../../data/PosetraDataPage';
const ProductList = ({ productList, title, hideHeader }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { enqueueSnackbar } = useSnackbar();
  const [sapData, setSapData] = useState({});
  const [searchItem, setSearchItem] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { productcategory } = useParams();
  const [productDataList, setDataList] = useState([])

  const server_Url = import.meta.env.VITE_API_SERVER_URL


  const handleAddToCart = async (product) => {
    // console.log(product)
    const token = localStorage.getItem('token');
    const productWithQuantity = { ...product, quantity: 1 };
    // console.log(productWithQuantity)
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

  const getSelectedItemsOnly = () => {
    console.log("Search Items Here")
    let productsDataList = productList.filter((product) =>
      product.productName.toLowerCase().includes(searchItem.toLowerCase()) || 
    product.description.toLowerCase().includes(searchItem.toLowerCase())
    );
    setDataList(productsDataList)
  }

  const getAllProducts = () => {
    setDataList(productList)
    setSearchItem("")
  }

  // let categoryName = (productList[0].category).toUpperCase()

  const handleSearchByKey = (e) => {
    if (e.key === "Enter"){
      getSelectedItemsOnly()
    }
  }

  const handleInputChange = (e) => {
    setSearchItem(e.target.value)

    if (e.target.value === "") {
      setDataList(productList)
    } 
  }
  
  useEffect(() => {
    if(productcategory === "Odata"){
      setDataList(categories["Odata"])
    }
    else{
      setDataList(productList)
    }
  }, [productList])
  

  return (
    <div className="container product-container">
      {/* Breadcrumbs */}
        <div className='productlist-search-item-container'>
        <Breadcrumbs
          aria-label="breadcrumb"
          className="breadcrumbs"
          // style={{marginTop: "10"}}
        >
          {breadcrumbs.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography className="routes" style={{backgroundColor: "#000", color: "#fff", padding: "4px 10px"}}>{item.label}</Typography>
            </Link>
          ))}
        </Breadcrumbs>
        <div>
          {/* <label htmlFor='searchItem' className='search-input-label'>Search items related to <span style={{color: "#506bf2"}}>{categoryName}</span> here</label> */}
          <div className='productlist-search-icon-input-container'>
            <input value={searchItem} className='search-item-input' id='searchItem' type='text'  onChange={handleInputChange} onKeyDown={handleSearchByKey} placeholder='Enter item name ...'/>
            <FaSearch className='search-icon-symbol' onClick={getSelectedItemsOnly}/>
          </div>
          {searchItem && <div style={{textAlign: "right", marginLeft: "5px"}} onClick={getAllProducts}><button className='removing-input-text'>Clear</button></div>}

        </div>
      </div>
      
      
      

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
                  <p>Price: {product.price}</p>
                  <p>Weight: {product.weight}</p>
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
