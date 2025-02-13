import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import './MyOrders.css';
import { useSelector } from 'react-redux';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { VscFilePdf } from "react-icons/vsc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import jsPDF from "jspdf";
import "jspdf-autotable";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userRole = useSelector((state) => state.auth.user?.role);

  const server_Url = import.meta.env.VITE_API_SERVER_URL


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      // const orderUrl = userRole === "Consumer" ? 'http://localhost:3002/orders' : 'http://localhost:3002/admin/orders'
      const response = await axios.get(server_Url + '/api/v1/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sortedOrders = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Automatically update status from "confirmed" to "processing" after 10 seconds
      // and from "processing" to "delivered" after 1 hour
      const updatedOrders = sortedOrders.map((order) => {
        if (order.status === 'confirmed') {
          setTimeout(() => {
            updateOrderStatus(order._id, 'processing');
          }, 3000); // 10 seconds
        } 
        // else if (order.status === 'processing') {
        //   setTimeout(() => {
        //     updateOrderStatus(order._id, 'delivered');
        //   }, 3600000); // 1 hour (3600000 milliseconds)
        // }
        return order;
      });

      setOrders(updatedOrders);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadInvoice = async (orderId) => {
    try {
      // const token = localStorage.getItem("token");
      const response = await axios.get(server_Url + `/api/v1/orders/${orderId}/invoice`, {
        // headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Important for handling files
      });
  
      // Create a URL for the file and trigger download
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${orderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log({error})
      console.error("Error downloading invoice:", error);
    }
  };



// const downloadOrderInvoice = (order) => {
//   const doc = new jsPDF();

//   // Image & Title Setup
//   const logoUrl =
//     "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738926639/Posetra_Logo1_bcwdlt.jpg"; // Replace with actual logo
//   const imgWidth = 15;
//   const imgHeight = 15;
//   const marginLeft = 15; // Align to left margin
//   const titleText = "Order Invoice";
//   const titleFontSize = 18;
//   const titleX = marginLeft + imgWidth + 5; // Position title next to image

//   // Add Image & Title (Bold Title)
//   doc.addImage(logoUrl, "PNG", marginLeft, 10, imgWidth, imgHeight);
//   doc.setFontSize(titleFontSize);
//   doc.setTextColor(44, 62, 80);
//   doc.setFont("helvetica", "bold");
//   doc.text(titleText, titleX, 18);

//   let startY = 35; // Start position after title

//   // Table Headers
//   const columns = ["Product Code", "Name", "Quantity", "Price"];
//   const rows = order.items.map((item) => [
//     item.product,
//     item.name,
//     item.quantity,
//     item.price,
//   ]);

//   // Add Table with header color matching logo
//   doc.autoTable({
//     startY,
//     head: [columns],
//     body: rows,
//     theme: "striped",
//     styles: { fontSize: 12, halign: "left" }, // Left-aligned text
//     headStyles: { fillColor: [26, 35, 126], textColor: [255, 255, 255] }, // Dark Blue Header
//   });

//   let finalY = doc.autoTable.previous.finalY + 15; // More space after table

//   // Order & Billing - Extreme Left & Right Layout
//   const leftX = 15;
//   const rightX = doc.internal.pageSize.width - 80; // Extreme right position

//   // Order Details (Extreme Left - Bold Heading)
//   doc.setFontSize(12);
//   doc.setTextColor(30, 30, 30);
//   doc.setFont("helvetica", "bold");
//   doc.text("Order Details:", leftX, finalY);

//   doc.setFontSize(11);
//   doc.setTextColor(60, 60, 60);
//   doc.setFont("helvetica", "normal");
//   doc.text(`Order ID: ${order._id}`, leftX, finalY + 8);
//   doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, leftX, finalY + 16);
//   doc.text(`Paid with: ${order.paymentMethod}`, leftX, finalY + 24);
//   doc.text(`Delivery Type: ${order.deliveryType}`, leftX, finalY + 32);

//   // Billing Address (Extreme Right - Bold Heading)
//   doc.setFontSize(12);
//   doc.setTextColor(30, 30, 30);
//   doc.setFont("helvetica", "bold");
//   doc.text("Billing Address:", rightX, finalY);

//   doc.setFontSize(11);
//   doc.setTextColor(60, 60, 60);
//   doc.setFont("helvetica", "normal");
//   doc.text(order.address.addressLine1, rightX, finalY + 8);
//   doc.text(
//     `${order.address.city}, ${order.address.state} - ${order.address.zipCode}`,
//     rightX,
//     finalY + 16
//   );

//   finalY += 50; // Normal gap above Total Amount

//   // Total Amount (Bold & Aligned Left)
//   doc.setFontSize(18);
//   doc.setTextColor(30, 30, 30);
//   doc.setFont("helvetica", "bold");
//   doc.text(`Total: $${order.total}`, leftX, finalY);

//   finalY += 20; // Space before gratitude note

//   // Gratitude Note (Centered at Bottom)
//   doc.setFontSize(11);
//   doc.setTextColor(60, 60, 60);
//   doc.setFont("helvetica", "italic");
//   doc.text(
//     "Thank you for partnering with us! We appreciate your business and look forward to serving you again.",
//     doc.internal.pageSize.width / 2,
//     finalY,
//     { align: "center" }
//   );

//   // Save PDF
//   doc.save(`OrderInvoice.pdf`);
// };

const downloadOrderInvoice = (order) => {
  const doc = new jsPDF();

  // Image & Title Setup
  const logoUrl =
    "https://res.cloudinary.com/dvxkeeeqs/image/upload/v1738926639/Posetra_Logo1_bcwdlt.jpg"; // Replace with actual logo
  const imgWidth = 15;
  const imgHeight = 15;
  const marginLeft = 15; // Align to left margin
  const titleText = "Order Invoice";
  const titleFontSize = 18;
  const titleX = marginLeft  + 15; // Position title next to image

  // Add Image & Title (Bold Title)
  doc.addImage(logoUrl, "PNG", marginLeft, 10, imgWidth, imgHeight);
  doc.setFontSize(titleFontSize);
  doc.setTextColor(44, 62, 80);
  doc.setFont("helvetica", "bold");
  doc.text(titleText, titleX, 18);

  let startY = 35; // Start position after title

  // Delivery Charge Calculation
  let deliveryCharge = 0;
  if (order.deliveryType === "premium") deliveryCharge = 10;
  if (order.deliveryType === "airMail") deliveryCharge = 100;

  // Delivery Type
  let deliveryType;
  if (order.deliveryType === "standard") deliveryType = "Standard";
  if (order.deliveryType === "premium") deliveryType = "Premium";
  if (order.deliveryType === "airMail") deliveryType = "Air";


  const totalAmount = order.total + deliveryCharge;

  // Table Headers
  const columns = ["Product Code", "Name", "Quantity", "Unit Price"];
  const rows = order.items.map((item) => [
    item.product,
    item.name,
    item.quantity,
    `${item.price}`,
  ]);

  // Add Delivery Charge Row
  rows.push(["-", "Delivery Charge", "-", `$${deliveryCharge}`]);

  // Add Table with header color matching logo
  doc.autoTable({
    startY,
    head: [columns],
    body: rows,
    theme: "striped",
    styles: { fontSize: 10, halign: "left" }, // Left-aligned text
    headStyles: { fillColor: [26, 35, 126], textColor: [255, 255, 255] }, // Dark Blue Header
  });

  let finalY = doc.autoTable.previous.finalY + 15; // More space after table

  // Order & Billing - Extreme Left & Right Layout
  const leftX = 15;
  const rightX = doc.internal.pageSize.width - 80; // Extreme right position

  // Order Details (Extreme Left - Bold Heading)
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.text("Order Details:", leftX, finalY);

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");
  doc.text(`Order ID: ${order._id}`, leftX, finalY + 8);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, leftX, finalY + 16);
  doc.text(`Payment: ${order.paymentMethod}`, leftX, finalY + 24);
  doc.text(`Delivery Type: ${deliveryType}`, leftX, finalY + 32);

  // Billing Address (Extreme Right - Bold Heading)
  doc.setFontSize(12);
  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.text("Billing Address:", rightX, finalY);

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "normal");
  doc.text(order.address.addressLine1, rightX, finalY + 8);
  doc.text(
    `${order.address.city}, ${order.address.state} - ${order.address.zipCode}`,
    rightX,
    finalY + 16
  );

  finalY += 50; // Normal gap above Total Amount

  // Total Amount (Bold & Aligned Left)
  doc.setFontSize(18);
  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.text(`Total: $${totalAmount}`, leftX, finalY);

  finalY += 20; // Space before gratitude note

  // Gratitude Note (Centered at Bottom)
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Thank you for partnering with us! We appreciate your business and look forward to serving you again.",
    doc.internal.pageSize.width / 2,
    finalY,
    { align: "center" }
  );

  // Save PDF
  doc.save(`OrderInvoice.pdf`);
};

const handleDownloadInvoice = async (orderId) => {
    console.log("UserID", orderId)

    const token = localStorage.getItem('token');

    // const response = await axios.get(server_Url + `/api/v1/order/${orderId}/downloadInvoice`)
    const response = await axios.get(server_Url + `/api/v1/ordersForInvoice/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    downloadOrderInvoice(response.data.orderDetails)
    console.log("User Order", response.data)
    toast.success("Invoice Downloaded!");
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        server_Url + `/api/v1/orders/${orderId}/status`,
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

  const getDeliveryPrice = (type) => {
    if (type === "standard"){
      return "$0.00"
    }else if (type === "premium"){
      return "$10.00"
    }
    return "$100.00"
  }

  const OrderDetails = ({ order }) => (
    <div className="container order-card">
      <div className="order-header">
        <div>
          <h3 className="order-id text-blue-600 font-[SansSerif]">
            Order #{order._id.slice(-8).toUpperCase()}
          </h3>
          <p className="order-date font-medium">
            Placed on {format(new Date(order.createdAt), 'MMM dd, yyyy')}
          </p>
        </div>
        {/* <span className={`status-badge ${order.status.toLowerCase()}`}>
          {order.status}
        </span> */}
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
          <div style={{display: "flex", flexDirection: "row", alignItems: "space-between", justifyContent: "space-between",}}>
              <span className={`status-badge ${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            <div style={{ marginLeft: "5px"}}>
              {/* <PictureAsPdfIcon onClick={() => downloadInvoice(order._id)} className='cursor-pointer' />
              <p>PDF</p> */}
              <PictureAsPdfIcon style={{color: "red", boxShadow: "2px 2px 1px black", borderRadius: "2px"}} onClick={() => handleDownloadInvoice(order._id)} className='cursor-pointer' />
              {/* <VscFilePdf style={{color: "red",width: "20px", boxShadow: "2px 2px 2px black"}} onClick={() => handleDownloadInvoice(order._id)} className='cursor-pointer' /> */}
            </div>
          </div>
          
          <p style={{fontSize: "13px", fontWeight: "600"}}>{new Date(order.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className="order-content">
        {/* Order Items */}
        <div className="order-section">
          <h4 className="section-title mx-2">Items</h4>
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
          <h4 className="font-bold mb-2 text-blue-500 text-xl">Delivery Address</h4>
          <div className="address-details font-medium">
            <p>{order.address.addressLine1}</p>
            {order.address.addressLine2 && <p>{order.address.addressLine2}</p>}
            <p>{`${order.address.city}, ${order.address.state} ${order.address.zipCode}`}</p>
          </div>
        </div>
        {/* Delivery Type */}
        <div className="order-section">
          <h4 className="font-bold mb-2 text-blue-500 text-xl">Estimated Delivery</h4>
          <p className="delivery-type font-medium">
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
    </div>
  );

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
      <div className="container orders-container">
        <h1 className="page-title">My Orders</h1>
        <div className="empty-state">
          <h2 className="empty-state-title">No orders found</h2>
          <p className="empty-state-message">
            Looks like you haven&apos;t placed any orders yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container orders-container">
      <h1 className="page-title">My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <OrderDetails key={order._id} order={order} />
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
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
    deliveryType: PropTypes.string.isRequired, // Add deliveryType to PropTypes
  }).isRequired,
};

export default Orders;
