/*
const express = require('express');

const app = express();

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John ', lastName: 'Doe'},
    {id: 2, firstName: 'Steve', lastName: 'Smith'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'}
  ];

  res.json(customers);
});

<<<<<<< HEAD
app.listen(port, () => console.log('Server started on port ${port}'));
*/
=======
app.get('/api/products', (req, res) => {
  const products = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Steve', lastName: 'Smith'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'}
  ];

  res.json(products);
});
const port = 3001;

app.listen(port, () => console.log('Server started on port ' + port));
>>>>>>> bb5966178a48f300fb600db77f39e9e4ad4a144a
