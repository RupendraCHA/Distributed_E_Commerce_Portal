import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Box,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const InventoryLedger = () => {
    const [inventory, setInventory] = useState([]);
    const server_Url = import.meta.env.VITE_API_SERVER_URL;
    const isUpdated = useSelector((state) => state.userOrders.isUpdated); // Listen for updates from Redux

    // Fetch inventory data
    const fetchInventoryData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${server_Url}/api/v1/distributor/inventory`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching inventory data:', error);
        }
    };

    // Fetch data on component mount and whenever isUpdated changes
    useEffect(() => {
        fetchInventoryData();
    }, [isUpdated]); // Re-fetch when isUpdated changes (triggered by InventoryOrdersManagement updates)

    return (
        <Container>
            <Box mb={2}>
                <Typography variant="h5">Inventory Ledger</Typography>
            </Box>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Product ID</TableCell>
                        <TableCell>Warehouse</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Inventory</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {inventory.map((item, index) => {
                        const price = item.price.match(/\d+(\.\d+)?/g)?.map(Number)[0] || 0;
                        const totalPrice = (item.quantity * price).toFixed(2); // Calculate total price
                        const status =
                            item.quantity > item.reorderPoint ? 'In Stock' : 'Reorder';
                        return (
                            <TableRow key={`${item._id}-${index}`}>
                                <TableCell>{item.productId}</TableCell>
                                <TableCell>{item.warehouseName}</TableCell>
                                <TableCell>{item.warehouseLocation}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${price}</TableCell>
                                <TableCell>${totalPrice}</TableCell>
                                <TableCell>{status}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Container>
    );
};

export default InventoryLedger;
