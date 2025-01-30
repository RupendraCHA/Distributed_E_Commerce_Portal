

import React, { useEffect, useState } from "react";
import TrackingStatus from "./TrackingStatus";
import axios from "axios"

const TrackShipping = () => {
    const [orders, setOrders] = useState([
        { id: "ORD123", status: "processing" },
        { id: "ORD456", status: "shipped" },
        { id: "ORD789", status: "in-transit" },
        { id: "ORD101", status: "out-for-delivery" },
        { id: "ORD102", status: "delivered" }
      ]);
      const [myOrders, setMyOrders] = useState([])
      const [OrdersDetails, setOrderDetails] = useState([])

      const fetchOrdersData = async () => {
        try {
            const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3002/orders', {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response, "RESPONSE")
        setMyOrders(response.data)
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
      }

    let orderDetailsArray = []
    const getOrdersDetails = () => {
        myOrders.map((order) => {
            console.log(order.items)
            orderDetailsArray.push(...order.items)
        })
        setOrderDetails(orderDetailsArray)
        console.log(orderDetailsArray)
    }

      useEffect(() => {
        fetchOrdersData()
        getOrdersDetails()

      },[])
    
      const updateStatus = (orderId, newStatus) => {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      };
    
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
          <TrackingStatus orders={orders} myOrders={myOrders} updateStatus={updateStatus} />
        </div>
      );
    };


export default TrackShipping;

