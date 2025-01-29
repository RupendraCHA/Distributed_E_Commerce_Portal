import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Ship.css';

const Ship = ({ iterationData, currentSection }) => {
  const navigate = useNavigate();

  const handleViewClick = (eachName, e) => {
    if (eachName === 'Warehouses') {
      navigate('/distributor/warehouses');
    }
    e.stopPropagation(); // Prevent the card click event from firing
  };

  return (
    <section id="products" className="container content-section">
      <div className="products-section-categories-container">
        <div className="categories-section">
          <h2 className="product-title category">{currentSection}</h2>

          <ul className="cards-section">
            {Array.isArray(iterationData) &&
              iterationData.map((eachName, index) => (
                <li key={index} className="card">
                  {console.log(eachName)}
                  <h2>{eachName}</h2>
                  <p className="card-text">Greetings, Explore our Items</p>
                  <button
                    type="button"
                    className="view-button"
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
