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
