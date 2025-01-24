// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { format } from 'date-fns';
// import PropTypes from 'prop-types';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:3002/orders', {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Sort orders by date, most recent first
//       const sortedOrders = response.data.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );

//       setOrders(sortedOrders);
//       setError(null);
//     } catch (err) {
//       setError('Failed to fetch orders');
//       console.error('Error fetching orders:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const OrderDetails = ({ order }) => (
//     <div className="bg-white shadow-md rounded-lg p-6 mb-4">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-lg font-semibold">
//             Order #{order._id.slice(-8)}
//           </h3>
//           <p className="text-sm text-gray-600">
//             Placed on {format(new Date(order.createdAt), 'MMM dd, yyyy')}
//           </p>
//         </div>
//         <span
//           className={`px-3 py-1 rounded-full text-sm ${
//             order.status === 'confirmed'
//               ? 'bg-green-100 text-green-800'
//               : 'bg-blue-100 text-blue-800'
//           }`}
//         >
//           {order.status}
//         </span>
//       </div>

//       <div className="space-y-4">
//         {/* Order Items */}
//         <div>
//           <h4 className="font-medium mb-2">Items</h4>
//           <div className="space-y-2">
//             {order.items.map((item, index) => (
//               <div key={index} className="flex justify-between items-center">
//                 <div>
//                   <p className="font-medium">{item.productName}</p>
//                   <p className="text-sm text-gray-600">
//                     Quantity: {item.quantity}
//                   </p>
//                 </div>
//                 <p className="font-medium">${item.price}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Delivery Address */}
//         <div>
//           <h4 className="font-medium mb-2">Delivery Address</h4>
//           <div className="text-sm text-gray-600">
//             <p>{order.address.addressLine1}</p>
//             {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
//             <p>{`${order.address.city}, ${order.address.state} ${order.address.zipCode}`}</p>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="border-t pt-4">
//           <div className="flex justify-between items-center font-semibold">
//             <span>Total</span>
//             <span>${order.total}</span>
//           </div>
//           <p className="text-sm text-gray-600 mt-1">
//             Paid via {order.paymentMethod}
//           </p>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto p-4">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-6xl mx-auto p-4">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="max-w-6xl mx-auto p-4">
//         <h1 className="text-2xl font-bold mb-6">My Orders</h1>
//         <div className="text-center py-12">
//           <h2 className="text-xl font-medium text-gray-600">No orders found</h2>
//           <p className="text-gray-500 mt-2">
//             Looks like you haven&apos;t placed any orders yet.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">My Orders</h1>

//       <div className="space-y-6">
//         {orders.map((order) => (
//           <div key={order._id}>
//             <OrderDetails order={order} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;

// Orders.propTypes = {
//   order: PropTypes.object.isRequired,
// };

import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3002/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Sort orders by date, most recent first
      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(sortedOrders);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const OrderDetails = ({ order }) => (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">
            Order #{order._id.slice(-8).toUpperCase()}
          </h3>
          <p className="text-sm text-gray-600">
            Placed on {format(new Date(order.createdAt), 'MMM dd, yyyy')}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            order.status === 'confirmed'
              ? 'bg-green-100 text-green-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="space-y-4">
        {/* Order Items */}
        <div>
          <h4 className="font-medium mb-2">Items</h4>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Address */}
        <div>
          <h4 className="font-medium mb-2">Delivery Address</h4>
          <div className="text-sm text-gray-600">
            <p>{order.address.addressLine1}</p>
            {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
            <p>{`${order.address.city}, ${order.address.state} ${order.address.zipCode}`}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center font-semibold">
            <span>Total</span>
            <span>${order.total}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Paid via {order.paymentMethod}
          </p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Loading orders...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <button
          onClick={fetchOrders}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-600">No orders found</h2>
          <p className="text-gray-500 mt-2">
            Looks like you haven&apos;t placed any orders yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderDetails key={order._id} order={order} />
        ))}
      </div>
    </div>
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
  }).isRequired,
};

export default Orders;
