import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const item = {
      name: name,
      price: parseFloat(price),
    };

    try {
      const res = await axios.post('http://localhost:5000/add-item', item);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
