import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import './Products.css';
import ProductList from '../ProductList/ProductList';
import CustomProductList from '../CustomProductList/CustomProductList';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

import { setItemName } from '../../../store/viewProductsSlice';
import { useDispatch } from 'react-redux';

const Products = ({ iterationData, currentSection }) => {
  const { productcategory } = useParams(); // Get the dynamic category from URL

  const [categoriesData, setCategoriesData] = useState(iterationData);
  const [categoryName, setCategoryName] = useState('');
  const [showInputError, setInputError] = useState(false)
  console.log(currentSection);
  console.log(iterationData);

  const dispatch = useDispatch()

  const navigate = useNavigate();
  const handleProductSelection = (product) => {
    if (product === 'Salt') {
      navigate('/products/salts');
    } else if (product === 'Medicines') {
      navigate('/products/medicines');
    } else if (product === 'Fries') {
      navigate('/products/fries');
    } else if (product === 'Curatum') {
      navigate('/products/curatum');
    } else if (product === 'Hanelytics') {
      navigate('/products/hanelytics');
    } else if (product === 'DMAG') {
      navigate('/products/dmag');
    } else if (product === 'Haneya') {
      navigate('/products/haneya');
    } else if (product === 'Posetra') {
      navigate('/products/posetra');
    } else if (product === 'Chocolates') {
      navigate('/products/chocolates');
    } else if (product === 'Materials') {
      navigate('/products/Odata');
    }
  };

  // console.log(iterationData)

  if (productcategory) {
    const currentCategoryData = iterationData[productcategory];
    console.log(currentCategoryData);
    if (currentCategoryData.customProduct) {
      return <CustomProductList productData={currentCategoryData} />;
    }
    return (
      <ProductList
        productList={currentCategoryData}
        title={`${
          productcategory.charAt(0).toUpperCase() + productcategory.slice(1)
        } List`}
      />
    );
  }

  const getProductsData = () => {
    return <h1>Hello</h1>;
  };

  const getOnlySelectedCategory = () => {
    if (categoryName === 'Salt') {
      navigate('/products/salts');
      setCategoryName('');
    } else if (categoryName === 'Medicines') {
      navigate('/products/medicines');
      setCategoryName('');
    } else if (categoryName === 'Chocolates') {
      navigate('/products/chocolates');
      setCategoryName('');
    } else if (categoryName === 'Fries') {
      navigate('/products/fries');
      setCategoryName('');
    } else if (categoryName === 'Materials') {
      navigate('/products/Odata');
      setCategoryName('');
    }
  };

  const options = [
    'Chocolates',
    'Salt',
    'Fries',
    'Medicines',
    'Equipment',
    'Pumps',
  ];

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
    } else if (eachName === 'Medicines') {
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

  const goToAllProducts = () => {

    if (categoryName !== ""){
      dispatch(setItemName(categoryName))
      navigate('/viewProducts');
    }
  }

  const removeInputText = () => {
    setCategoryName("")
  }

  const handleInputChange = (e) => {
    setCategoryName(e.target.value)
  }

  const getCategoryName = (currentSection) => {

    if (currentSection === "Products"){
      return "Product Categories"
    }else {
      return currentSection
    }
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
                onChange={handleInputChange}
                style={{ cursor: 'pointer' }}

              />
              <FaSearch
                className="categories-icon"
                style={{ cursor: 'pointer' }}
                // onClick={getOnlySelectedCategory}
                onClick={goToAllProducts}
              />
            </div>
          {categoryName && <div style={{textAlign: "right"}} onClick={removeInputText}><button className='removing-input-text1'>X</button></div>}
            
          </div>

        </div>
      </div>

      <ul className="cards-section">
        {iterationData.map((eachName, index) => {
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
      </ul>
    </section>
  );
};

export default Products;

Products.propTypes = {
  iterationData: PropTypes.object.isRequired,
  currentSection: PropTypes.string.isRequired,
};
