import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import './AllOrders.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUserOrders, setUpdated, setDeductedOrderDetails, setInsufficientOrderDetails } from '../../store/userOrdersSlice';
import { getInventoryOrdersAndConsumerOrdersOnly } from '../UpdateInventoryDetails/UpdateInventoryDetails';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { FcInTransit } from "react-icons/fc";
import { CiDeliveryTruck } from "react-icons/ci";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shippedStatus, setShippedStatus] = useState("")
  const [userOwnOrders, setOwnOrders] = useState([])
  const userRole = useSelector((state) => state.auth.user?.role);
  const [shippedId, setShippedId] = useState("")
  const [consumerOrders, setConsumerOrders] = useState([])
  const [inventoryOrders, setInventoryOrders] = useState([])
  const [disWarehouses, setDisWarehouses] = useState({})
  // const [isUpdated, setIsUpdated] = useState(false)

  const [deductedProducts, setDeductedProducts] = useState([])
  const [insufficientProducts, setInsufficientProducts] = useState([])

  const dispatch = useDispatch()
  const isUpdated = useSelector((state) => state.userOrders.isUpdated)


  useEffect(() => {
    fetchOrders();
    getOtherUsersOrdersOnly()
  }, []);

  const orderFulfilmentConsumerItems = useSelector((state) => state.userOrders.userOrdersData)

  // console.log("orderFulfilmentConsumerItems",orderFulfilmentConsumerItems)
  const navigate = useNavigate()

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3002/allorders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const updatedOrders = sortedOrders.map((order) => {
        if (order.status === 'confirmed') {
          setTimeout(() => {
            updateOrderStatus(order._id, 'processing');
          }, 800); 
        // 10 seconds
        // } else if (order.status === 'processing') {
        //   setTimeout(() => {
        //     updateOrderStatus(order._id, 'delivered');
        //   }, 3600000); // 1 hour (3600000 milliseconds)
        }
      
        return order;
      });
      const ownOrders = await axios.get(
        `http://localhost:3002/orders/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOwnOrders(ownOrders.data)
      // console.log("OWN ORDERS", ownOrders.data)

      setOrders(updatedOrders);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

const getOtherUsersOrdersOnly = async () => {
  const {consumerOrders, InventoryOrders, distributorWarehouses} = await getInventoryOrdersAndConsumerOrdersOnly()
  setConsumerOrders(consumerOrders)
  setInventoryOrders(InventoryOrders)
  setDisWarehouses(distributorWarehouses)
  const token = localStorage.getItem('token');

  const response = await axios.get("http://localhost:3002/inventories", {
    headers: { Authorization: `Bearer ${token}` },
  })
  // console.log("INVENTORIES WITH WAREHOUSES", response.data)
  // console.log("Consumer Orders", consumerOrders)
  // console.log("Inventory Orders", InventoryOrders)
    // const response = await axios.get('http://localhost:3002/allorders', {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
  //     console.log("userOrdersOnly", response.data)

  //   const inventoryResponse = await axios.get('http://localhost:3002/distributor/inventory', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //   console.log("InventoryData",inventoryResponse.data)
}

  const handleOrderFullfillment = async (id, order) => {
    // console.log("ORDER FULLFILLMENT", id)
    try {
    dispatch(setUserOrders(order.items))
        const response = await axios.put(`http://localhost:3002/order/${id}/status`)
        setShippedStatus(response.data.status)
        const orderedItems = response.data.orderedItems
        // console.log(response.data.id)
        // console.log(response.data.createdAt, "ShippedDate")
        // setShippedId(response.data.id)
        // console.log("STATUS", response.data.status)
      const token = localStorage.getItem('token');

        const inventoryResponse = await axios.post("http://localhost:3002/inventories",{inventoryOrders, orderedItems, disWarehouses}, {
          headers: { Authorization: `Bearer ${token}` },
        })

        console.log(inventoryResponse.data)

        if (inventoryResponse.data.success === true) {
          dispatch(setUpdated(true))
          dispatch(setDeductedOrderDetails(inventoryResponse.data.deductedProducts))
          dispatch(setInsufficientOrderDetails(inventoryResponse.data.insufficientStockProducts))
          toast.success('Order Fullfilled successfully!');
          setTimeout(() => {
          window.location.reload()

          }, 1000)

          // navigate("/consumerOrderFullfilled")
        }
        const result = inventoryResponse.data
        // console.log(result)
        // console.log("INVENTORYS", inventoryOrders)
        // console.log("ORDERFULLFILLMENT", orderFulfilmentConsumerItems)

    } catch (error) {
        console.log("Error Occured", error)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:3002/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the local state to reflect the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const getDeliveryDate = (createdAt, days) => {
    const date = new Date(createdAt);
    date.setDate(date.getDate() + days);
    return date.toDateString(); // Formats as "Day Mon DD YYYY"
  };

  const handleIsUpdated = () => {
    dispatch(setUpdated(false))
  }

  const handleOrderDetails = () => {
      navigate("/inventoryOrders")
      dispatch(setUpdated(false))
    }
  
    const getDeliveryPrice = (type) => {
      if (type === "standard"){
        return "$0.00"
      }else if (type === "premium"){
        return "$10.00"
      }
      return "$100.00"
    }

  const OrderDetails = ({ order }) => {
      const navigate = useNavigate();
    
    
    return (<div className="order-card">
      <div className="order-header">
        <div>
          <h3 className="consumer-order-id text-blue-600 font-[SansSerif]">
            OrderId #{order._id.slice(-8).toUpperCase()}
          </h3>
          <p className="order-date font-medium">
            Placed on {format(new Date(order.createdAt), 'MMM dd, yyyy')}
            {/* Placed on {new Date(order.createdAt).toLocaleString()} */}
          </p>
        </div>
        {/* {order.status === "shipped" && <span className={`status-badge ${order.status.toLowerCase()}`}>
          shipped
        </span>} */}
        {order.status === "processing" && userRole === "distributor" && shippedStatus === "" ? <button className='fullfill-order-btn' onClick={() => handleOrderFullfillment(order._id, order)}>Fullfill Order</button> : 
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
          <span className={`status-badge1 ${order.status.toLowerCase()}`}>
            Shipped on
          </span>
          <p style={{fontSize: "13px", fontWeight: "600"}}>{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        }
        {/* {shippedStatus === "" ? "" : } */}
      </div>

      <div className="order-content">
        {/* Order Items */}
        <div className="order-section">
          <h4 className="section-title mx-2 text-3xl">Items</h4>
          <div className="item-list">
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-details">
                  {/* {console.log(item)} */}
                  <p className="item-name">{item.name}</p>
                  <p className="text-gray-400 font-normal">{item.product}</p>
                  <p className="item-quantity font-medium">Quantity: {item.quantity}</p>
                </div>
                <p className="item-price">
                  $
                  {item.price
                    ? (
                        parseFloat(item.price.replace(/[^0-9.]/g, '')) *
                        item.quantity
                      ).toFixed(2)
                    : 'N/A'}
                </p>
              </div>
            ))}
          </div>
          <div className="order-item my-2">
                <div className="item-details">
                  <p className="item-name">{order.deliveryType === "airMail" ? "Air" :order.deliveryType.slice(0,1).toUpperCase() + order.deliveryType.slice(1,order.deliveryType.length)} Delivery</p>
                </div>
                <p className="item-price">
                {getDeliveryPrice(order.deliveryType)}
                </p>
          </div>
        </div>
        

        {/* Delivery Address */}
        <div className="order-section">
          <h4 className="font-bold mb-2 text-xl text-blue-500">Delivery Address</h4>
          <div className="address-details font-medium">
            <p>{order.address.addressLine1}</p>
            {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
            <p>{`${order.address.city}, ${order.address.state} ${order.address.zipCode}`}</p>
          </div>
        </div>

        {/* Delivery Type */}
        <div className="order-section">
          <h4 className="font-bold mb-2 text-blue-500 text-xl">Estimated Delivery on</h4>
          <p className="delivery-type font-medium text-0.2xl">
            {order.deliveryType === 'standard'
              ? `Order will be delivered on ${getDeliveryDate(
                  order.createdAt,
                  6
                )}`
              : order.deliveryType === 'premium'
              ?  `Order will be delivered on ${getDeliveryDate(
                  order.createdAt,
                  3
                )}`
              : order.deliveryType === 'airWalk'
              ? `Order will be delivered on ${getDeliveryDate(
                  order.createdAt,
                  1
                )}`
              : 'Invalid delivery type'}
          </p>

          {userRole === 'user' && (
            <div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="total-row">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
          <p className="payment-method font-medium">Paid via {order.paymentMethod}</p>
        </div>
      </div>
    </div>)
};

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <span>Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error-container">{error}</div>
        <button onClick={fetchOrders} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-container">
        <h1 className="page-title">Consumers Orders</h1>
        <div className="empty-state">
          <h2 className="empty-state-title">No orders found</h2>
          <p className="empty-state-message">
            Looks like you haven&apos;t placed any orders yet.
          </p>
        </div>
      </div>
    );
  }

  return (<>
    {/* {isUpdated ? <div>
        <h1>FilfilledOrderDetails</h1>
        <button className='btn btn-primary' onClick={handleOrderDetails}>Back</button>
    </div> : <div className="orders-container">
      <h1 className="page-title"> Consumer Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <OrderDetails key={order._id} order={order} />
        ))}
      </div>
    </div>} */}
    <div className="orders-container">
      {/* <h1 className="page-title"> Consumer Orders</h1> */}
      <h1 className="text-3xl font-bold flex items-center">
        {/* <CiDeliveryTruck className='consumer-order-icon' style={{fontWeight: "bold"}}/> */}
        Consumer Orders
      </h1>
      <div className="orders-list">
        {orders.map((order) => (
          <OrderDetails key={order._id} order={order} />
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    </>
  );
};

Orders.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        productName: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      })
    ).isRequired,
    address: PropTypes.shape({
      addressLine1: PropTypes.string.isRequired,
      addressLine2: PropTypes.string,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipCode: PropTypes.string.isRequired,
    }).isRequired,
    total: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    deliveryType: PropTypes.string.isRequired, // Add deliveryType to PropTypes
  }).isRequired,
};

export default Orders;
