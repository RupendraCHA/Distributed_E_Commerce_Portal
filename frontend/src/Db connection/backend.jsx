const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define a Schema and Model
const ItemSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const Item = mongoose.model('Item', ItemSchema);

// Endpoint to add JSON data to MongoDB
app.post('/add-item', async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    price: req.body.price
  });

  try {
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
