import axios from "axios";



const getInventoryOrdersAndConsumerOrdersOnly = async () => {
    let consumerOrders = null;
        let InventoryOrders = null;
        let distributorWarehouses = null
    try {
        
        const token = localStorage.getItem('token');
    const consumerResponse = await axios.get('http://localhost:3002/allorders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      consumerOrders = consumerResponse.data
      console.log("consumerOrdersOnly", consumerOrders)
      

    const inventoryResponse = await axios.get('http://localhost:3002/distributor/inventory', {
        headers: { Authorization: `Bearer ${token}` },
      });
      InventoryOrders = inventoryResponse.data

    // console.log("InventoryOrders",InventoryOrders)

    const warehousesResponse = await axios.get("http://localhost:3002/inventories", {
        headers: { Authorization: `Bearer ${token}` },
      })

      distributorWarehouses = warehousesResponse.data

    //   console.log("D.WAREHOUSES", distributorWarehouses)

        
    } catch (error) {
        console.log("Error Occured", error)
    }

    return {consumerOrders, InventoryOrders, distributorWarehouses}

    
}
export {getInventoryOrdersAndConsumerOrdersOnly}