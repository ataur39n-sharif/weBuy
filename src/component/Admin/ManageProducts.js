import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const ManageProducts = () => {
    const [products, setProducts] = useState({})

    // const location = useLocation();

    useEffect(() => {
        fetch(`https://fast-sands-79034.herokuapp.com/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handelDelete = (id) => {
        console.log(typeof(id),id);
        console.log('clicked');

        fetch(`https://fast-sands-79034.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log('deleted successfully',data);
                if(data){
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            {
                products.length > 0 && products.map(product => 
                <li className="m-2 p-4" key={product._id}>
                    name: {product.ProductName} Price: {product.ProductPrice} 
                    <button onClick={() => handelDelete(product._id)}>delete</button> 
                    </li>)
            }
        </div>
    );
};

export default ManageProducts;