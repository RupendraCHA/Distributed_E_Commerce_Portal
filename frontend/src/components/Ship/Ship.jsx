import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Ship.css';
import { useSelector } from 'react-redux';

const Ship = ({ iterationData, currentSection }) => {
  const navigate = useNavigate();
  
  const userRole = useSelector((state) => state.auth.user?.role);

  const handleViewClick = (eachName, e) => {
    if (eachName === 'Warehouses') {
      navigate('/distributor/warehouses');
    }
    else if (eachName === 'Shipping') {
      // navigate('/distributor/inventory');
      if (userRole === "distributor"){
        navigate('/inventoryOrders');
      }else {
        navigate('/');
      }
    }
    e.stopPropagation(); // Prevent the card click event from firing
  };

  return (
    <section id="products" className="container ship-content-section">
      <div className="ship-products-section-categories-container">
        <div className="ship-categories-section">
          <h2 className="ship-product-title category">{currentSection}</h2>

          <ul className="ship-cards-section">
            {Array.isArray(iterationData) &&
              iterationData.map((eachName, index) => (
                <li key={index} className="ship-card">
                  {console.log(eachName)}
                  <h2>{eachName}</h2>
                  <p className="ship-card-text">Greetings, Explore our Items</p>
                  <button
                    type="button"
                    className="ship-view-button"
                    onClick={(e) => handleViewClick(eachName, e)}
                  >
                    View
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

Ship.propTypes = {
  iterationData: PropTypes.array.isRequired,
  currentSection: PropTypes.string.isRequired,
};

export default Ship;
