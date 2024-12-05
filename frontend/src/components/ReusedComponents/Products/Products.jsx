import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./Products.css"
import ProductList from '../ProductList/ProductList';
import CustomProductList from '../CustomProductList/CustomProductList';
const Products = ({ iterationData, currentSection }) => {
    const { productcategory } = useParams(); // Get the dynamic category from URL
    const navigate = useNavigate() 
    const handleProductSelection = (product) => {
      if (product === "Salt") {
        navigate("/products/salts");
      } else if (product === "Medicines") {
        navigate("/products/medicines");
      }
      else if (product === "Fries") {
        navigate("/products/fries");
      }
      else if (product === "Curatum") {
        navigate("/products/curatum");
      }
      else if (product === "Hanelytics") {
        navigate("/products/hanelytics");
      }
      else if (product === "DMAG") {
        navigate("/products/dmag");
      }
      else if (product === "Haneya") {
        navigate("/products/haneya");
      }
      else if (product === "Posetra") {
      navigate("/products/posetra");
      }
      else if (product === "Chocolates") {
      navigate("/products/chocolates");
      }
    };

    if(productcategory){
      const currentCategoryData = iterationData[productcategory];
      if (currentCategoryData.customProduct) {
        return <CustomProductList productData={currentCategoryData} />
      }
        return <ProductList productList={currentCategoryData} title={`${productcategory.charAt(0).toUpperCase() + productcategory.slice(1)} List`} />
    }

  return (
        <section id="products" className="content-section">
          <h2 className='product-title'>{currentSection}</h2>
          <ul className='cards-section'>
            {iterationData.map((eachName) => {
              if (currentSection === "Products"){
                return (
                  <li className='card' onClick={() => handleProductSelection(eachName)}>
                  {/* {eachName} */}
                  <h2>{eachName}</h2>
                  <p className='card-text'>Greetings, Explore our Items</p>
                  <button>View</button>
                  </li>
                )
              }
              return (
                  <li className='card' onClick={() => handleProductSelection(eachName)}>
                  {/* {eachName} */}
                  <h2>{eachName}</h2>
                  <p className='card-text'>Greetings, Explore our Items</p>
                  <button>View</button>
                  </li>
                )
            })}
          </ul>
        </section>
  )
}

export default Products