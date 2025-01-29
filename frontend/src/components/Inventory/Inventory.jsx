import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Inventory.css';

const Inventory = ({ iterationData, currentSection }) => {
  const navigate = useNavigate();

  const handleViewClick = (eachName, e) => {
    e.stopPropagation();

    if (eachName === 'Inventory Management') {
      navigate('/distributor/inventory');
    }
    // Add other navigation cases as needed
  };

  return (
    <section id="inventory" className="container content-section">
      <div className="inventory-section-container">
        <div className="inventory-section">
          <h2 className="inventory-title">{currentSection}</h2>

          <ul className="inventory-cards">
            {Array.isArray(iterationData) &&
              iterationData.map((eachName, index) => (
                <li key={index} className="inventory-card">
                  <h2>{eachName}</h2>
                  <p className="card-description">
                    Manage your inventory items
                  </p>
                  <button
                    type="button"
                    className="view-btn"
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

Inventory.propTypes = {
  iterationData: PropTypes.array.isRequired,
  currentSection: PropTypes.string.isRequired,
};

export default Inventory;
