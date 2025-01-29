import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Ship = ({ iterationData }) => {
  const navigate = useNavigate();

  // Function to handle card click
  const handleProductSelection = (eachName) => {
    if (eachName === 'Warehouses') {
      // Navigate to the distributor/warehouses route
      navigate('/distributor/warehouses');
    } else {
      // Handle other card clicks (if needed)
      console.log(`Selected: ${eachName}`);
    }
  };

  return (
    <section id="products" className="container content-section">
      <div className="products-section-categories-container">
        <div className="categories-section">
          <h2 className="product-title category">Shipment</h2>

          <ul className="cards-section">
            {iterationData.map((eachName, index) => (
              <li
                key={index}
                className="card"
                onClick={() => handleProductSelection(eachName)}
              >
                <h2>{eachName}</h2>
                <p className="card-text">Greetings, Explore our Items</p>
                <button>View</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Ship;

Ship.propTypes = {
  iterationData: PropTypes.object.isRequired,
};
