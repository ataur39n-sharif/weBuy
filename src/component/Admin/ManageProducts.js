import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
    const [products, setProducts] = useState({})

    // const location = useLocation();

    useEffect(() => {
        fetch(`https://fast-sands-79034.herokuapp.com/products`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handelDelete = (id) => {
        console.log(typeof (id), id);
        console.log('clicked');

        fetch(`https://fast-sands-79034.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log('deleted successfully', data);
                if (data) {
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        // <div>
        //     {
        //         products.length > 0 ? products.map(product =>
        //             <li className="m-2 p-4" key={product._id}>
        //                 name: {product.ProductName} Price: {product.ProductPrice}
        //                 <button onClick={() => handelDelete(product._id)}>delete</button>
        //             </li>) : <div className="d-flex justify-content-center m-5">
        //             <div className="spinner-border" role="status">
        //                 <span className="sr-only"></span>
        //             </div>
        //         </div>
        //     }
        // </div>
        <div className="text-center ">
        <h1 className="text-center">Manage Products</h1>
      
        <table className="table table-striped w-75 m-5 text-center">
            <thead>
                <tr>
                    <th scope="col">Product Id</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Product price</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>

            {
                 products.length > 0 ? products.map(product =>
                    <tbody key={product._id}>
                        <tr>
                            <th scope="row">{product._id}</th>
                            <td>{product.ProductName}</td>
                            <td>${product.ProductPrice}</td>
                            {
                               <td><button className="btn btn-warning"onClick={() => handelDelete(product._id)}>Delete</button> </td> 
                            }
                        </tr>
                    </tbody>) :
                    <div className="d-flex justify-content-center m-5">
                        <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </div>
            }
        </table>

    </div>
    );
};

export default ManageProducts;