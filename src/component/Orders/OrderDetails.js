import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const OrderDetails = () => {
    const { id } = useParams()
    const [orderDetail, setOrderDetails] = useState({})
    useEffect(() => {
        const url = `https://fast-sands-79034.herokuapp.com/orders/${id}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setOrderDetails(data[0])
            })
    }, [])

    console.log(orderDetail);
    return (
        <div className="d-flex justify-content-center">
            {
                orderDetail.email ? 
                <div className="text-center w-50">
                    <div>
                        <h1>Order Id : {orderDetail._id}</h1>
                        <p>User Name : {orderDetail.name}</p>
                        <p>User Email : {orderDetail.email}</p>
                        <p>User Phone Number : {orderDetail.shipmentData.number}</p>
                        <p>Order time : {orderDetail.shipmentData.date}</p>

                    </div>
                    <div>
                        <h1>Order Details</h1>
                        <p>Product name : {orderDetail.orderDetails.ProductName}</p>
                        <p>Product Cost : ${orderDetail.orderDetails.ProductPrice}</p>
                        <p>Product Quantity : {orderDetail.orderDetails.ProductQuantity}</p>
                    </div>
                </div> : <div class="d-flex justify-content-center m-5">
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>
                </div>
            }
        </div>
    );
};

export default OrderDetails;