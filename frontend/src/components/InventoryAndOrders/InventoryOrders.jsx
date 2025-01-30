import React from 'react'
import "./InventoryOrders.css"

// import Inventory from '../Inventory/Inventory'
import InventoryManagement from '../Distributor/InventoryManagement'

// import Orders from '../MyOrders/MyOrders'
import Orders from '../AllOrders/AllOrders'
import { useSelector } from 'react-redux'

const InventoryOrders = () => {
  const userRole = useSelector((state) => state.auth.user?.role);

  return (
    <div className='container inventory-orders-container'>
        {userRole === "distributor" && <div className='inventory-sub-section'><InventoryManagement/></div>}
        {/* {userRole === "distributor" && <div className='orders-sub-section'><Orders/></div>} */}
        {userRole === "distributor" && <div className='orders-sub-section'><Orders/></div>}
    </div>
  )
}

export default InventoryOrders