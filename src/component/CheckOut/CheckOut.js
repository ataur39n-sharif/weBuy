import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { userContext } from '../../App';

const CheckOut = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [product, setProduct] = useState({})
    const [checkOut, setCheckOut] = useState({})
    const [orders, setOrders] = useState({})

    let { key } = useParams()

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/shipment" } };

    useEffect(() => {
        fetch(`https://fast-sands-79034.herokuapp.com/products/${key}`)
            .then(res => res.json())
            .then(data => setProduct(data[0]))
    }, [])

    console.log(product);

    const handelContinue = () => {
        console.log('clicked');

        const checkOutProduct = {
            ProductId: product._id,
            ProductName: product.ProductName,
            ProductPrice: product.ProductPrice,
            ProductQuantity: 1,
        }
        setCheckOut(checkOutProduct)
        const orderDetails = { ...loggedInUser, orderDetails: checkOutProduct }
        setOrders(orderDetails)
    }
    console.log(orders);
    const handelCheckOut = () => {
        setLoggedInUser(orders)
        if (checkOut.ProductName) {
            history.replace(from);
        }
    }

    console.log(checkOut.ProductName);

    return (
        <div className='container w-50 text-center m-5'>

            {
                <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.ProductName}</td>
                            <td>1</td>
                            <td>${product.ProductPrice}</td>
                        </tr>
                    </tbody>
                </table>
            }


            {
                checkOut.ProductName ? <button className='btn btn-dark' onClick={handelCheckOut}>Process CheckOut</button> :
                    product.ProductName ? <button className='btn btn-warning' onClick={handelContinue}>Continue</button> : <button className='btn btn-dark'>Please Wait</button>
            }
        </div>
    );
};

export default CheckOut;