import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdated } from '../../store/userOrdersSlice'
import { useNavigate } from 'react-router-dom'

import "./FulfilledOrderDetails.css"

const FullfilledOrderDetails = () => {

  const deductedOrderDetails = useSelector((state) => state.userOrders.deductedOrderDetails)
  const insufficientOrderDetails = useSelector((state) => state.userOrders.insufficientOrderDetails)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(deductedOrderDetails)
  console.log(insufficientOrderDetails)
  const orders = deductedOrderDetails + insufficientOrderDetails

  const handleOrderDetails = () => {
    navigate("/inventoryOrders")
    dispatch(setUpdated(false))
  }

  return (
    <div className='fullfilled-order-details-container'>
      <div>
        <h1>Consumer order Shipped</h1>
        <button className='btn btn-primary' onClick={handleOrderDetails}>View Orders</button>
      </div>
      {insufficientOrderDetails.map((product) => {
        return (<div>
          <h1>{product.productName}</h1>
        </div>)
      })}
    </div>
  )
}

export default FullfilledOrderDetails