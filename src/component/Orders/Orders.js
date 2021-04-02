import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [orderDetails , setOrderDetails] = useState({})
    console.log(loggedInUser);
    useEffect(() => {
        const url = `https://fast-sands-79034.herokuapp.com/orders?email=`+loggedInUser.email
        fetch(url)
        .then((response) => response.json())
        .then(data =>{
            console.log(data);
            setOrderDetails(data)
        })
    },[])
    console.log(orderDetails);
    return (
        <div>
            {
               orderDetails.length > 0 && orderDetails.map(order => <li key={Math.random()}>{order.orderDetails.ProductName}</li>)
            }
        </div>
    );
};

export default Orders;