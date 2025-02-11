import axios from "axios";



const getInventoryOrdersAndConsumerOrdersOnly = async () => {

  const server_Url = import.meta.env.VITE_API_SERVER_URL

    let consumerOrders = null;
        let InventoryOrders = null;
        let distributorWarehouses = null
    try {
        
        const token = localStorage.getItem('token');
    const consumerResponse = await axios.get(server_Url + '/api/v1/allorders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      consumerOrders = consumerResponse.data
      console.log("consumerOrdersOnly", consumerOrders)
      

    const inventoryResponse = await axios.get(server_Url + '/api/v1/distributor/inventory', {
        headers: { Authorization: `Bearer ${token}` },
      });
      InventoryOrders = inventoryResponse.data

    // console.log("InventoryOrders",InventoryOrders)

    const warehousesResponse = await axios.get(server_Url + "/api/v1/inventories", {
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