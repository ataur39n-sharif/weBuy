import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [orderDetails, setOrderDetails] = useState({})
    console.log(loggedInUser);
    useEffect(() => {
        const url = `https://fast-sands-79034.herokuapp.com/orders?email=` + loggedInUser.email
        fetch(url)
            .then((response) => response.json())
            .then(data => {
                console.log(data);
                setOrderDetails(data)
            })
    }, [])
    console.log(orderDetails);
    return (
        <div className="text-center  d-flex justify-content-center">
            <h1 className="text-center">Orders</h1>
          
            <table class="table table-striped w-75 m-5">
                <thead>
                    <tr>
                        <th scope="col">Order Id</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Details</th>
                    </tr>
                </thead>

                {
                    orderDetails.length > 0 ? orderDetails.map(order =>
                        <tbody key={order._id}>
                            <tr>
                                <th scope="row">{order._id}</th>
                                <td>{order.orderDetails.ProductName}</td>
                                {
                                   <td> <Link to={`/orderDetails/${order._id}`}>  view </Link></td> 
                                }
                            </tr>
                        </tbody>
                        ) :
                        <div class="d-flex justify-content-center m-5">
                            <div class="spinner-border" role="status">
                                <span class="sr-only"></span>
                            </div>
                        </div>
                }
            </table>

        </div>
    );
};

export default Orders;