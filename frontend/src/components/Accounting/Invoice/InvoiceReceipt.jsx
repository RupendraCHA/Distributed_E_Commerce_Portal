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
    Paper,
} from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const InvoiceReceipt = () => {
    const [inventory, setInventory] = useState([]);
    const server_Url = import.meta.env.VITE_API_SERVER_URL;
    const isUpdated = useSelector((state) => state.userOrders.isUpdated);

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

    useEffect(() => {
        fetchInventoryData();
    }, [isUpdated]);

    // Calculate total revenue from the sale
    const calculateTotalRevenue = () => {
        return inventory
            .reduce((total, item) => {
                const price = item.price.match(/\d+(\.\d+)?/g)?.map(Number)[0] || 0;
                const totalPrice = item.quantity * price;
                return total + totalPrice;
            }, 0)
            .toFixed(2);
    };

    const totalRevenue = calculateTotalRevenue();

    // Hardcoded customer details (can be made dynamic in a real app)
    const customer = {
        name: "John Doe",
        address: "123 Main Street, Jersey City, NJ 07302",
        email: "johndoe@example.com",
    };

    // Invoice date
    const invoiceDate = "June 10, 2025";

    return (
        <Container>
            <Box mb={4} mt={2}>
                <Typography variant="h5" align="center">
                    Invoice Receipt
                </Typography>
                <Typography variant="subtitle1" align="center">
                    Generated on: {invoiceDate}
                </Typography>
            </Box>

            <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={3}>
                    <Box>
                        <Typography variant="h6">From:</Typography>
                        <Typography>ABC Distributor Inc.</Typography>
                        <Typography>456 Business Ave, Jersey City, NJ 07302</Typography>
                        <Typography>Email: sales@abcdistributor.com</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6">To:</Typography>
                        <Typography>{customer.name}</Typography>
                        <Typography>{customer.address}</Typography>
                        <Typography>Email: {customer.email}</Typography>
                    </Box>
                </Box>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Warehouse</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Quantity Sold</TableCell>
                            <TableCell>Unit Price</TableCell>
                            <TableCell>Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventory.map((item, index) => {
                            const price = item.price.match(/\d+(\.\d+)?/g)?.map(Number)[0] || 0;
                            const totalPrice = (item.quantity * price).toFixed(2);
                            return (
                                <TableRow key={`${item._id}-${index}`}>
                                    <TableCell>{item.productId}</TableCell>
                                    <TableCell>{item.warehouseName}</TableCell>
                                    <TableCell>{item.warehouseLocation}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>${price}</TableCell>
                                    <TableCell>${totalPrice}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                <Box mt={3} display="flex" justifyContent="flex-end">
                    <Box>
                        <Typography variant="h6">
                            Total Revenue: ${totalRevenue}
                        </Typography>
                        <Typography variant="h6">
                            Amount Owed by Customer: ${totalRevenue}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Typography variant="body2" align="center">
                Thank you for your business! Please remit payment within 30 days.
            </Typography>
        </Container>
    );
};

export default InvoiceReceipt;