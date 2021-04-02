import React, { useEffect, useState } from 'react';
import Product from './Product';

const Products = () => {
    const [products , setProducts] = useState({})

    useEffect(() =>{
        fetch(`https://fast-sands-79034.herokuapp.com/products`)
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    console.log(products);

    return (
        <div>
            <div className="row w-100">
            {
              products.length>0 ?  products.map(product => <Product product={product} key={product._id}></Product>) : <div class="d-flex justify-content-center m-5">
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
            }
            </div>
        </div>
    );
};

export default Products;