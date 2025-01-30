// import React from "react";
// import { CheckCircle, Circle } from "lucide-react";

// const steps = [
//   { label: "Order Placed", status: "placed" },
//   { label: "Processing", status: "processing" },
//   { label: "Shipped", status: "shipped" },
//   { label: "In Transit", status: "in-transit" },
//   { label: "Out for Delivery", status: "out-for-delivery" },
//   { label: "Delivered", status: "delivered" }
// ];

// const TrackingStatus = ({ currentStatus }) => {
//   const getStatusIndex = () => steps.findIndex(step => step.status === currentStatus);

//   return (
//     <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold mb-6 text-center">Order Tracking</h2>
//       <div className="relative">
//         {/* <div className="absolute left-5 top-5 h-full w-1 bg-gray-300"></div> */}
//         {steps.map((step, index) => (
//           <div key={step.status} className="relative flex items-center mb-6 last:mb-0">
//             <div className="relative z-10">
//               {index <= getStatusIndex() ? (
//                 <CheckCircle className="w-8 h-8 text-green-500" />
//               ) : (
//                 <Circle className="w-8 h-8 text-gray-400" />
//               )}
//             </div>
//             <div className="ml-6">
//               <p className={`text-lg font-semibold ${index <= getStatusIndex() ? "text-green-600" : "text-gray-500"}`}>
//                 {step.label}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrackingStatus;
import React, { useEffect, useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { useSelector } from "react-redux";

const steps = [
  { label: "Order Placed", status: "placed" },
  { label: "Processing", status: "processing" },
  { label: "Shipped", status: "shipped" },
  { label: "In Transit", status: "in-transit" },
  { label: "Out for Delivery", status: "out-for-delivery" },
  { label: "Delivered", status: "delivered" }
];



const TrackingStatus = ({ orders, updateStatus, myOrders }) => {

const userRole = useSelector((state) => state.auth.user?.role);

    
  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Order Tracking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-3">Order ID: {order.id}</h3>
            <div className="relative pl-8">
              <div className="absolute left-4 top-5 h-full w-1 bg-gray-300"></div>
              {steps.map((step, index) => (
                <div key={step.status} className="relative flex items-center mb-4 last:mb-0">
                  <div className="relative z-10">
                    {index <= steps.findIndex(s => s.status === order.status) ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <p className={`ml-4 text-sm ${index <= steps.findIndex(s => s.status === order.status) ? "text-green-600" : "text-gray-500"}`}>
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
            {userRole === "distributor" && <div className="mt-3">
              <label className="text-sm font-medium">Update Status:</label>
              <select
                value={order.status}
                onChange={e => updateStatus(order.id, e.target.value)}
                className="ml-2 p-1 border rounded-md"
              >
                {steps.map(step => (
                  <option key={step.status} value={step.status}>
                    {step.label}
                  </option>
                ))}
              </select>
            </div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingStatus;


