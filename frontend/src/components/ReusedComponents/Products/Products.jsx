import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

import './Products.css';
import ProductList from '../ProductList/ProductList';
import CustomProductList from '../CustomProductList/CustomProductList';
import { setItemName } from '../../../store/viewProductsSlice';

const Products = ({ iterationData, currentSection }) => {
  const { productcategory } = useParams(); // Get the dynamic category from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const server_Url = import.meta.env.VITE_API_SERVER_URL

  const handleProductSelection = (product) => {
    if(product.toLowerCase() === "materials"){
      navigate(`/products/Odata`);
    }
    else{
      navigate(`/products/${product.toLowerCase()}`);
    }
    setFilteredProducts([])
    setProductsData([])
    setLoading(
      true
    )
  };

  const goToAllProducts = () => {
    if (categoryName !== "") {
      dispatch(setItemName(categoryName));
      navigate('/viewProducts');
      // navigate('/distributors/products');
    }
  };

  const removeInputText = () => {
    setCategoryName("");
  };

  const handleInputChange = (e) => {
    // setCategoryName(e.target.value)
    if (e.key === "Enter"){
      goToAllProducts()
    }

  };

  const getCategoryName = (currentSection) => {
    return currentSection === "Products" ? "Product Categories" : currentSection;
  };


  const getImage = (eachName) => {
    if (eachName === 'Chocolates') {
      return (
        <img
          style={{ width: '200px', height: '170px' }}
          src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738157927/istockphoto-522735736-612x612_dn3mg0.jpg"
        />
      );
    } else if (eachName === 'Salt') {
      return (
        <img
          style={{ width: '200px', height: '170px' }}
          src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738159994/Salts-1_ggzbg2.jpg"
        />
      );
      // return <img style={{width: "200px", height: "170px"}} src='https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738159581/humans-hand-pinching-sea-salt_610423-2424_aijcfr.avif'/>
    } else if (eachName === 'Fries') {
      return (
        <img
          style={{ width: '200px', height: '170px' }}
          src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738158989/l-intro-1689870440_ksj4xk.jpg"
        />
      );
    }else if (eachName === 'Sneakers') {
      return (
        <img
          style={{ width: '200px', height: '170px' }}
          src="https://res.cloudinary.com/de5vxdg21/image/upload/v1739198141/Sneakers_iwx7em.avif"
        />
      );
    } 
     else if (eachName === 'Medicines') {
      return (
        <img
          style={{ width: '200px', height: '170px' }}
          src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738159110/pills_y5i3rj.webp"
        />
      );
    } else if (eachName === 'Equipment') {
      return (
        <img
          style={{ width: '200px', height: '170px' }}
          src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738160251/medical-equipment-facilities-therapeutic-illustration_1284-27253_vfgp0n.avif"
        />
      );
    } else if (eachName === 'Materials') {
      return (
        <img
          style={{ width: '200px', height: '170px' }}
          src="https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738276588/blog-images-12_maucj3.jpg"
        />
      );
    }
  };


  useEffect(() => {
    // Fetch data from backend API
    const fetchProducts = async () => {
      try {
        const response = await axios.get(server_Url + `/products?productCategory=${encodeURIComponent(productcategory)}`);
        console.log({response:response.data})
        setProductsData(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.log(error.message)
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productcategory]);



  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  if (productcategory) {
    const currentCategoryData = productsData[productcategory];
    if (currentCategoryData?.customProduct) {
      return <CustomProductList productData={currentCategoryData} />;
    }
    return (
      <ProductList
        productList={productsData}
        title={`${productcategory.charAt(0).toUpperCase() + productcategory.slice(1)} List`}
      />
    );
  }

  return (
    <section id="products" className="container content-section">
      <div className="products-section-categories-container">
        <div className="categories-section">
          <h2 className="product-title category">
            {getCategoryName(currentSection)}
          </h2>
          <div className="search-category-with-input">
            <div className="search-category-section">
              <input
                type="text"
                placeholder="*Search Product..."
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                onKeyDown={handleInputChange}
                style={{ cursor: 'pointer' }}
              />
              <FaSearch
                className="categories-icon"
                style={{ cursor: 'pointer' }}
                onClick={goToAllProducts}
              />
            </div>
            {categoryName && <div style={{ textAlign: "right" }} onClick={removeInputText}>
              <button className='removing-input-text1'>X</button>
            </div>}
          </div>
        </div>
      </div>

      <ul className="cards-section">
        {
          iterationData.map((eachName, index) => {
            if (currentSection === 'Products') {
              return (
                <li
                  key={index}
                  className="card"
                  onClick={() => handleProductSelection(eachName)}
                >
                  {getImage(eachName)}
                  <h2>{eachName}</h2>
                  <p className="card-text">Greetings, Explore our Items</p>
                  <button>View</button>
                </li>
              );
            }
            return (
              <li
                key={index}
                className="card"
                onClick={() => handleProductSelection(eachName)}
              >
                {/* {eachName} */}
                <h2>{eachName}</h2>
                <p className="card-text"></p>
                <button>View</button>
              </li>
            );
          })}
          <li
                // key={index}
                className="card"
                // onClick={() => handleProductSelection("Materials")}
                onClick={() => navigate("/product/materials")}
              >
                {getImage("Materials")}
                <h2>Materials</h2>
                <p className="card-text"></p>
                <button>View</button>
          </li>
          <li
                // key={index}
                className="card"
                // onClick={() => handleProductSelection("Materials")}
              >
                {/* {getImage("Materials")} */}
                <h2>More can be added...</h2>
                <p className="card-text"></p>
                {/* <button>View</button> */}
          </li>
        
      </ul>
    </section>
  );
};

export default Products;

Products.propTypes = {
  currentSection: PropTypes.string.isRequired,
};
