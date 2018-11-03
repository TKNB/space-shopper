import React from 'react';

export default ({ products }) => {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {
          products.map(product => {
            return (
              <li key={product.id}>
                {product.name}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
};
