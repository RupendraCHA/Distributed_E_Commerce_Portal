import React, { useEffect, useState } from 'react'
import "./InventoryOrders.css"

// import Inventory from '../Inventory/Inventory'
// import InventoryManagement from '../Distributor/InventoryManagement'
import InventoryOrdersManagement from '../InventoryOrdersManagement/InventoryOrdersManagement'

// import Orders from '../MyOrders/MyOrders'
import Orders from '../AllOrders/AllOrders'

import { useSelector } from 'react-redux'
import { IoMdRefresh } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

const InventoryOrders = () => {
  const userRole = useSelector((state) => state.auth.user?.role);
  const [refreshText, setRefreshText] = useState(false)

  const navigate = useNavigate()
  const userOrder = useSelector((state) => state.userOrders.userOrdersData)
  const isUpdated = useSelector((state) => state.userOrders.isUpdated)


  useEffect(() => {},[refreshText,isUpdated ])

  const handleRefresh = () => {
    navigate("/inventoryOrders")
    if (refreshText === false){
      setRefreshText(true)
    }else{
      setRefreshText(false)
    }
  }

  console.log(userOrder, "UD")

  return (
    <div className='container'>
    <span className='refresh-container' onClick={handleRefresh}>
      <button className='refresh-btn'> 
      <IoMdRefresh className='refresh-icon' />
      Refresh
      </button>
      {/* <h1 className='refresh-button-for-inventory'>Refresh</h1> */}
    </span>
    {refreshText && <div className='container inventory-orders-container'>
        {userRole === "distributor" && <div className='inventory-sub-section'><InventoryOrdersManagement/></div>}
        {/* {userRole === "distributor" && <div className='orders-sub-section'><Orders/></div>} */}
        {userRole === "distributor" && <div className='orders-sub-section'><Orders/></div>}
    </div>}
    {!refreshText && <div className='container inventory-orders-container'>
        {userRole === "distributor" && <div className='inventory-sub-section'><InventoryOrdersManagement/></div>}
        {/* {userRole === "distributor" && <div className='orders-sub-section'><Orders/></div>} */}
        {userRole === "distributor" && <div className='orders-sub-section'><Orders /></div>}
    </div>}
    </div>
  )
}

export default InventoryOrders